<template>
    <v-layout fill-height id="loaderWrapper" align-center align-content-center>
        <v-flex align-center align-content-center style="align-self: center">
          <div class="text-xs-center">
          <v-chip class="loaderColor--text">
            <v-avatar >
              <v-progress-circular :width="3" indeterminate color="loaderColor"></v-progress-circular>
              </v-avatar>
              {{progressData.msg}}
            </v-chip>
          </div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed:{
    progressData() {
      let self = this;
      let data = this.$store.getters["guiMod/getProgressData"];
      return data;
    }
  }
};
</script>

<style scoped>
#loaderWrapper {
  position: fixed;
  /* margin: auto; */
  height: 100%;
  width: 100%;
  vertical-align: center;
  background-color:rgba(0,0,0,0.5);
  text-align: center;
  z-index: 10000;
}
</style>