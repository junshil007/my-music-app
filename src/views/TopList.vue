<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-24
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-10-31
-->
<script setup lang="ts">
  import { onMounted, reactive } from "vue";
  import { getTopListDetail, getPersonalized } from "@/api/home";

  interface IPorps {
    list?: any[];
    hotList?: any[];
  }

  const state = reactive<IPorps>({
    list: [], // 云音乐特色榜
    hotList: [], // 热门歌单
  });

  onMounted(async () => {
    // 推荐歌曲
    Promise.all([getTopListDetail(), getPersonalized()])
      .then(([topList, hotList]) => {
        state.list = topList.list.filter((v: any) => v.ToplistType);
        state.hotList = hotList.result.slice();
      })
      .catch(() => {});
  });
</script>

<template>
  <div class="topList music-list">
    <div class="topList-head">云音乐特色榜</div>
    <div class="topList-content">
      <div
        v-for="(item, index) in state.list"
        :key="index"
        class="list-item"
        :title="`${item.name}-${item.updateFrequency}`"
      >
        <router-link
          :to="{ path: `/details/${item.id}` }"
          tag="div"
          class="topList-item"
        >
          <div class="topList-img">
            <img :src="`${item.coverImgUrl}?param=300y300`" class="cover-img" />
          </div>
          <h3 class="name">{{ item.name }}</h3>
        </router-link>
      </div>
    </div>

    <div class="topList-head">热门歌单</div>
    <div class="topList-content hotList">
      <div
        v-for="(item, index) in state.hotList"
        :key="index"
        class="list-item"
        :title="item.name"
      >
        <router-link
          :to="{ path: `/details/${item.id}` }"
          tag="div"
          class="topList-item"
        >
          <div class="topList-img">
            <img :src="`${item.picUrl}?param=300y300`" class="cover-img" />
          </div>
          <h3 class="name">{{ item.name }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.topList {
  color: #fff;
  padding-right: 24px;
  .topList-head {
    width: 100%;
    line-height: 34px;
    padding: 20px 0;
    font-size: 18px;
  }
  .topList-content {
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, 130px));
    // grid-template-columns: minmax(100px, 200px);
    gap: 20px;
    .list-item {
      text-align: center;

      .name {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .hotList {
    grid-template-columns: repeat(auto-fill, minmax(100px, 130px));
  }
}
</style>
