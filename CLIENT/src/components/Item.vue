<template>
  <div
    class="main-row"
    @mouseover="playOver()"
    @mouseout="playOut()"
    @click="changeSong()"
  >
    <div
      class="row"
      :style="{
        backgroundColor: this.files.id == this.songNum ? 'royalblue' : '',
      }"
    >
      <div>{{ this.getFolder }}</div>
      <div>{{ this.files.file }}</div>
      <div>{{ this.files.size }}</div>
    </div>
    <div
      class="play"
      @click="playClick()"
      :style="{
        backgroundColor: this.files.id == this.songNum ? '#323232' : '',
      }"
      v-text="this.files.id == this.songNum ? '⏵' : ''"
    ></div>
    <div
      class="play"
      @click="addToPlaylist()"
      :style="{
        backgroundColor: this.files.id == this.songNum ? '#323232' : '',
      }"
      v-text="this.files.id == this.songNum ? '+' : ''"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["actual", "files", "changeSng", "songNum", "smallPlay"],
  methods: {
    changeSong: function () {
      this.changeSng(this.files.id);
    },
    playOver: function () {
      this.smallPlay(this.files.id, "over");
    },
    playOut: function () {
      this.smallPlay(this.files.id, "out");
    },
    playClick: function () {
      this.smallPlay(this.files.id, "click");
    },
    addToPlaylist: function () {
      this.smallPlay(this.files.id, "add");
    },
  },
  computed: {
    getFolder: function () {
      if (this.actual == null) {
        return this.files.folder;
      } else return this.actual;
    },
  },
};
</script>

<style scoped>
.row {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 50px;
  cursor: pointer;
}
.main-row:hover {
  background-color: dodgerblue;
}
.main-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
</style>