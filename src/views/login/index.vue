<template>
  <div class="login-page">
    <div>
      <el-form :model="formData" label-width="80px" ref="form" :rules="rules">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button size="small" type="primary" @click="btnClickFn"
          >登录</el-button
        >
        <el-button size="small" type="primary" @click="goRegister"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { validatePhone, validatePwd } from "@/utils/validate";
import { useUserInfoStore } from "@/store";
const router = useRouter();
const userInfoStore = useUserInfoStore();

let formData = ref({
  phone: "",
  password: "",
});
let form = useTemplateRef("form");
let rules = ref({
  phone: [
    { trigger: "blur", required: true, message: "请输入手机号" },
    {
      validator: validatePhone,
      trigger: "blur",
    },
  ],
  password: [
    { trigger: "blur", required: true, message: "请输入年龄" },
    {
      validator: validatePwd,
      trigger: "blur",
    },
  ],
});

const btnClickFn = () => {
  if (!form) {
    return;
  }
  form.value.validate((valid) => {
    if (valid) {
      userInfoStore.setPhone(formData.value.phone);
      router.push("/funNav");
    }
  });
};
const goRegister = () => {
  router.push("/register");
};
</script>

<style lang="less" scoped>
@import "@/style/var.less";
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: @main-bg-color;
  :deep(.el-form-item__label) {
    color: @main-font-color;
  }
  .custom-text {
    min-width: 50px;
    max-width: 170px;
    padding: 0 11px;
    word-wrap: break-word;
    text-align: left;
  }
}
</style>
