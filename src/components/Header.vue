<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-25
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-10-25
-->

<script setup lang="ts">
import {} from "vue";
</script>

<template>
  <div class="music-header">
    <div>1111</div>
    <div>vue3开发播放器</div>
    <div class="user"><span>登录</span></div>
  </div>
</template>

<style lang="less" scoped>
.music-header {
  width: 100%;
  line-height: 60px;
  font-size: 18px;

  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  .user {
    cursor: pointer;
    font-size: 14px;
    color: rgb(255 255 255 / 60%);
  }
}
</style>
