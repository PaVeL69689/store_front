<template>
  <IndexLayout>
    <div
      class="mb-2 p-2 bg-sky-400 border border-sky-200 rounded-sm flex justify-center"
    >
      <h1 class="font-bold text-lg">Посты</h1>
    </div>
  </IndexLayout>
</template>
<script setup>
import { onMounted } from "vue";
import IndexLayout from "../layouts/indexLayout/IndexLayout.vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  if (!sessionStorage.getItem("token")) {
    router.push("/auth");
  }
});
</script>
<style></style>
