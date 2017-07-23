<template>
  <div class="container">
    <label class="label">{{ label }}</label>
    <div class="select">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dropdown',

    props: {
      label: {
        required: true
      }
    }
  }
</script>
