/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-18
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-11-01
 */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/playlist",
    },
    {
      path: "/playlist", // 正在播放列表
      name: "PlayList",
      component: () => import("../views/PlayList.vue"),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: "/toplist", // 排行榜列表
      name: "TopList",
      component: () => import("../views/TopList.vue"),
      meta: {
        title: "排行榜",
        keepAlive: true,
      },
    },
    {
      path: "/details/:id?", // 歌单详情
      name: "Details",
      component: () => import("../views/Details.vue"),
      meta: {
        title: "歌单详情",
        keepAlive: true,
      },
    },
    {
      path: "/search", // 搜索
      name: "Search",
      component: () => import("../views/Search.vue"),
      meta: {
        title: "歌曲搜索",
        keepAlive: true,
      },
    },
    {
      path: "/historylist", // 我听过的列表
      name: "HistoryList",
      component: () => import("../views/HistoryList.vue"),
    },
  ],
});

export default router;
