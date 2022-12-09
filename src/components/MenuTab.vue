<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-11-03
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-09
-->

<script setup lang="ts">
  import { reactive, onMounted, watch, getCurrentInstance } from "vue";
  import { useRouter, useRoute } from "vue-router";

  const route = useRoute();
  const router = useRouter();

  const state = reactive({
    menuList: ["热门歌曲", "推荐", "搜索", "播放历史"],
    mentRouter: ["playlist", "toplist", "search", "historylist"],
    /**当前分类*/
    activeIndex: 0,
  });

  const ChangeActive = async (index: number) => {
    state.activeIndex = index;
    router.push({
      path: `/${state.mentRouter[state.activeIndex]}`,
    });
  };

  watch(
    () => route.name,
    (n) => {
      getCurrentIndex(n as string);
    }
  );

  const getCurrentIndex = (n: string) => {
    let index = 0;
    switch (n) {
      case "PlayList":
        index = 0;
        break;
      case "TopList":
      case "Details":
        index = 1;
        break;
      case "Search":
        index = 2;
        break;
      case "HistoryList":
        index = 3;
        break;
      default:
        index = 0;
        break;
    }
    state.activeIndex = index;
  };
</script>

<template>
  <div class="menu-box">
    <div
      :class="`menu-button${state.activeIndex === index ? ' active' : ''}`"
      v-for="(item, index) in state.menuList"
      :key="index"
      @click="ChangeActive(index)"
    >
      <span class="bnt"> {{ item }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
  padding-left: 24px;
  box-sizing: border-box;
  overflow: hidden;

  .menu-button {
    width: 96px;
    border: 1px solid #dddcdc;
    height: 36px;
    text-align: center;
    color: #dddcdc;
    line-height: 35px;
    font-size: 15px;
    margin-right: 20px;
    cursor: pointer;
    border-radius: 3px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: @vue_color;
      color: @vue_color;
      box-shadow: 1px 1px 8px 2px @vue_color_option;
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        @vue_color_option,
        transparent
      );
      transition: all 650ms;
    }

    &:hover:before {
      left: 100%;
    }

    &.active {
      --border-width: 2px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 36px;
      // width: 300px;
      // height: 200px;
      font-family: Lato, sans-serif;
      // font-size: 2.5rem;
      text-transform: uppercase;
      color: white;
      border-color: white;
      background: rgba(235, 227, 227, 0.6);
      border-radius: var(--border-width);
      box-shadow: none;

      &::before {
        display: none;
      }

      &::after {
        position: absolute;
        content: "";
        top: calc(-1 * var(--border-width));
        left: calc(-1 * var(--border-width));
        z-index: -1;
        width: calc(100% + var(--border-width) * 2);
        height: calc(100% + var(--border-width) * 2);
        background: linear-gradient(
          60deg,
          hsl(224, 85%, 66%),
          hsl(269, 85%, 66%),
          hsl(314, 85%, 66%),
          hsl(359, 85%, 66%),
          hsl(44, 85%, 66%),
          hsl(89, 85%, 66%),
          hsl(134, 85%, 66%),
          hsl(179, 85%, 66%)
        );
        background-size: 300% 300%;
        background-position: 0 50%;
        border-radius: calc(2 * var(--border-width));
        animation: moveGradient 4s alternate infinite;
      }
    }

    @keyframes moveGradient {
      50% {
        background-position: 100% 50%;
      }
    }
  }
}
</style>
