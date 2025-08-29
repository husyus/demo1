import { defineStore } from "pinia";
import userList from "./userDic";

export const useUserInfoStore = defineStore("userInfoStore", {
  state: () => ({
    phone: "",
  }),
  getters: {
    userName: (state) => userList[state.phone],
  },
  actions: {
    setPhone(data) {
      console.log(data);
      this.phone = data;
    },
  },
});

export const usePlayerStore = defineStore("playerStore", {
  state() {
    return {
      playing: false,
      progress: 100,
    };
  },
  actions: {
    setPlayering() {
      console.log(1);
      this.playing = !this.playing;
    },
  },
});
