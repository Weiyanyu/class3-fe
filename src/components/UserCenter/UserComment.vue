<template>
  <h1>Commnt</h1>
</template>

<script>
export default {
  created() {
    $('.comments').addClass('active')
  },

  beforeDestroy() {
    $('.comments').removeClass('active')
  }
}
</script>

