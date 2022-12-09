<!--
 * @Descripttion: 
 * @Author: junshi junshi@ssc-hn.com
 * @Date: 2022-10-25
 * @LastEditors: junshi junshi@ssc-hn.com
 * @LastEditTime: 2022-12-09
-->

<script setup lang="ts">
  import { ref } from "vue";

  const centerDialogVisible = ref<boolean>(false);
</script>

<template>
  <div class="music-header">
    <div></div>
    <div>vue3开发播放器</div>
    <div class="user" @click="centerDialogVisible = true">
      <span>登录</span>
    </div>
  </div>

  <el-dialog v-model="centerDialogVisible" title="提示" width="30%" center>
    <span> 该功能还在开发中...... </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
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
