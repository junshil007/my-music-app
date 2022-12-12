/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-18
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-12
 */

import request from "./request";

/**
 * 获取歌词
 * @returns
 */
export const GetLiricInfo = (id: number) => {
  return request.get<string>({
    domain: "user",
    url: "/lyric",
    data: {
      id: id,
    },
  });
};

// 排行榜列表
export const getTopListDetail = () => {
  return request.get<string>({
    domain: "user",
    url: "/toplist/detail",
    data: {},
  });
};

// 首页热歌榜
export const getPlayListDetail = (id: string) => {
  return request.get<string>({
    domain: "user",
    url: "/playlist/detail",
    data: {
      id: id,
    },
  });
};

export const getPersonalized = () => {
  return request.get<string>({
    domain: "user",
    url: "/personalized",
    data: {},
  });
};

// 搜索
export function search(params: object) {
  return request.get<string>({
    domain: "user",
    url: "/cloudsearch",
    data: {
      ...params,
    },
  });
}

// 热搜
export function searchHot() {
  return request.get<string>({
    domain: "user",
    url: "/search/hot",
    data: {},
  });
}
