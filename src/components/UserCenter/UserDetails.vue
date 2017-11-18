<template>
  <h1>Details</h1>
</template>

<script>
export default {
  created() {
    $('.details').addClass('active')
  },
  beforeDestroy() {
    $('.details').removeClass('active')
  }
}
</script>

