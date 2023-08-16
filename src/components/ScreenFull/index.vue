<template>
  <div>
    <svg-icon icon-class="fullscreen" @click="changeScreen" />
  </div>
</template>

<script>
export default {

  data() {
    return {

    }
  },

  methods: {
    changeScreen() {
      document.documentElement.requestFullscreen()
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
