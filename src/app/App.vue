<script setup></script>

<template>
  <div class="w-1/2 mx-auto p-4">
    <div class="mb-4 p-4 bg-white border border-gray-200">
      <div class="mb-4">
        <input
          v-model="post.title"
          placeholder="title"
          type="text"
          class="border border-gray-200 p-4 w-full"
        />
      </div>
      <div class="mb-4">
        <textarea
          v-model="post.content"
          placeholder="content"
          class="border border-gray-200 p-4 w-full"
        ></textarea>
      </div>
      <a
        @click.prevent="createPost"
        href="#"
        class="inline-block px-4 py-2 bg-green-700 border border-white-400 text-white"
        >Create</a
      >
    </div>
    <div>
      <div
        v-for="post in posts"
        class="p-4 mb-4 bg-white border border-gray-200"
      >
        <h2 class="text-lg text-gray-800 mb-2 border-b border-gray-200">
          {{ post.title }}
        </h2>
        <p class="text-gray-600">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Our app",

  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      posts: [],
    };
  },
  methods: {
    createPost() {
      this.posts.unshift(this.post);
      this.post = {};
    },
  },
};
</script>

<style scoped></style>
