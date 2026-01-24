<template>
  <IndexLayout>
    <div
      v-if="!loader"
      class="p-4 mb-4 bg-white border border-gray-200 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 rounded-lg cursor-pointer group"
    >
      <h2 class="text-lg text-gray-800 mb-2 border-b border-gray-200">
        {{ post.product_name }}
      </h2>
      <div class="flex justify-between">
        <p class="text-gray-600">
          {{ post.product_description }}
        </p>
        <p class="text-gray-600">{{ post.category_name }}</p>
        <span>{{ post.product_price }}p</span>
      </div>
    </div>
    <div v-if="loader" class="text-center p-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"
      ></div>
      <p class="mt-2 text-gray-600">Загружаем пост...</p>
    </div>
  </IndexLayout>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";

import { useRoute } from "vue-router";
import IndexLayout from "../layouts/indexLayout/IndexLayout.vue";
import api from "@/composables/api";

const VITE_BACK_API = import.meta.env.VITE_BACK_API;
const post = ref([]);
const route = useRoute();
const loader = ref(false);

const loadPost = (id) => {
  loader.value = true;
  api({
    url: `${VITE_BACK_API}/products/${id}`,
    method: "GET",
    callback: (res) => {
      console.log("Получен пост:", res);
      post.value = res;
      loader.value = false;
    },
    error: (err) => {},
  });
};

onMounted(() => {
  loadPost(route.params.id);
});
watch(
  () => route.params.id,
  (newId) => {
    loadPost(newId);
  }
);
</script>
<style></style>
