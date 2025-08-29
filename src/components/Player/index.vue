<template>
  <div class="player">
    <div class="player-main-body">
      <div class="player-play-btn">
        <span class="radio-btn">
          <el-icon><IconEpBack /></el-icon>
        </span>
        <span class="radio-btn">
          <el-icon v-show="!playerStore.playing" @click="playerControl('start')"
            ><IconEpVideoPlay
          /></el-icon>
          <el-icon v-show="playerStore.playing" @click="playerControl('start')"
            ><IconEpVideoPause
          /></el-icon>
        </span>
        <span class="radio-btn">
          <el-icon><IconEpRight /></el-icon>
        </span>
      </div>
      <div class="progress-bar">
        <div class="program-time">3:04</div>
        <div class="bar">
          <el-progress
            :text-inside="true"
            :stroke-width="10"
            :percentage="playerStore.progress"
          />
        </div>
      </div>
      <div class="player-list">
        <el-icon><IconEpDocument /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePlayerStore } from "@/store";
const playerStore = usePlayerStore();

const playerControl = (kind) => {
  switch (kind) {
    case "start":
      playerStore.setPlayering();
      break;

    default:
      break;
  }
};
</script>

<style lang="less" scoped>
@import "@/style/var.less";
@btn-size-small: 30px;
@btn-size-middle: 40px;
.player {
  background-color: @main-bg-color;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 10px;
  .player-main-body {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .player-play-btn {
      width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        display: inline-flex;
        width: @btn-size-small;
        height: @btn-size-small;
        font-size: @btn-size-small;
        color: #fff;
        cursor: pointer;
        margin-right: 10px;

        &:nth-child(2) {
          width: @btn-size-middle;
          height: @btn-size-middle;
          font-size: @btn-size-middle;
        }
        &:nth-last-child(1) {
          margin-right: 0;
        }
        &:hover {
          color: rgb(198, 226, 255);
        }
        :deep(.el-icon) {
          width: 100%;
          height: 100%;
        }
      }
    }
    .progress-bar {
      flex: 1;
      .program-time {
        color: #fff;
        font-size: 12px;
        text-align: right;
      }
      .bar {
      }
    }
    .player-list {
      width: 60px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      color: #fff;
    }
  }
}
</style>
