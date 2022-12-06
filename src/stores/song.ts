/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-18
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-11-04
 */
import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { getPlayListDetail } from "@/api/index";
import { formatTopSongs } from "@/utils/song";
import { search } from "@/api/index";

export interface ISong {
  /** 歌曲id */
  id?: number;
  /** 歌曲id */
  name?: string;
  /** 歌手名 */
  singer?: string;
  /** 专辑 */
  album?: string;
  /** 歌曲背景图 */
  image?: string;
  /** 歌曲时长 */
  duration?: number;
  /** 歌曲播放地址 */
  url?: string;
}

export const useSongStore = defineStore("song", () => {
  /** 当前播放哪一首 */
  const currentIndex = ref<number>(0);
  const isPlay = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const defaultSong = {
    id: null,
    name: "",
    url: "",
    image: "https://peiyinimg.qupeiyin.cn/1629950282884-288.jpg",
  };
  const songList = reactive<ISong[]>([]);

  const song = computed(() => {
    return songList.length > 0 ? songList[currentIndex.value] : defaultSong;
  });

  /**获取歌单*/
  async function getSongList(id: string) {
    loading.value = true;
    let { code, playlist } = await getPlayListDetail(id);
    if (code === 200 && Array.isArray(playlist.trackIds)) {
      Object.assign(songList, { ...formatTopSongs(playlist.tracks) });
      loading.value = false;
    } else {
      new Error("获取歌单详情失败");
      loading.value = false;
      return;
    }
  }

  /** 搜索歌曲 */
  async function getSearchList(params: any) {
    loading.value = true;
    let { result, code } = await search(params);
    if (code === 200) {
      Object.assign(songList, { ...formatTopSongs(result.songs) });
      loading.value = false;
    } else {
      new Error("获取歌单详情失败");
      loading.value = false;
      return;
    }
  }

  function findIndex(songList: ISong[], song: ISong) {
    return songList.findIndex((item) => {
      return item.id === song.id;
    });
  }

  /**选择播放*/
  function selectPlay(item: any) {
    currentIndex.value = findIndex(songList, item);
  }

  /**切换歌曲*/
  function onChangeSong(type: string) {
    if (type === "next") {
      currentIndex.value = currentIndex.value + 1 > songList.length - 1 ? 0 : currentIndex.value + 1;
    } else {
      currentIndex.value = currentIndex.value === 0 ? songList.length - 1 : currentIndex.value - 1;
    }
    let item = songList[currentIndex.value];
    Object.assign(song, item);
  }

  /**暂停播放歌曲*/
  function onChangePlay(type: boolean) {
    isPlay.value = type;
  }

  /** 加载动作 */
  function onChangeLoading(type: boolean) {
    loading.value = type;
  }

  return {
    song,
    songList,
    currentIndex,
    isPlay,
    loading,
    selectPlay,
    getSearchList,
    getSongList,
    onChangeSong,
    onChangePlay,
  };
});
