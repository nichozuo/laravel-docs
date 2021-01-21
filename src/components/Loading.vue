<template>
  <div class="loadingContainer" v-show="count > 0">
    <a-spin size="large" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        count: (state) => state.loading.count,
      }),
    },
  }
</script>

<style lang="less" scoped>
  .loadingContainer {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    z-index: 999;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    padding-top: 30vh;
  }
</style>
