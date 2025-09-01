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
      progress: 0,
      fileObj: {
        blobUrl: "",
        fileName: "",
        fileType: "",
        dataUrl: "",
      },
    };
  },
  actions: {
    setPlayering() {
      this.playing = !this.playing;
    },
    setProgress(data) {
      this.progress = data;
    },
    setAudioUrl(data) {
      console.log(data);
      this.fileObj = { ...data };
    },
  },
});

export const usePlayerListStore = defineStore("playerListStore", {
  state() {
    return {
      list: [],
      targetIndex: 0,
    };
  },
  actions: {
    updatePlayerList(data) {
      this.list.push(data);
    },
    chooseAudioFile(data) {
      this.targetIndex = data;
    },
  },
});
