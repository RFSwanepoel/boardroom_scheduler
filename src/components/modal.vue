<template>
 <v-layout app id="modalDialogWrapper" v-if="isDialogVisible" row justify-center>
    <v-dialog v-model="isDialogVisible" persistent max-width="250px">
      <v-btn slot="activator" color="" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title :class="`headline white--text`" :color="type">{{modalDialogData.title}}</v-card-title>
        <v-card-text v-html="modalDialogData.message"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn @click.native="cancellButtonMethod">{{(modalDialogData.buttons && modalDialogData.buttons.cancel &&  modalDialogData.buttons.cancel.title) || buttons.cancel.title }}</v-btn>
            <v-btn v-if="modalDialogData.buttons && modalDialogData.buttons.action" color="green darken-1" @click.native="actionButtonMethod">{{(modalDialogData.buttons && modalDialogData.buttons.action &&  modalDialogData.buttons.action.title) || buttons.action.title }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>

export default {
  data() {
    return {
      type: "toolbarColor",
      buttons: {
        action: {
          title: "Ok",
          method: self.hideDialog
        },
        cancel: {
          title: "Cancel",
          method: self.hideDialog
        }
      }
    };
  },
  methods: {
    hideDialog() {
      this.$store.dispatch("guiMod/hideModal");
    },
    actionButtonMethod() {
      let data = this.$store.getters["guiMod/getModalDialogData"];
      let method = () => {};
      method = (data.buttons && data.buttons.action && data.buttons.action.method) || method;
      method();
      this.hideDialog();
    },
    cancellButtonMethod() {
      let data = this.$store.getters["guiMod/getModalDialogData"];
      let method = () => {};
      method =
        (data.buttons && data.buttons.cancel && data.buttons.cancel.method) ||
        method;
      method();
      this.hideDialog();
    }
  },
  computed: {
    isDialogVisible(data) {
      return this.$store.getters["guiMod/getModalVisibility"];
    },
    modalDialogData() {
      let self = this;
      let data = this.$store.getters["guiMod/getModalDialogData"];
      return data;
    }
  },
  mounted() {
    let data = this.$store.getters["guiMod/getModalDialogData"];
    this.type = "toolbarColor";
    if (data.type) {
      this.type = data.type;
    }
  }
};
</script>

<style scoped>
#modalDialogWrapper {
  position: absolute;
}
</style>