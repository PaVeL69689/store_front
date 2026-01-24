<template>
  <div>
    <IndexLayout
      ><div
        class="mb-2 p-2 bg-sky-400 border border-sky-200 rounded-sm flex justify-center"
      >
        <h1 class="font-bold text-lg">Посты</h1>
        <form action="">
          <select
            v-model="selectedCategory"
            class="ml-6 rounded-sm border-white-400 text-white bg-green-700 w-[90px] text-center"
          >
            <option value="all">Все</option>
            <option
              :key="category.id"
              v-for="category in categories"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </form>
        <div v-if="loading" class="ml-2">
          <div
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
          ></div>
        </div>
      </div>
      <div
        v-if="error"
        class="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded"
      >
        Ошибка загрузки: {{ error }}
        <button
          @click="retryLoad"
          class="ml-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Повторить
        </button>
      </div>

      <div v-if="loading && posts.length === 0" class="text-center p-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"
        ></div>
        <p class="mt-2 text-gray-600">Загружаем посты...</p>
      </div>

      <div
        v-else-if="posts.length === 0 && !loading"
        class="text-center p-8 text-gray-500"
      >
        Постов не найдено
      </div>

      <div
        v-for="post in posts"
        :key="post.id"
        class="p-4 mb-4 bg-white border border-gray-200 active"
      >
        <router-link :to="{ name: 'post', params: { id: post.id } }">
          <h2 class="text-lg text-gray-800 mb-2 border-b border-gray-200">
            {{ post.product_name }}
          </h2>
          <div class="flex justify-between">
            <p class="text-gray-600">
              {{ post.product_description.substring(0, 30) }}
            </p>
            <span>{{ post.product_price }}p</span>
          </div>
        </router-link>
      </div>
      <div v-if="loading && posts.length > 0" class="text-center p-4">
        <div class="inline-block animate-pulse">
          <div class="h-2 bg-sky-200 rounded w-24 mx-auto"></div>
          <div class="mt-1 text-sm text-gray-500">Обновляем список...</div>
        </div>
      </div>
    </IndexLayout>
  </div>
</template>
<script setup>
import api from "@/app/components/api/api";
import IndexLayout from "../layouts/indexLayout/IndexLayout.vue";
import { onUnmounted, onMounted, ref, watch } from "vue";

const VITE_BACK_API = import.meta.env.VITE_BACK_API;
const posts = ref([]);
const categories = ref([]);
const selectedCategory = ref("all");
const loading = ref(false);
const error = ref(null);
const abortController = ref(null);

const getUniqueCategories = (data) => {
  const categoryMap = new Map();

  data.forEach((item) => {
    if (!categoryMap.has(item.category_id)) {
      categoryMap.set(item.category_id, {
        id: item.category_id,
        name: item.category_name,
      });
    }
  });

  return Array.from(categoryMap.values());
};

const loadProducts = async (category = "all") => {
  if (abortController.value) {
    abortController.value.abort();
  }
  abortController.value = new AbortController();
  loading.value = true;
  error.value = null;
  try {
    const response = await new Promise((resolve, reject) => {
      api({
        method: "GET",
        url: VITE_BACK_API + "/products?category=" + category,
        signal: abortController.value?.signal,
        callback: (res) => resolve(res),
        error: (err) => reject(err),
      });
    });

    posts.value = response;
    if (category === "all" && categories.value.length === 0) {
      categories.value = getUniqueCategories(response);
    }
  } catch (err) {
    if (err.name === "AbortError") {
      return;
    }
    error.value = err.message || "Не удалось загрузить посты";

    setTimeout(() => {
      error.value = null;
    }, 5000);
  } finally {
    loading.value = false;
  }
};
const retryLoad = () => {
  error.value = null;
  loadProducts(selectedCategory.value);
};
let timeoutId = null;
watch(
  selectedCategory,
  (newCategory) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      loadProducts(newCategory);
    }, 300);
  },
  { immediate: true }
);

onMounted(() => {
  loadProducts();
});
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  if (abortController.value) {
    abortController.value.abort();
  }
});
</script>

<style>
.active:hover {
  box-shadow: red -1px 0px 15px 4px;
  transition: 0.3s ease-in;
  cursor: pointer;
  transform: scale(1.01);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
