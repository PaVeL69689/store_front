<template>
  <IndexLayout>
    <CreatePannel />
  </IndexLayout>
</template>
<script setup>
import CreatePannel from "@/components/posts/CreatePannel.vue";
import IndexLayout from "../layouts/indexLayout/IndexLayout.vue";

const VITE_BACK_API = import.meta.env.VITE_BACK_API;
</script>
<style></style>
