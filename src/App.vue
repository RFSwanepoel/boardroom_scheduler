<template>
  <v-app>
    <v-toolbar app dark>
      <v-avatar color="transparent">
          <img :src="require('./assets/ff_embliem_small.png')" alt="avatar">
        </v-avatar>
      <v-toolbar-title class="headline text-uppercase">
        <span>BOARDROOM</span>
        <span class="font-weight-light">SCHEDULER</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content app>
      <router-view />
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
