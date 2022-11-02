/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-18
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-10-31
 */
import { ref, reactive, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { getPlayListDetail } from "@/api/index";
import { formatTopSongs } from "@/utils/song";

interface ISong {
  /** 歌曲id */
  id?: number;
  /** 歌曲id */
  name?: string;
  /** 歌手名 */
  singer?: string;
  /** 专辑 */
  album?: string;
  /** 歌曲背景图 */
  image: string;
  /** 歌曲时长 */
  duration?: number;
  /** 歌曲播放地址 */
  url?: string;
}

export const useSongStore = defineStore("song", () => {
  const currentIndex = ref<number>(0);
  const song = reactive<ISong>({
    image: "https://peiyinimg.qupeiyin.cn/1629950282884-288.jpg",
    name: "",
  });

  // const song = computed(() => {
  //   return songList[currentIndex.value];
  // });

  const songList = reactive<ISong[]>([]);

  const playing = ref<boolean>(false);

  // 更新播放状态
  function onPlaying(type: boolean) {
    if (!song.url) {
      return console.log("请选择歌曲");
    }
    playing.value = type;
  }

  // 选择播放
  function selectPlay(item: any) {
    currentIndex.value = findIndex(songList, item);
    Object.assign(song, item);
  }

  // 获取歌单
  async function getSongList(id: string) {
    let { code, playlist } = await getPlayListDetail(id);
    if (code === 200 && Array.isArray(playlist.trackIds)) {
      Object.assign(songList, { ...formatTopSongs(playlist.tracks) });
    } else {
      new Error("获取歌单详情失败");
      return;
    }
  }

  function findIndex(songList: ISong[], song: ISong) {
    return songList.findIndex((item) => {
      return item.id === song.id;
    });
  }

  // 切换歌曲
  function onChangeSong(type: string) {
    if (type === "next") {
      currentIndex.value = currentIndex.value + 1 > songList.length - 1 ? 0 : currentIndex.value + 1;
    } else {
      currentIndex.value = currentIndex.value === 0 ? songList.length - 1 : currentIndex.value - 1;
    }
    let item = songList[currentIndex.value];
    Object.assign(song, item);
    //开启播放
    if (!playing.value) {
      onPlaying(true);
    }
  }

  return {
    song,
    songList,
    playing,
    currentIndex,
    onPlaying,
    selectPlay,
    getSongList,
    onChangeSong,
  };
});
