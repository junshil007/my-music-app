<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-24
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-06
-->
<script setup lang="ts">
  import { onMounted, reactive } from "vue";
  import { search, searchHot } from "@/api/home";
  import { formatTopSongs, Song } from "@/utils/song";
  import MusicList from "@/components/MusicList.vue";
  import type { ISong } from "@/stores/song";
  import { useSongStore } from "@/stores/song";
  import { storeToRefs } from "pinia";

  const state = reactive({
    Artists: [] as { first: string }[], // 热搜数组
    list: [] as ISong[], // 搜索数组
    searchValue: "", // 搜索关键词
    page: 0, // 分页
    limit: 30, // 默认查询长度
  });

  const { loading, songList } = storeToRefs(useSongStore());

  const clickHot = (name: string) => {
    state.searchValue = name;
    onEnter();
  };

  const { getSearchList, onChangeSongType } = useSongStore();

  // 搜索事件
  const onEnter = async () => {
    if (state.searchValue.replace(/(^\s+)|(\s+$)/g, "") === "") {
      console.log("搜索内容不能为空！");
      return;
    }
    state.page = 0;
    return getSearchList({
      offset: 0,
      limit: 30,
      keywords: state.searchValue,
    });
  };

  onMounted(() => {
    searchHot().then(({ result }) => {
      state.Artists = result.hots.slice(0, 5);
    });
    onChangeSongType("search");
  });
</script>

<template>
  <!--搜索-->
  <div
    class="search"
    v-loading.fullscreen.lock="loading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <div class="search-head">
      <span
        v-for="(item, index) in state.Artists"
        :key="index"
        @click="clickHot(item.first)"
      >
        {{ item.first }}
      </span>
      <input
        v-model.trim="state.searchValue"
        class="search-input"
        type="text"
        placeholder="音乐/歌手"
        @keyup.enter="onEnter"
      />
    </div>
    <MusicList
      ref="musicList"
      key="search_key"
      :list="songList"
      list-type="search"
    />
  </div>
</template>

<style lang="less" scoped>
.search {
  position: relative;
  width: auto;
  height: 100%;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  .search-head {
    display: flex;
    padding: 10px 15px;
    overflow: hidden;
    background: @search_bg_coloe;
    span {
      line-height: 40px;
      margin-right: 15px;
      cursor: pointer;
      &:hover {
        color: @text_color_active;
      }
      @media (max-width: 640px) {
        & {
          display: none;
        }
      }
    }
    .search-input {
      flex: 1;
      height: 40px;
      box-sizing: border-box;
      padding: 0 15px;
      border: 1px solid @btn_color;
      outline: 0;
      background: transparent;
      color: @text_color_active;
      font-size: @font_size_medium;
      box-shadow: 0 0 1px 0 #fff inset;
      &::placeholder {
        color: @text_color;
      }
    }
  }
  .musicList {
    width: 100%;
    // height: calc(~"100% - 50px");
  }
}
</style>
