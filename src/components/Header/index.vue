<template>
  <div class="header-comp">
    <div class="page-title">{{ title }}</div>
    <div class="right-operate">
      <span>欢迎你,</span>
      <span>{{ userInfoStore.userName }}</span>
      <el-dropdown @command="handleCommand">
        <el-icon size="14" color="#e7e5d0"><IconEpMore /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserInfoStore } from "@/store";
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
const userInfoStore = useUserInfoStore();
const router = useRouter();

const handleCommand = (value) => {
  switch (value) {
    case "logOut":
      loginOut();
      break;

    default:
      break;
  }
};
const loginOut = () => {
  router.push("/");
};
</script>

<style lang="less" scoped>
@import "@/style/var.less";
.header-comp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: @main-bg-color;
  color: @main-font-color;
  padding: 5px 20px;
  .page-title {
    font-size: 14px;
    font-weight: 600;
    height: 20px;
    line-height: 20px;
    width: 100px;
  }
  .right-operate {
    text-align: right;
    font-size: 12px;
    & > span:nth-child(2) {
      margin-right: 10px;
    }
    :deep(.el-icon) {
      cursor: pointer;
    }
  }
}
</style>
