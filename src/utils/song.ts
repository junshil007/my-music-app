/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-31
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-11-02
 */
import { toHttps } from "./util";

function filterSinger(singers: any[]) {
  let arr: any[] = [];
  singers.forEach((item: { name: any }) => {
    arr.push(item.name);
  });
  return arr.join("/");
}

interface item {
  id: number;
  name: string;
  singer: string;
  album: string;
  image: string | null;
  duration: number;
  url: string;
}

export class Song {
  [x: string]: string | null | number;
  constructor({ id, name, singer, album, image, duration, url }: item) {
    this.id = id;
    this.name = name;
    this.singer = singer;
    this.album = album;
    this.image = image;
    this.duration = duration;
    this.url = url;
  }
}

/**
 *歌曲数据格式化
 * @param music 返回的初始对象
 * @returns
 */
export function createPlayList(music: {
  id: number;
  name: string;
  artists: string[];
  album: { name: string; picUrl: string };
  duration: number;
}) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.artists.length > 0 ? filterSinger(music.artists) : "",
    album: music.album.name,
    image: toHttps(music.album.picUrl) || null,
    duration: music.duration / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
  });
}

/**
 * 格式化 推荐音乐列表
 * @param music 返回的初始对象
 * @returns
 */
export function createTopList(music: {
  id: number;
  name: string;
  ar: string[];
  al: { name: any; picUrl: string };
  dt: number;
}) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.ar.length > 0 ? filterSinger(music.ar) : "",
    album: music.al.name,
    image: toHttps(music.al.picUrl) || null,
    duration: music.dt / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
  });
}

export const formatSongs = function formatPlayList(list: any[]) {
  let Songs: Song[] = [];
  list.forEach((item: any) => {
    const musicData = item;
    if (musicData.id) {
      Songs.push(createPlayList(musicData));
    }
  });
  return Songs;
};

export const formatTopSongs = function formatTopList(list: any[]) {
  let Songs: Song[] = [];
  list.forEach((item: any) => {
    const musicData = item;
    if (musicData.id) {
      Songs.push(createTopList(musicData));
    }
  });
  return Songs;
};
