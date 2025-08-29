export const validatePhone = (rule, value, cb) => {
  let regObj = /^1[356789]\d{9}$/g;
  if (!regObj.test(value)) {
    cb(new Error("密码格式不对"));
  } else {
    cb();
  }
};

export const validateAge = (rule, value, cb) => {
  let regObj = /^[1-9][0-9]{0,3}$/g;
  if (regObj.test(value)) {
    cb();
  } else {
    cb(new Error("请输入正确的年龄"));
  }
};

export const validatePwd = (rule, value, cb) => {
  let regObj = /^\w{6,9}$/;
  if (regObj.test(value)) {
    cb();
  } else {
    cb(new Error("请输入6到9位的数字或者字母"));
  }
};
