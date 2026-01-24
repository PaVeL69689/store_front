<template>
  <div class="text-white">User {{ $route.params.id }}</div>
</template>
<script setup>
import { onUnmounted, onMounted, ref, watch } from "vue";
import api from "../api/api";
import { useRoute } from "vue-router";

const VITE_BACK_API = import.meta.env.VITE_BACK_API;
const post = ref([]);
const route = useRoute();

const loadPost = (id) => {
  api({
    url: `${VITE_BACK_API}/products/${id}`,
    method: "GET",
    callback: (res) => {
      console.log("Получен пост:", res);
      post.value = res;
    },
    error: (err) => {
      console.log("Ошибка загрузки поста:", err);
    },
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
