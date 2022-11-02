<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-26
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-11-01
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import MusicList from "@/components/MusicList.vue";
import { useSongStore } from "@/stores/song";

const { getSongList, songList } = useSongStore();

onMounted(() => {
  getSongList("3778678");
});
</script>

<template>
  <div class="paly-list">
    <MusicList :list="songList"></MusicList>
  </div>
</template>

<style lang="less" scoped>
.paly-list {
  padding-right: 24px;
}
</style>
