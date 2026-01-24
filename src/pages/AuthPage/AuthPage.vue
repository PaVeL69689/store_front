<template>
  <div>
    <IndexLayout>
      <div
        class="mb-2 p-11 bg-sky-400 border border-sky-200 rounded-sm flex justify-center flex-wrap"
      >
        <h1 class="font-bold text-lg w-[100%] flex justify-center">Вход</h1>
        <form action="" class="flex justify-center flex-wrap">
          <span class="w-1/1 text-left">login</span>
          <input type="text" class="w-1/1 bg-white rounded-sm p-2" />
          <span class="w-1/1 text-left">password</span>
          <input type="text" class="w-1/1 bg-white rounded-sm p-2" />
          <button
            class="inline-block px-4 py-2 bg-green-700 border border-white-400 text-white rounded-sm mt-5"
          >
            Войти
          </button>
        </form>
      </div>
    </IndexLayout>
  </div>
</template>
<script>
import IndexLayout from "../layouts/indexLayout/IndexLayout.vue";

export default {
  components: {
    IndexLayout,
  },
};
</script>
<style></style>
