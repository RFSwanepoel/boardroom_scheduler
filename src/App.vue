<template>
  <v-app>
    <v-toolbar dense app dark>
      <v-avatar color="transparent">
          <img :src="require('./assets/ff_embliem_small.png')" alt="avatar">
        </v-avatar>
      <v-toolbar-title class="headline text-uppercase">
        <span>BOARDROOM</span>
        <span class="font-weight-light">SCHEDULER</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn small flat icon color="orange" to="/report">
          <v-icon>fa-chart-pie</v-icon>
        </v-btn>
        <v-btn small flat icon color="orange" to="/">
          <v-icon>fa-home</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content app>
      <v-fab-transition>
        <router-view />
      </v-fab-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
<style>
.v-toolbar{
  /* z-index: 3 !important; */
}
</style>
