<template>
  <v-container fill-height fluid fullscreen ma-0 pa-0>
    <v-layout>
      <v-flex>
        <vue-cal />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal }
};
</script>
