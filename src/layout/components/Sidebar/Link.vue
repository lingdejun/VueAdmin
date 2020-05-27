<template>
  <component :is="type" v-bind="linkProps(to)" @click.native="click(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    },
    click(to) {
      const date = new Date()
      const path = to + '/?key=' + date.getMilliseconds()
      // console.log('click')
      // console.log(path)
      this.$router.push(path)
    }
  }
}
</script>
