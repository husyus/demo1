<template>
  <div class="fun-nav">
    <Header title="应用列表"></Header>
    <div></div>
    <Player />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserInfoStore } from "@/store";
import Header from "@/components/Header/index.vue";
import Player from "@/components/Player/index.vue";

const userInfoStore = useUserInfoStore();

onMounted(() => {
  console.log(userInfoStore.userName);
});
</script>

<style lang="less" scoped>
.fun-nav {
  width: 100vw;
  height: 100vh;
}
</style>
