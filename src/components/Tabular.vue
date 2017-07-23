<template>
  <table class="table is-striped is-narrow">
    <thead>
      <slot name="tableHeader"></slot>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script>

  export default {
    name: 'tabular',

    props: {
      headers: []
    }
  }
</script>
