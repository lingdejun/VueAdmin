<template>
  <booking-detail :is-edit="true" />
</template>

<script>
import BookingDetail from './components/BookingDetail'

export default {
  name: 'BookingDetailForm',
  components: { BookingDetail }
}
</script>

<style scoped>
</style>
