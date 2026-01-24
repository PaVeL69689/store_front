import AdminPage from "@/pages/AdminPage/AdminPage.vue";
import AuthPage from "@/pages/AuthPage/AuthPage.vue";
import IndexPage from "@/pages/IndexPage/IndexPage.vue";
import Post from "@/pages/PostPage/Post.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: IndexPage },
  { path: "/auth", component: AuthPage },
  { path: "/post/:id", component: Post, name: "post" },
  { path: "/admin", component: AdminPage, name: "admin" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
