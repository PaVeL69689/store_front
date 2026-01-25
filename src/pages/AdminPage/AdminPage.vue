<template>
  <IndexLayout>
    <div
      class="mb-2 p-2 bg-sky-400 border border-sky-200 rounded-sm flex justify-center flex-wrap"
    >
      <h1 class="font-bold text-lg w-1/1 flex justify-center">
        Управление товарами
      </h1>
      <router-link :to="{ name: 'createPost' }" class="block">
        <MainButton>Создать товар</MainButton>
      </router-link>
    </div>

    <ErrorDisplay v-if="error" :error="error" @retry="retryLoad" />

    <LoadingState
      v-if="loading && posts.length === 0"
      message="Загружаем посты..."
    />

    <EmptyState
      v-else-if="posts.length === 0 && !loading"
      message="Постов не найдено"
    />

    <div
      v-for="post in posts"
      :key="post.id"
      class="p-4 mb-4 bg-white border border-gray-200 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 rounded-lg cursor-pointer group"
    >
      <PostsList :post="post" />
      <div class="flex justify-end">
        <svg
          @click="deletePost(post.id)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        <router-link
          :to="{ name: 'updatePost', params: { id: post.id } }"
          class="block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
            />
          </svg>
        </router-link>
      </div>
    </div>

    <LoadingIndicator
      v-if="loading && posts.length > 0"
      message="Обновляем список..."
    />
  </IndexLayout>
</template>
<script setup>
import IndexLayout from "../layouts/indexLayout/IndexLayout.vue";
import { useRouter } from "vue-router";
import api from "@/composables/api";
import { onMounted, onUnmounted } from "vue";
import { usePosts } from "@/composables/usePosts";
import { useCategoryWatcher } from "@/composables/useCategory";
import ErrorDisplay from "@/components/ui/ErrorDisplay.vue";
import LoadingState from "@/components/ui/LoadingState.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import PostsList from "@/components/posts/PostsList.vue";
import LoadingIndicator from "@/components/ui/LoadingIndicator.vue";
import CreatePannel from "@/components/posts/CreatePannel.vue";
import MainButton from "@/components/ui/MainButton.vue";

const router = useRouter();
const VITE_BACK_API = import.meta.env.VITE_BACK_API;

const {
  posts,
  categories,
  selectedCategory,
  loading,
  error,
  loadProducts,
  retryLoad,
  abortController,
} = usePosts();

const { setupWatcher } = useCategoryWatcher(selectedCategory, loadProducts);

onMounted(() => {
  api({
    method: "POST",
    url: VITE_BACK_API + "/checkAuth",
    data: { token: sessionStorage.getItem("token") },
    callback: (res) => {
      setupWatcher();
    },
    error: (err) => {
      sessionStorage.removeItem("token");
      router.push("/auth");
    },
  });
});

onUnmounted(() => {
  if (abortController.value) {
    abortController.value.abort();
  }
});

function deletePost(id) {
  if (confirm("Вы уверены?")) {
    api({
      method: "DELETE",
      url: VITE_BACK_API + "/products/" + id,
      data: { id: id },
      headers: `Authorization: Bearer ${sessionStorage.getItem("token")}`,
      callback: (res) => {
        loadProducts();
      },
      error: (err) => {
        sessionStorage.removeItem("token");
        router.push("/auth");
      },
    });
  }
}
</script>
<style></style>
