<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-31
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-10-31
-->
<script setup lang="ts">
import {} from "vue";

const ChangeActive = async (index: number) => {
  state.activeIndex = index;
  router.push({
    path: `/${state.mentRouter[state.activeIndex]}`,
  });
};

const TimeToString = (seconds: string) => {
  let param = parseInt(seconds);
  let hh = "",
    mm = "",
    ss = "";
  if (param >= 0 && param < 60) {
    param < 10 ? (ss = "0" + param) : (ss = param);
    return "00:" + ss;
  } else if (param >= 60 && param < 3600) {
    mm = parseInt(param / 60);
    mm < 10 ? (mm = "0" + mm) : mm;
    param - parseInt(mm * 60) < 10 ? (ss = "0" + String(param - parseInt(mm * 60))) : (ss = param - parseInt(mm * 60));
    return mm + ":" + ss;
  }
};

/**
 * 获取播放器duration
 */
const getDuration = () => {
  state.audioTime = TimeToString(audio.value.duration) || "00:00";
};

/**
 *  当前播放时间
 */
const getCurrentTime = () => {
  let compareTime = audio.value?.currentTime;
  for (let i = 0; i < lyricInfo.length; i++) {
    if (compareTime > parseInt(lyricInfo[i].time)) {
      const index = lyricInfo[i].index;
      if (i === parseInt(index)) {
        state.lyricIndex = i;
      }
    }
  }
  state.currentTime = TimeToString(compareTime);
  state.audioProgress = compareTime / audio.value.duration;
  state.thumbTranslateX = (state.audioProgress * state.progressL).toFixed(3);
};

/**
 * 播放到媒体的结束位置
 */
const palyEnded = () => {
  console.log("is play end", state.playType);
  switch (parseInt(state.playType)) {
    case 1: // 列表循环
      state.playIndex = state.playIndex + 1 >= state.songList.length ? 0 : state.playIndex + 1;
      break;
    case 2: // 随机播放
      state.playIndex = Math.floor(Math.random() * state.songList.length);
      break;
    case 3: // 单曲循环
      break;
  }
  state.backgroundUrl = song.image;
  state.playStatus = false;
  setTimeout(() => {
    audio.value.play();
  }, 100);
};
</script>

<template>
  <audio ref="audio" hidden="true" @canplay="getDuration" @timeupdate="getCurrentTime" @ended="palyEnded">
    <source :src="song?.url" type="audio/mpeg" />
  </audio>
</template>

<style lang="less" scoped></style>
