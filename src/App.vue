<template>
  <v-app dark>
    <modal></modal>
    <progress-loader v-show="progressLoaderVisible"></progress-loader>
    <v-toolbar dense app dark class="main">
      <v-avatar color="transparent">
        <img :src="require('./assets/ff_embliem_small.png')" alt="avatar">
      </v-avatar>
      <v-toolbar-title class="headline text-uppercase headerColor--text">
        <span>BOARDROOM</span>
        <span class="font-weight-light">SCHEDULER</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn small flat  color="headerColor" to="/report">
        <v-layout column align-center justify-center>
          <v-flex><v-icon small>fa-chart-pie</v-icon></v-flex>
          <v-flex>Reports</v-flex>
        </v-layout>
        </v-btn>
        <v-btn small flat  color="headerColor" to="/">
        <v-layout column align-center justify-center>
          <v-flex><v-icon small>fa-home</v-icon></v-flex>
          <v-flex>calendar</v-flex>
        </v-layout>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content app>
      <v-fab-transition>
        <router-view/>
      </v-fab-transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProgressLoader from "@/components/ProgressLoader";
import Modal from "@/components/modal";
import config from '@/config'

export default {
  name: "App",
  components: {
    Modal,
    ProgressLoader
  },
  data() {
    return {
    };
  },
  computed: {
    progressLoaderVisible() {
      return this.$store.getters["guiMod/progressLoaderVisible"];
    }
  },
  mounted(){
    let self = this;
    self.$store.dispatch("guiMod/setProgressModalContent", {msg: `Loading App...`});
    setTimeout(()=>{
      self.$store.dispatch('guiMod/hideProgressModal')
    }, config.dummyModeTimout);
  }
};
</script>
<style>
body::-webkit-scrollbar{
  display:none;
}
::-webkit-scrollbar {
  width: 0.5em;
  border-radius: 8px;
}
::-webkit-scrollbar-track {
  background-color: rgba(255, 225, 225, 0.2);
  box-shadow: inset -1px -1px 2px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb {
  opacity: 0.5;
  background-color:rgba(255,179,71,0.5);
  outline: none;
  border-radius: 8px;
}

.v-toolbar.main {
  z-index: 50 !important;
}
</style>
