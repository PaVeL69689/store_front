<template>
  <div>
    <IndexLayout>
      <PostsHeader
        :loading="loading"
        :categories="categories"
        v-model:selectedCategory="selectedCategory"
      />

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
        <router-link
          :to="{ name: 'post', params: { id: post.id } }"
          class="block"
        >
          <PostsList :post="post" />
        </router-link>
      </div>

      <LoadingIndicator
        v-if="loading && posts.length > 0"
        message="Обновляем список..."
      />
    </IndexLayout>
  </div>
</template>

<script setup>
import IndexLayout from "../layouts/indexLayout/IndexLayout.vue";
import { onMounted, onUnmounted } from "vue";
import { usePosts } from "@/composables/usePosts";
import { useCategoryWatcher } from "@/composables/useCategory";
import PostsHeader from "@/components/posts/PostsHeader.vue";
import ErrorDisplay from "@/components/ui/ErrorDisplay.vue";
import LoadingState from "@/components/ui/LoadingState.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import PostsList from "@/components/posts/PostsList.vue";
import LoadingIndicator from "@/components/ui/LoadingIndicator.vue";

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
  setupWatcher();
});

onUnmounted(() => {
  if (abortController.value) {
    abortController.value.abort();
  }
});
</script>
