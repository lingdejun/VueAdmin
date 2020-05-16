<template>
  <div class="app-container">
    <div class="content-container">
      <el-calendar v-model="value" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      value: new Date()
    }
  }
}
</script>
<style scoped>
.app-container{
  min-height: inherit;
}
.content-container{
  background-color:#FFFFFF
}
</style>
