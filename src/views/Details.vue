<!--
 * @Descripttion: 歌曲合集详情
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-31
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-09
-->
<script setup lang="ts">
  import MusicList from "@/components/MusicList.vue";
  import { onMounted, ref } from "vue";
  import { useSongStore } from "@/stores/song";
  import { useRoute } from "vue-router";
  import { storeToRefs } from "pinia";

  const route = useRoute();

  const { getSongList, onChangeSongType } = useSongStore();
  const { loading, songList } = storeToRefs(useSongStore());

  onMounted(() => {
    const id = route.params.id as string;
    getSongList(id);
    onChangeSongType("menu");
  });
</script>

<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <MusicList :list="songList" :listType="'duration'" />
  </div>
</template>

<style lang="less" scoped></style>
