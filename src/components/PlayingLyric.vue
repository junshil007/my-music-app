<template>
  <div class="song-cover-lyric">
    <div class="disc-continer">
      <div class="poster" ref="rotate">
        <img :src="songInfo.cover" alt="" />
      </div>
      <div class="song-name">{{ songInfo.name }}</div>
      <div class="song-artistsName">{{ songInfo.artistsName }}</div>
    </div>
    <div class="lyric">
      <div ref="musicLyric" class="music-lyric" :style="{ 'padding-top': paddingTop }">
        <div class="music-lyric-items" :style="lyricTop">
          <template v-if="lyricInfo.length > 0">
            <p
              v-for="(item, index) in lyricInfo"
              :key="index"
              :data-index="index"
              ref="lyric"
              :style="{
                color: lyricIndex === index ? colorLight : color,
                'font-size': fontSize,
              }"
            >
              {{ item.lyric }}
            </p>
          </template>
          <p style="color: #fff" v-else>文案加载失败！</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, computed, onMounted, toRefs } from "vue";
// import axios from "../api/request"
export default {
  props: {
    songInfo: {
      type: Object,
      default: () => [],
    },
    lyricInfo: {
      type: Object,
      default: () => [],
    },
    lyricIndex: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    console.log(props.lyricInfo,'props.lyricInfo');
    const state = reactive({
      lyricInfo: [],
      audioProgress: 0,
      thumbTranslateX: 0,
      top: 0,
      color: "#fff", //文案默认颜色
      colorLight: "#40ce8f", //文案高亮色
      fontSize: "16px", //文案字体大小
      lineHeight: "42", //每段行高
      paddingTop: "200px", //高亮文案部分居中
    });
    // let rotate = ref(null);
    onMounted(() => {
      // GetLyric(props.songInfo.id);
    });

    const lyricTop = computed(() => {
      return `transform :translate3d(0, ${(0 - state.lineHeight) * (props.lyricIndex - state.top)}px, 0);color: ${
        state.color
      };line-height: ${state.lineHeight}px`;
    });
    console.log("lyricTop", lyricTop);
    return {
      ...toRefs(state),
      lyricTop,
    };
  },
};
</script>
<style lang="less" scoped>
.song-cover-lyric {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 72px;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;

  .disc-continer {
    width: 50%;
    height: 100%;
    position: relative;

    .poster {
      position: relative;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      left: 50%;
      top: 80px;
      margin-left: -140px;
      box-shadow: 0 0 0 12px rgba(255, 255, 255, 0.4);
      animation: animations1 12s linear infinite forwards;
      animation-play-state: paused;
      overflow: hidden;
      margin-bottom: 120px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .song-name {
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 32px;
      font-weight: 600;
      color: #fff;
      line-height: 40px;
    }

    .song-artistsName {
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      color: #fff;
      line-height: 40px;
      margin-top: 24px;
    }

    @keyframes animations1 {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  }

  .lyric {
    width: 50%;
    height: 590px;
    position: relative;
    overflow: hidden;
    padding-top: 84px;
    box-sizing: border-box;

    .music-lyric {
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      mask-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.6) 15%,
        rgba(255, 255, 255, 1) 25%,
        rgba(255, 255, 255, 1) 75%,
        rgba(255, 255, 255, 0.6) 85%,
        rgba(255, 255, 255, 0) 100%
      );

      .music-lyric-items {
        text-align: center;
        font-size: 16px;
        color: #fff;
        transform: translate3d(0, 0, 0);
        transition: transform 0.6s ease-out;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        .on {
          color: #40ce8f;
        }

        P {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
