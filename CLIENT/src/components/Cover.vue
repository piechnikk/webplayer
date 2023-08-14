<template>
  <div @click="click()">
    <img
      :src="this.url+'/mp3/' + this.path + '/cover.jpg'"
      alt="okladka"
    />
  </div>
</template>

<script>
export default {
  props: ["path", "fetchx", "url"],
  methods: {
    click: function () {
      this.fetchx(this.path);
    },
  },
};
</script>

<style scoped>
img {
  width: calc(15vw - 20px);
  height: calc(15vw - 20px);
  cursor: pointer;
}
</style>