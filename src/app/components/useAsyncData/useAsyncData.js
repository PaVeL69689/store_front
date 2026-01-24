import { ref } from "vue";

export function useAsyncData() {
  const loading = ref(false);
  const error = ref(null);

  const execute = async (asyncFn) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await asyncFn();
      return result;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    execute,
  };
}
