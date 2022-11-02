<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-11-02
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-11-02
-->
<template>
  <div class="audio__wrap">
    <audio
      ref="audio"
      :src="currentPlayUrl"
      @timeupdate="timeupdate"
      @canplay="getDuration"
      @play="play"
      @pause="pause"
    ></audio>
    <div
      class="audio__progress"
      :class="[showCircle ? 'show' : 'notShow']"
      @mouseover="showCircle = true"
      @mouseleave="showCircle = false"
    >
      <el-slider
        v-model="currentTime"
        :min="0"
        :max="endTime"
        :show-tooltip="false"
        :show-input-controls="false"
        @change="changeCurrentTime"
      />
    </div>
    <div class="audio__block">
      <img :src="infoList[currentIndex].al.picUrl" class="img" />
      <div class="info__block">
        <div>
          <span class="name">{{ infoList[currentIndex].name }} </span>
          <span class="line">-</span>
          <span v-for="item in infoList[currentIndex].ar" :key="item.id" class="singerName">{{ item.name }} </span>
          <div class="time">{{ calTime(currentTime) }} / {{ calTime(endTime) }}</div>
        </div>
      </div>
      <div class="icon-controls">
        <i class="iconfont icon-diyiyeshouyeshangyishou prev" @click="prevPlay()" />
        <play-icon :width="45" :height="45" :iconSize="26" :isPlay="isPlay" @click="controlPlay" />
        <i class="iconfont icon-zuihouyiyemoyexiayishou next" @click="nextPlay()" />
      </div>
      <div class="list-controls">
        <i class="iconfont icon-liebiaoxunhuan list-circul" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { nextTick } from "vue";
import PlayIcon from "@/components/icon/PlayIcon.vue";
import { calTime } from "@/utils/utils";

export default defineComponent({
  components: { PlayIcon },
  setup() {
    const audio = ref();

    const state = reactive({
      isPlay: false,
      currentTime: 0,
      endTime: 0,
      showCircle: false,
      // 当前播放的歌单url
      playList: [
        {
          url: "http://m7.music.126.net/20210326150405/a91efaab5690d7966eff4f8104ae575e/ymusic/9ba6/4a9a/e903/eaca05cc36e0d64a2cd104722f6f9cc4.mp3",
        },
        {
          url: "http://m7.music.126.net/20210326154148/251d2d32b08419744ca682170d98bf35/ymusic/0409/520c/5158/3c17fbba85efa6b428d2f2dafd5de326.mp3",
        },
        {
          url: "http://m8.music.126.net/20210326162043/b8af89f1ac2579ea17035b51a7656f7f/ymusic/7634/c63c/a0c1/ad330e06c7f3c791d065af5c255e002c.mp3",
        },
      ],
      // 歌曲信息
      infoList: [
        {
          id: 1393394219,
          name: "Toothbrush",
          al: {
            id: 81949037,
            picUrl: "https://p1.music.126.net/dGrgYPQEde-xk1oSAZjyyA==/109951164820048861.jpg",
          },
          ar: [{ id: 28867131, name: "KikoBlob" }],
        },
        {
          id: 25962464,
          name: "Tom And Jerry",
          al: {
            id: 2348299,
            picUrl: "https://p1.music.126.net/7-v1gIVbimGDkQ9ALE6zvg==/6042915906752898.jpg",
          },
          ar: [{ id: 0, name: "Bradley" }],
        },
        {
          id: 5041188,
          name: "Elements",
          al: {
            id: 500661,
            picUrl: "https://p1.music.126.net/Eu7h6JAEftfSweGLNeDzBA==/6649846325500946.jpg",
          },
          ar: [{ id: 80585, name: "Tom Lehrer" }],
        },
      ],
      currentIndex: 0,
    });

    // 当前播放的url
    const currentPlayUrl = computed(() => {
      return state.playList[state.currentIndex].url;
    });

    /**
     * 播放音乐
     */
    function audioPlay() {
      audio.value.play();
      state.isPlay = true;
    }
    /**
     * 更新当前时间
     * 如果当前音频进度 = 总时长，则自动播放下一首
     */
    function timeupdate(e: any) {
      state.currentTime = e.target.currentTime;
      if (e.target.currentTime === state.endTime) {
        nextPlay();
      }
    }
    /**
     * 获取音乐时长
     */
    function getDuration() {
      state.endTime = audio.value.duration;
    }
    /**
     * 通过进度条改变当前音频进度
     * @param value 当前的值
     */
    function changeCurrentTime(value: number) {
      audio.value.currentTime = value;
      state.currentTime = value;
    }
    /**
     * 上一首播放
     */
    function prevPlay() {
      state.currentIndex = state.currentIndex === 0 ? state.playList.length - 1 : state.currentIndex - 1;
      nextTick(() => {
        audioPlay();
      });
    }
    /**
     * 下一首播放
     */
    function nextPlay() {
      state.currentIndex = state.currentIndex === state.playList.length - 1 ? 0 : state.currentIndex + 1;
      nextTick(() => {
        audioPlay();
      });
    }

    /**
     * 控制播放按钮
     */
    function controlPlay() {
      state.isPlay = !state.isPlay;
      if (!audio.value.paused) {
        audio.value.pause();
      } else {
        audio.value.play();
      }
    }
    function play() {
      state.isPlay = true;
    }
    function pause() {
      state.isPlay = false;
    }

    onMounted(() => {
      audioPlay();
    });

    return {
      ...toRefs(state),
      audio,
      timeupdate,
      getDuration,
      currentPlayUrl,
      prevPlay,
      nextPlay,
      controlPlay,
      changeCurrentTime,
      calTime,
      play,
      pause,
    };
  },
});
</script>

<style lang="scss">
.audio__wrap {
  position: fixed;
  bottom: 0;
  min-width: 1200px;
  width: 100%;
  @include background_color("background-global");
}
.audio__progress {
  .el-slider__runway {
    width: 100%;
    height: 5px;
    margin-bottom: 15px;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
    @include background_color("background-dot");
  }
  .el-slider__bar {
    height: 6px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    position: absolute;
    background: #d33a31;
  }
  .el-slider__button {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    border: 2px solid #d33a31;
    background-color: #d33a31;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
.audio__block {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 20px 15px 20px;
  @include background_color("background-global");
  .img {
    width: 70px;
    height: 70px;
    border-radius: 8px;
  }
  .info__block {
    margin-left: 20px;
    height: 70px;
    line-height: 35px;
    .name {
      @include font_color("text-primary");
      &:hover {
        cursor: pointer;
      }
    }
    .line {
      margin-left: 10px;
      @include font_color("text-second");
    }
    .singerName {
      @include font_color("text-second");
      font-size: 14px;
      margin-left: 10px;
      &:hover {
        cursor: pointer;
        @include font_color("text-second-actived");
      }
    }
    .time {
      @include font_color("text-gray");
      font-size: 14px;
    }
  }
  .icon-controls {
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .prev,
    .next {
      color: #d33a31;
      font-size: 40px !important;
      margin: 0 20px;
      cursor: pointer;
    }
  }
  .list-controls {
    position: absolute;
    right: 150px;
    .list-circul {
      @include font_color("text-primary");
      font-size: 24px;
    }
  }
}
.show .el-slider__button-wrapper {
  display: block;
}
.notShow .el-slider__button-wrapper {
  display: none;
}
</style>
