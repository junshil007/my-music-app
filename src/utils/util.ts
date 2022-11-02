/*
 * @Descripttion:
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-26
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-10-31
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
