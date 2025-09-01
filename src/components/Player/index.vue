<template>
  <div class="player">
    <div class="player-main-body">
      <div class="player-play-btn">
        <span class="radio-btn">
          <el-icon><IconEpBack /></el-icon>
        </span>
        <span class="radio-btn">
          <el-icon v-show="player.paused" @click="playerControl('start')"
            ><IconEpVideoPlay
          /></el-icon>
          <el-icon v-show="!player.paused" @click="playerControl('start')"
            ><IconEpVideoPause
          /></el-icon>
        </span>
        <span class="radio-btn">
          <el-icon><IconEpRight /></el-icon>
        </span>
      </div>
      <div class="progress-bar">
        <div class="program-time">
          <div class="audio-title">{{ playerStore.fileObj?.fileName }}</div>
          <div class="time-text">
            <span>{{ currentTime }}</span
            >/
            <span>{{ durationTime }}</span>
          </div>
        </div>
        <div class="bar" @click="clickBar($event)">
          <el-progress
            :stroke-width="10"
            :percentage="playerStore.progress"
            :show-text="false"
          />
        </div>
      </div>
      <div class="player-list">
        <el-icon @click="addAudio"><IconEpDocument /></el-icon>
      </div>
    </div>
    <div>
      <audio
        ref="player"
        controls
        v-if="playerStore.fileObj"
        :src="playerStore.fileObj.dataUrl"
        @timeupdate="updateProgress"
        @loadedmetadata="fileLoaded"
      ></audio>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePlayerStore, usePlayerListStore } from "@/store";
import { formSecondToMS } from "@/utils/former";

const playerStore = usePlayerStore();
const playerListStore = usePlayerListStore();
const player = ref(new Audio());
const currentTime = ref("");
const durationTime = ref("");
const playerControl = (kind) => {
  switch (kind) {
    case "start":
      player.value.paused ? player.value.play() : player.value.pause();
      break;

    default:
      break;
  }
};

const clickBar = (e) => {
  const bar = document.getElementsByClassName("bar")[0];
  let percentOfClick = (e.offsetX / bar.offsetWidth) * 100;
  playerStore.setProgress(percentOfClick.toFixed(2) * 1);
};

const updateProgress = () => {
  let progress = (player.value.currentTime / player.value.duration) * 100;
  playerStore.setProgress(progress.toFixed(2) * 1);
  currentTime.value = formSecondToMS(player.value.currentTime);
};

const fileLoaded = () => {
  currentTime.value = formSecondToMS(player.value.currentTime);
  durationTime.value = formSecondToMS(player.value.duration);
};
const addAudio = async () => {
  const result = await window.electronAudio.selectAndPlay();
  if (result?.error) {
    console.log(result.error);
    return;
  }
  if (result.blobUrl) {
    console.log(result);
    // playerStore.setAudioUrl(result);
    playerListStore.updatePlayerList(result);
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        .audio-title {
          font-size: 13px;
          flex: 1;
          text-align: left;
        }
        .time-text {
          width: 120px;
          font-size: 12px;
          text-align: right;
        }
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
      :deep(.el-icon) {
        cursor: pointer;
      }
    }
  }
}
</style>
