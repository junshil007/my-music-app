<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watchEffect } from "vue";
import { useSongStore } from "@/stores/song";
import { useLyricStore } from "@/stores/lyric";
import { storeToRefs } from "pinia";

interface Props {
  nolyric?: boolean;
  lyricIndex: number;
}

const LyricStyle = reactive({
  /**文案默认颜色 */
  color: "#fff",
  /**文案高亮色 */
  colorLight: "#40ce8f",
  /**文案字体大小 */
  fontSize: "12px",
  /**高亮文字大小 */
  activeSize: "14px",
  /**每段行高 */
  lineHeight: 34,
  /**高亮文案部分居中 */
  paddingTop: 150,
});

const props = defineProps<Props>();
const { song } = storeToRefs(useSongStore());
const { lyricInfo } = useLyricStore();

const top = ref<number>(0);
const musicLyric = ref<HTMLDivElement | null>(null);

const lyricTop = computed(() => {
  return `transform :translate3d(0, ${-LyricStyle.lineHeight * (props.lyricIndex - top.value)}px, 0);color: ${
    LyricStyle.color
  };line-height: ${JSON.stringify(LyricStyle.lineHeight)}px; font-size:${LyricStyle.fontSize}`;
});

const lyricLineStyle = (index: number) => {
  return {
    color: props.lyricIndex === index ? LyricStyle.colorLight : LyricStyle.color,
    fontSize: props.lyricIndex === index ? LyricStyle.activeSize : LyricStyle.fontSize,
  };
};

onMounted(() => {
  clacTop();
});

const clacTop = () => {
  const dom = musicLyric.value;
  if (dom) {
    console.log(dom.clientHeight);
    LyricStyle.paddingTop = dom.clientHeight / 2 - LyricStyle.lineHeight;
  }
};
</script>

<template>
  <div class="song-info">
    <!--封面-->
    <dl class="music-info">
      <dt>
        <img :src="`${song.image}?param=300y300`" />
      </dt>
      <template v-if="song.id">
        <dd>歌曲名：{{ song.name }}</dd>
        <dd>歌手名：{{ song.singer }}</dd>
        <dd>专辑名：{{ song.album }}</dd>
      </template>
      <template v-else>
        <dd>请选择歌曲</dd>
        <dd>还未获取到歌曲信息</dd>
      </template>
    </dl>
    <!--歌词-->
    <div ref="musicLyric" class="music-lyric" :style="{ 'padding-top': LyricStyle.paddingTop + 'px' }">
      <div class="music-lyric-items" :style="lyricTop">
        <p v-if="!song.id">还没有播放音乐哦！</p>
        <p v-else-if="nolyric">暂无歌词！</p>
        <template v-else-if="lyricInfo.length > 0">
          <p v-for="(item, index) in lyricInfo" :key="index" :style="lyricLineStyle(index)">
            {{ item.lyric }}
          </p>
        </template>
        <p v-else>歌词加载失败！</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url("@/styles/mixin.less");

.song-info {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.music-info {
  flex: 0 0 auto;
  padding-bottom: 20px;
  text-align: center;
  font-size: @font_size_medium;
  dt {
    position: relative;
    width: 186px;
    height: 186px;
    margin: 0 auto 15px;
    &:after {
      content: "";
      position: absolute;
      left: 9px;
      top: 0;
      width: 201px;
      height: 180px;
      background: url("@/assets/img/album_cover_player.png") 0 0 no-repeat;
    }
    img {
      vertical-align: middle;
      width: 186px;
      height: 186px;
    }
  }
  dd {
    height: 30px;
    line-height: 30px;
    .no-wrap();
  }
}

/*歌词部分*/
.music-lyric {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  -webkit-mask-image: linear-gradient(
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
    line-height: 34px;
    font-size: @font_size_small;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    .no-wrap();

    P {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
