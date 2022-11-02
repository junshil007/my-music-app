<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-31
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-11-01
-->
<script setup lang="ts">
import MusicList from "@/components/MusicList.vue";
import { onMounted, ref } from "vue";
import { useSongStore } from "@/stores/song";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const loading = ref<boolean>(false);

const { getSongList, songList } = useSongStore();
onMounted(() => {
  const id = route.params.id as string;
  getSongList(id);
});
</script>

<template>
  <div v-loading.fullscreen.lock="loading" element-loading-background="rgba(0, 0, 0, 0.4)">
    <MusicList :list="songList" :listType="'duration'" />
  </div>
</template>

<style lang="less" scoped></style>
