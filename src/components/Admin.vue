<template>
  <div class="container">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Players">
      </b-tab-item>

      <b-tab-item label="Teams">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque vestibulum dui vel molestie egestas.
        Nulla vulputate elementum diam quis consectetur.
        Integer pulvinar laoreet nibh non faucibus.
        Suspendisse ut cursus lectus. Donec consectetur turpis at leo ultricies rhoncus.
        Cras consequat aliquet eros nec porta.
        Nullam sit amet mollis turpis.
        Aenean vitae tortor et velit sodales faucibus.
      </b-tab-item>

      <b-tab-item label="Rosters">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque vestibulum dui vel molestie egestas.
        Nulla vulputate elementum diam quis consectetur.
        Integer pulvinar laoreet nibh non faucibus.
      </b-tab-item>
    </b-tabs>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'admin',

    data () {
      return {
        activeTab: 0
      }
    }
  }
</script>
