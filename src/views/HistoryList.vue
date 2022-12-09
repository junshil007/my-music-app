<!--
 * @Descripttion: 播放历史
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-24
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-09
-->
<script setup lang="ts">
  import MusicList from "@/components/MusicList.vue";
  import { useSongStore } from "@/stores/song";
  import { useRoute } from "vue-router";
  import { storeToRefs } from "pinia";
  import { onMounted } from "vue";

  const route = useRoute();
  const { onChangeSongType } = useSongStore();
  const { MusicListInfo } = storeToRefs(useSongStore());

  onMounted(() => {
    onChangeSongType("history");
  });
</script>

<template>
  <div class="HistoryList">播放历史</div>
  <MusicList :list="MusicListInfo.history" :listType="'duration'" />
</template>

<style lang="less" scoped>
.HistoryList {
  padding: 24px;
}
</style>
