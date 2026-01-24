import Post from "@/app/components/Post/Post.vue";
import AuthPage from "@/pages/AuthPage/AuthPage.vue";
import IndexPage from "@/pages/IndexPage/IndexPage.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: IndexPage },
  { path: "/auth", component: AuthPage },
  { path: "/post/:id", component: Post, name: "post" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
