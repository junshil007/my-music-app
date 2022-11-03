<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { format } from "@/utils/util";
import { useSongStore } from "@/stores/song";
import { VideoPlay, Delete, VideoPause } from "@element-plus/icons-vue";
import type { Song } from "@/utils/song";
import { storeToRefs } from "pinia";

interface Props {
  list?: Song[];
  listType?: string;
}

const LIST_TYPE_DURATION = "duration";

const { song, isPlay } = storeToRefs(useSongStore());
const { selectPlay, onChangePlay } = useSongStore();

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  listType: "duration",
});

const listType = ref(props.listType);

const list = computed(() => {
  return props.list;
});

const isDuration = computed(() => {
  return listType.value === LIST_TYPE_DURATION;
});

/**
 * @param item 选择播放的歌曲
 * 同时加载歌词
 */
const onPlayMusic = (item: any) => {
  console.log(item, "item");

  selectPlay(item);
  onChangePlay(true);
};

/**
 * @param item 暂停正在播放的歌曲
 */
const onPauseMusic = (item: any) => {
  onChangePlay(false);
};

const deleteItem = (index: number) => {
  console.log(index);
};
</script>

<template>
  <!--歌曲列表-->
  <div class="musicList">
    <template v-if="list.length > 0">
      <div class="list-item list-header">
        <span class="list-name">歌曲</span>
        <span class="list-artist">歌手</span>
        <span v-if="isDuration" class="list-time">时长</span>
        <span v-else class="list-album">专辑</span>
      </div>
      <div class="list-content">
        <div
          v-for="(item, index) in list"
          :key="item.id"
          class="list-item"
          :class="{ on: isPlay && song.id === item.id }"
        >
          <span class="list-num" v-text="index + 1"></span>
          <div class="list-name">
            <span>{{ item.name }}</span>
            <div class="list-menu">
              <div class="hover list-menu-icon-do">
                <el-icon size="large" v-if="isPlay && song.id === item.id" @click="onPauseMusic(item)">
                  <VideoPause
                /></el-icon>
                <el-icon size="large" v-else @click="onPlayMusic(item)"><VideoPlay /></el-icon>
              </div>
            </div>
          </div>
          <span class="list-artist">{{ item.singer }}</span>
          <span v-if="isDuration" class="list-time">
            {{ format(item.duration % 3600) }}
            <span class="hover list-menu-icon-del">
              <el-icon size="large"><Delete /></el-icon>
            </span>
          </span>
          <span v-else class="list-album" @click="deleteItem(item)">{{ item.album }}</span>
        </div>
        <slot name="listBtn"></slot>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
@import url("@/styles/mixin.less");
.list-header {
  border-bottom: 1px solid @list_head_line_color;
  color: @text_color_active;

  .list-name {
    padding-left: 40px;
    user-select: none;
  }

  font-size: 14px;
}

.list-content {
  width: 100%;
  font-size: 14px;
  height: calc(~"100% - 60px");
  overflow-x: hidden;
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;
}

.list-no {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: @text_color;
}

.list-item {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid @list_item_line_color;
  line-height: 50px;
  overflow: hidden;

  &.list-item-no {
    justify-content: center;
    align-items: center;
  }

  &.on {
    color: #fff;

    .list-num {
      font-size: 0;
      background: url("@/assets/wave.gif") no-repeat center center;
    }
  }

  &:hover {
    .list-name {
      padding-right: 80px;

      .list-menu {
        display: block;
      }
    }
  }

  &:not([class*="list-header"]):hover {
    .list-name {
      padding-right: 80px;

      .list-menu {
        display: block;
      }
    }

    .list-time {
      font-size: 0;
      .list-menu-icon-del {
        display: contents;
      }
    }
  }

  .list-num {
    display: block;
    width: 30px;
    margin-right: 10px;
    text-align: center;
  }

  .list-name {
    position: relative;
    flex: 1;
    box-sizing: border-box;

    & > span {
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      cursor: pointer;
    }

    small {
      margin-left: 5px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }

    /*hover菜单*/

    .list-menu {
      display: none;
      position: absolute;
      top: 50%;
      right: 10px;
      font-size: 0;
      transform: translateY(-50%);
    }

    .list-menu-icon-do {
      display: flex;
    }
  }

  .list-artist,
  .list-album {
    display: block;
    width: 300px;
    .no-wrap();
    @media (max-width: 1440px) {
      width: 200px;
    }
    @media (max-width: 1200px) {
      width: 150px;
    }
  }

  .list-time {
    display: flex;
    width: 60px;
    padding: 0 10px;
    justify-content: center;
    align-items: center;

    .list-menu-icon-del {
      display: none;
    }
  }
}

@media (max-width: 960px) {
  .list-item .list-name {
    padding-right: 70px;
  }
}

@media (max-width: 768px) {
  .list-item {
    .list-name .list-menu {
      display: block;
    }

    .list-artist,
    .list-album {
      width: 20%;
    }
  }
}

@media (max-width: 640px) {
  .list-item {
    .list-artist {
      width: 80px;
    }

    .list-album,
    .list-time {
      display: none;
    }
  }
}
</style>
