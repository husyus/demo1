<template>
  <div class="login-page">
    <div>
      <el-form :model="formData" label-width="80px" ref="form1" :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="formData.sex" placeholder="">
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="formData.age"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input v-model="formData.password1"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button size="small" type="primary" @click="btnClickFn"
          >注册</el-button
        >
        <el-button size="small" type="primary" @click="goLogin"
          >去登陆</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw, useTemplateRef, reactive } from "vue";
import { validateAge, validatePhone } from "@/utils/validate";
import { useRouter } from "vue-router";

const router = useRouter();
const sexList = ref([
  { label: "男", value: "男" },
  { label: "女", value: "女" },
]);
let formData = reactive({
  name: "",
  sex: "",
  age: "",
  phone: "",
  password: "",
  password1: "",
});
let form1 = useTemplateRef("form1");

const equalTwoValue = (value, value2, rule, cb) => {
  if (value === value2) {
    cb();
  } else {
    cb(new Error("两次输入的密码不一致"));
  }
};

let rules = ref({
  name: [{ trigger: "blur", required: true, message: "请输入姓名" }],
  phone: [{ trigger: "blur", required: true, message: "请输入手机号" }],
  age: [
    { trigger: "blur", required: true, message: "请输入年龄" },
    { validator: validateAge, trigger: "blur" },
  ],
  sex: [{ trigger: "change", required: true, message: "请选择性别" }],
  password: [
    { trigger: "blur", required: true, message: "请输入密码" },
    { validator: validatePhone, trigger: "blur" },
  ],
  password1: [
    { trigger: "blur", required: true, message: "请输入密码" },
    {
      validator: validatePhone,
      trigger: "blur",
    },
    {
      validator: (rule, value, cb) =>
        equalTwoValue(value, formData.password, rule, cb),
      trigger: "blur",
    },
  ],
});

const btnClickFn = () => {
  if (!form1) {
    return;
  }
  console.log(form1);
  form1.value.validate((valid) => {
    if (valid) {
      console.log("校验通过");
    }
  });
};
const goLogin = () => {
  router.push("/");
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a638a;
  :deep(.el-form-item__label) {
    color: #fff;
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
