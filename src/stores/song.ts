/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-18
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-09
 */
import { ref, reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { getPlayListDetail } from "@/api/index";
import { formatTopSongs, Song } from "@/utils/song";
import { search } from "@/api/index";

export interface ISong {
  /** 歌曲id */
  id?: number | null;
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

interface IMusicList {
  play?: ISong[] | [];
  search?: ISong[];
  menu?: ISong[];
  history: ISong[];
}

export const useSongStore = defineStore("song", () => {
  /** 当前播放哪一首 */
  const currentIndex = ref<number>(0);
  const isPlay = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const isSongType = ref<keyof IMusicList>('play')

  const MusicListInfo = reactive<IMusicList>({
    history: []
  })

  const songList = computed(() => {
    const list = MusicListInfo[isSongType.value] as ISong[]
    return list
  });

  const song = ref<ISong>({
    id: null,
    name: "",
    url: "",
    image: "https://peiyinimg.qupeiyin.cn/1629950282884-288.jpg",
  })

  /**获取歌单*/
  async function getSongList(id: string) {
    loading.value = true;
    let { code, playlist } = await getPlayListDetail(id);
    if (code === 200 && Array.isArray(playlist.trackIds)) {
      // Object.assign(songList, { ...formatTopSongs(playlist.tracks) });
      MusicListInfo[isSongType.value] = formatTopSongs(playlist.tracks)
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
      // Object.assign(songList, { ...formatTopSongs(result.songs) });
      MusicListInfo[isSongType.value] = formatTopSongs(result.songs)
      loading.value = false;
    } else {
      new Error("获取歌单详情失败");
      loading.value = false;
      return;
    }
  }


  function findIndex(data: ISong[], song: ISong) {
    return data.indexOf(song)
  }

  /**选择播放*/
  function selectPlay(item: ISong) {
    currentIndex.value = findIndex(songList.value, item);
    song.value = songList.value[currentIndex.value]
    onSetHistory(song.value)
  }

  /**切换歌曲*/
  function onChangeSong(type: string) {
    if (type === "next") {
      currentIndex.value = currentIndex.value + 1 > songList.value.length - 1 ? 0 : currentIndex.value + 1;
    } else {
      currentIndex.value = currentIndex.value === 0 ? songList.value.length - 1 : currentIndex.value - 1;
    }
    let item = songList.value[currentIndex.value];
    Object.assign(song.value, item);
    onSetHistory(song.value)

  }

  /**暂停播放歌曲*/
  function onChangePlay(type: boolean) {
    isPlay.value = type;
  }

  /** 加载动作 */
  function onChangeLoading(type: boolean) {
    loading.value = type;

  }

  /** 切换当前歌曲类型 */
  function onChangeSongType(type: keyof IMusicList) {
    isSongType.value = type

  }

  /** 播放历史记录 */
  function onSetHistory(song: ISong) {
    const oIndex = MusicListInfo?.history.indexOf(song)
    if (oIndex !== -1) {
      return
    } else {
      MusicListInfo?.history.push(song)
    }

  }

  return {
    song,
    songList,
    currentIndex,
    isPlay,
    loading,
    MusicListInfo,
    selectPlay,
    getSearchList,
    getSongList,
    onChangeSong,
    onChangePlay,
    onChangeSongType,
  };
}, {
  persist: {
    enabled: true, // 这个配置代表存储生效,而且是整个store都存储,默认情况下整个状态将存储在 sessionStorage 中
    strategies: [
      { storage: sessionStorage, paths: ['isPlay', 'song', 'songList', 'MusicListInfo'] },
      { storage: localStorage, paths: ['currentIndex', 'loading'] },
    ],
  }
});
