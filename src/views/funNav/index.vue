<template>
  <div class="fun-nav">
    <Header title="播放列表"></Header>
    <div class="main-content-view">
      <div class="left">
        <List :list="playerListStore.list"></List>
      </div>
      <div class="right"></div>
    </div>
    <Player />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserInfoStore, usePlayerListStore } from "@/store";
import Header from "@/components/Header/index.vue";
import Player from "@/components/Player/index.vue";
import List from "@/components/List/index.vue";

const userInfoStore = useUserInfoStore();
const playerListStore = usePlayerListStore();

onMounted(() => {
  console.log(userInfoStore.userName);
});
</script>

<style lang="less" scoped>
.fun-nav {
  width: 100vw;
  height: 100vh;
  .main-content-view {
  }
}
</style>
