<template>
  <web-view :src="url"></web-view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      url: ""
    };
  },
  onLoad(options) {
    this.url = decodeURIComponent(options.url);
  }
};
</script>

<style scoped></style>
