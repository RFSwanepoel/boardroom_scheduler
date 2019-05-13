import Vue from 'vue'
import vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import guiMod from "./storeModules/ui";
import bookingsMod from "./storeModules/bookings";
import reportingMod from "./storeModules/reporting";

Vue.use(vuex);

const persistedStateConfig = {
  key: "FF-BOARD-BOOKINGS",
  storage: window.localStorage
};

const debug = window.ENV !== "production";

export default () => {
  return new vuex.Store({
    namespaced: true,
    strict: debug,
    modules: {
      guiMod,
      bookingsMod,
      reportingMod
    },
    plugins: [createPersistedState(persistedStateConfig)]
  });
};
