/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-26
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-11-28
 */

// 时间格式化
export function format(value: number) {
  let minute = Math.floor(value / 60);
  let second = Math.floor(value % 60);
  return `${addZero(minute)}:${addZero(second)}`;
}

// 补0函数
export function addZero(s: string | number) {
  return s < 10 ? "0" + s : s;
}

// http 链接转化成 https
export function toHttps(url: string) {
  if (!isString(url)) {
    return url;
  }
  return url.replace("http://", "https://");
}

// 判断 string 类型
export function isString(v: unknown) {
  return typeof v === "string";
}

/**
 * 时长转换
 * @param seconds 歌曲时长
 * @returns
 */
export const TimeToString = (seconds: number) => {
  let param = Math.floor(seconds);
  let hh = "",
    mm: any,
    ss: any;
  if (param >= 0 && param < 60) {
    param < 10 ? (ss = "0" + param) : (ss = param);
    return "00:" + ss;
  } else if (param >= 60 && param < 3600) {
    mm = Math.floor(param / 60);
    mm < 10 ? (mm = "0" + mm) : mm;
    param - Math.floor(mm * 60) < 10
      ? (ss = "0" + String(param - Math.floor(mm * 60)))
      : (ss = param - Math.floor(mm * 60));
    return mm + ":" + ss;
  }
};
