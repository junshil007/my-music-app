<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-18
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-06
-->
<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue"
import { VideoPlay, VideoPause } from "@element-plus/icons-vue"

import { TimeToString } from "@/utils/util"
import { storeToRefs } from "pinia"
import { useSongStore } from "@/stores/song"
import { useLyricStore } from "@/stores/lyric"

import SongInfo from "@/components/SongInfo.vue"
import MenuTab from "@/components/MenuTab.vue"

const state = reactive({
  /**当前分类 播放类型，1:列表循环  2：随机播放 3：单曲循环*/
  playType: 1,
  playTypeIcon: [ "liebiaoxunhuan", "suijibofang", "danquxunhuan" ],
  playTypeTitle: [ "列表循环", "随机播放", "单曲循环" ],
  /** 歌词到哪一行了*/
  lyricIndex: 0,
  /**当前播放进度 */
  currentTime: 0,
  /**  歌曲总时长 */
  endTime: 0,
  /** 歌曲音量 */
  volume: 20,
  /** 当前是否拖拉进度条 */
  progressState: false
})

/**
 * 更改播放模式
 */
const onChangePlayType = () => {
  if (state.playType == 3) {
    state.playType = 1
  } else {
    state.playType++
  }
}

const audio = ref()
const { song, isPlay } = storeToRefs(useSongStore())
const { onChangeSong, onChangePlay } = useSongStore()
const { lyricInfo } = useLyricStore()

/**
 * 获取音乐时长
 */
const getDuration = () => {
  state.endTime = audio.value.duration
}

/**
 *  当前播放时间
 */
const getTimeupdate = (e: any) => {
  if (state.progressState) return
  let compareTime = e.target.currentTime
  for (let i = 0; i < lyricInfo.length; i++) {
    if (compareTime > lyricInfo[ i ].time) {
      const index = lyricInfo[ i ].index
      if (i === index) {
        state.lyricIndex = i
      }
    }
  }
  state.currentTime = compareTime
}

/**
 * 通过进度条改变当前音频进度
 * @param value 当前的值
 */
function changeCurrentTime (value: number) {
  audio.value.currentTime = value
  state.currentTime = value
}

/**
 *拖拽进度条
 */
function changeProgressState () {
  state.progressState = false
}

/**
 * 页面生命周期入口
 */
onMounted(() => {
  /** 对进度条做拖拽监听 */
  window.addEventListener("mouseup", changeProgressState)
})

/**
 * 播放到媒体的结束位置
 */
const palyEnded = () => {
  console.log("is play end", state.playType)
  onChangeSong("next")
}

/**
 * 控制播放按钮
 */
function play () {
  onChangePlay(true)
}
function pause () {
  onChangePlay(false)
}

/**
 * 监听歌曲源变化
 */
watch(
  () => song.value.url,
  (newValue) => {
    audio.value.load()
    var playPromise = audio.value.play()
    if (playPromise !== undefined) {
      playPromise
        .then((_: any) => {
          play()
        })
        .catch((error: any) => {
          audio.value.load()
          // play();
          console.log(error)
        })
    }
  }
)
/**
 * 监听播放开启变化
 */
watch(
  () => isPlay.value,
  (newValue) => {
    if (!audio.value.paused && !newValue) {
      audio.value.pause()
    } else {
      audio.value.play()
    }
  }
)
</script>

<template>
  <div class="net-easy-player">
    <div class="background-flitter" :style="`background-image: url(${song?.image});`"></div>
    <div class="music-mask"></div>

    <audio ref="audio" hidden="true" @canplay="getDuration" @timeupdate="getTimeupdate" @ended="palyEnded" @play="play"
      @pause="pause" :volume="state.volume / 100">
      <source :src="song?.url" type="audio/mpeg" />
    </audio>
    <div class="music-header">
      <div></div>
      <div>vue3开发播放器</div>
      <div>登录</div>
    </div>
    <div class="music-container">
      <div class="list-main">
        <div class="menu-box">
          <MenuTab></MenuTab>
        </div>
        <div class="main-container">
          <RouterView />
        </div>
      </div>
      <div class="song-info-warp">
        <SongInfo :lyricIndex="state.lyricIndex"></SongInfo>
      </div>
    </div>
    <div class="music-footer">
      <div class="song-cover">
        <img class="audioCover" :src="song.image" :title="`${song?.name}`" />
      </div>
      <div class="play-icon-container">
        <img class="play-icon" src="../assets/arrow_01.png" @click="onChangeSong('last')" alt="上一曲" />
        <!-- <el-icon :size="40" v-show="!isPlay" @click="play">
          <VideoPlay />
        </el-icon>
        <el-icon :size="40" v-show="isPlay" @click="pause">
          <VideoPause />
        </el-icon> -->
        <img v-show="!isPlay" @click="play" class="play-icon-big" src="../assets/play_01.png" alt="播放" />
        <img v-show="isPlay" @click="pause" class="play-icon-big" src="../assets/play_02.png" alt="暂停" />
        <img class="play-icon" src="../assets/arrow_02.png" @click="onChangeSong('next')" alt="下一曲" />
      </div>
      <div class="music-speed">
        <div class="name-time">
          <div>{{ song.name }}</div>
          <div>{{ TimeToString(state.currentTime) }}/{{ TimeToString(state.endTime) }}</div>
        </div>
        <el-slider v-model="state.currentTime" :min="0" :step="0.1" :max="state.endTime" :show-tooltip="false"
          :show-input-controls="false" @mousedown.native="state.progressState = true"
          @mouseup.native="changeProgressState" @change="changeCurrentTime" />
      </div>
      <div class="action-container">
        <!-- 1:列表循环  2：随机播放 3：单曲循环*/ -->
        <el-tooltip class="box-item" effect="dark" raw-content placement="top-start">
          <template #content>
            <p style="word-break: keep-all;">{{ state.playTypeTitle[ state.playType - 1 ] }}</p>
          </template>
          <div :class="`icon-${state.playTypeIcon[ state.playType - 1 ]} icon-default-size iconfont`"
            @click="onChangePlayType">

          </div>
        </el-tooltip>
        <div class="volume">
          <el-slider v-model="state.volume"></el-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.net-easy-player {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
  font-size: 18px;

  /*遮罩*/
  .music-mask,
  .background-flitter {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .music-mask {
    z-index: -1;
    background: rgba(126, 126, 126, 0.4);
  }

  .background-flitter {
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(12px);
    opacity: 0.7;
    transition: all 0.8s;
    transform: scale(1.1);
  }

  .music-header {
    width: 100%;
    line-height: 60px;
    font-size: 18px;

    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    box-sizing: border-box;
  }

  .music-container {
    position: relative;
    width: 100%;
    height: calc(~"100% - 144px");
    display: flex;

    .list-main {
      width: calc(~"100% - 320px");
      height: 100%;

      .main-container {
        width: 100%;
        box-sizing: border-box;
        padding-left: 24px;
        height: calc(~"100% - 60px");
        position: relative;
        overflow: auto;
      }

      .list-main {
        width: calc(~"100% - 320px");
        height: 100%;

        .main-container {
          width: 100%;
          box-sizing: border-box;
          padding-left: 24px;
          height: calc(~"100% - 60px");
          position: relative;
          overflow: auto;
        }
      }
    }

    .song-info-warp {
      width: 320px;
      height: 100%;
      overflow: hidden;
    }
  }

  .music-footer {
    width: 100%;
    height: 72px;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    box-shadow: -5px 0 20px rgb(83, 80, 80);

    .play-icon-container {
      width: 240px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;

      .play-icon {
        width: 36px;
        height: 36px;
        display: block;
        cursor: pointer;
      }

      .play-icon-big {
        width: 40px;
        height: 40px;
        display: block;
        cursor: pointer;
      }
    }

    .song-cover {
      width: 80px;
      padding: 9px 16px 9px 10px;
      box-sizing: border-box;

      .audioCover {
        display: block;
        width: 54px;
        height: 54px;
        border-radius: 8px;
      }
    }

    .music-speed {
      width: calc(~"100% - 520px");
      height: 100%;
      position: relative;

      .name-time {
        width: 100%;
        height: 36px;
        line-height: 36px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
    }

    .action-container {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;

      .iconfont {
        flex: 1;
        text-align: center;
        color: #fff;

        &:hover {
          color: @vue_color;
        }
      }

      .box-item {
        width: 110px;
        margin-top: 10px;
      }

      .volume {
        width: 100px;
      }
    }
  }
}
</style>
<style>
.el-slider .el-slider__bar {
  background-color: #40ce8f !important;
}

.el-slider__button {
  border: #40ce8f;
}
</style>
