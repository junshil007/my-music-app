/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-27
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-10-31
 */
import { defineStore } from "pinia";
import { reactive } from "vue";
import { useSongStore } from "./song";
import { GetLiricInfo } from "@/api";

interface ILyricInfo {
  lyric: string;
  time: number;
  uid: string;
  index: number;
}

const GetLyricList = (lrc: string) => {
  let lyricsObjArr: {}[] = [];
  const regNewLine = /\n/;
  const lineArr = lrc.split(regNewLine); // 每行歌词的数组
  const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
  lineArr.forEach((item) => {
    if (item === "") return;
    const obj = {
      lyric: "",
    };
    const time = item.match(regTime);
    Object.assign(obj, {
      lyric: item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim(),
      time: time ? TimeToSeconds(time[0].slice(1, time[0].length - 1)) : 0,
      uid: Math.random().toString().slice(-6),
    });
    if (obj.lyric === "") {
      console.log("这一行没有歌词");
    } else {
      lyricsObjArr.push(obj);
    }
  });
  const lyricInfo = lyricsObjArr.map((item, index) => {
    item.index = index;
    return {
      ...item,
    };
  });
  return lyricInfo;
};

const TimeToSeconds = (time: string) => {
  // 格式化歌词的时间 转换成 sss:ms
  const regMin = /.*:/;
  const regSec = /:.*\./;
  const regMs = /\./;

  const min = parseInt(time.match(regMin)[0].slice(0, 2));
  let sec = parseInt(time.match(regSec)[0].slice(1, 3));
  const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3);
  if (min !== 0) {
    sec += min * 60;
  }
  return Number(sec + "." + ms);
};

export const useLyricStore = defineStore("lyric", () => {
  const lyricInfo = reactive<ILyricInfo[]>([]);

  const getMusicLiric = async () => {
    const { song } = useSongStore();
    if (!song.id) return;
    let res = await GetLiricInfo(song.id as number);
    Object.assign(lyricInfo, GetLyricList(res.lrc.lyric));
  };

  return { lyricInfo, getMusicLiric };
});
