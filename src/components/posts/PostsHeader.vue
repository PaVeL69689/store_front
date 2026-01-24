<template>
  <div
    class="mb-2 p-2 bg-sky-400 border border-sky-200 rounded-sm flex justify-center items-center"
  >
    <h1 class="font-bold text-lg">Посты</h1>
    <form class="ml-4">
      <select
        v-model="selectedCategory"
        :disabled="loading"
        class="rounded-sm border-white-400 text-white bg-green-700 w-[90px] text-center"
        @change="$emit('update:selectedCategory', $event.target.value)"
      >
        <option value="all">Все</option>
        <option
          v-for="category in categories"
          :key="category.id"
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
</template>

<script setup>
const selectedCategory = defineModel("selectedCategory", {
  type: [String, Number],
  required: true,
});
defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["update:selectedCategory"]);
</script>
