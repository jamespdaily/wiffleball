<template>
  <div v-show="isSelected">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'tab',

    pros: {
      name: {
        required: true
      },
      selected: {
        default: false
      }
    },

    data () {
      return {
        isActive: false
      }
    },

    mounted () {
      this.isActive = this.selecteds
    }
  }
</script>
