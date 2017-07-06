<template>
<div v-show="isActive"><slot></slot></div>
</template>

<script>
  export default {
    name: 'tab',
    data () {
      return {
        isActive: false
      }
    },
    props: {
      name: {
        required: true
      },
      path: {
        required: true
      },
      selected: {
        default: false
      }
    },
    mounted () {
      this.isActive = this.selected
    }
  }
</script>
