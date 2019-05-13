import * as types from "@/storeModules/mutation-types";

// state, getters, mutations, actions..
const state = {
  modalVisible: false,
  editorModalVisible: false,
  dialogData: {},
  editorDialogData: {},
  progressLoaderVisible : false,
  progressData: {msg:'please add a message'}
};

const initialState = { ...state };

const getters = {
  //DIALOG GETTERS
  getModalVisibility(state) {
    return state.modalVisible;
  },
  getModalDialogData(state) {
    return state.dialogData;
  },
  //PROGRESS LOADER GETTERS
  getProgressData(state){
    return state.progressData;
  },
  progressLoaderVisible(state){
      return state.progressLoaderVisible;
  },
  //ALERT GETTERS
  getAlertData(state){
    return state.alertData;
  },
  getAlertVisibility(state){
    return state.alertVisible;
  }
};

const mutations = {
  [types.MODAL_VISIBILITY_VISIBLE](state) {
    state.modalVisible = true;
  },
  [types.MODAL_VISIBILITY_HIDDEN](state) {
    state.modalVisible = false;
  },
  [types.MODAL_DATA](state, incomingData) {
    state.dialogData = incomingData;
  },
  [types.SHOW_PROGRESS_LOADER](state, msg) {
    state.progressLoaderVisible = true;
  },
  [types.HIDE_PROGRESS_LOADER](state) {
      state.progressLoaderVisible = false;
      state.progressData = {msg:'please add a message'};
  },
  [types.PROGRESS_DATA](state, incomingData){
      state.progressData = incomingData;
  },
};

const actions = {
  //MODAL ACTIONS
  showModal: ({ commit, state, getters, rootState, rootGetters }) => {
    commit(types.MODAL_VISIBILITY_VISIBLE);
  },
  hideModal: ({ commit, state, getters, rootState, rootGetters }) => {
    commit(types.MODAL_VISIBILITY_HIDDEN);
  },
  setModalContent: ({ commit, state, getters, rootState, rootGetters, dispatch }, incomingData) => {
    commit(types.MODAL_DATA, incomingData);
    dispatch("showModal");
  },
  //PROGRESS ACTIONS
  setProgressModalContent: ({commit, state, getters, rootState, rootGetters, dispatch}, incomingData)=>{
    commit(types.PROGRESS_DATA, incomingData);
    dispatch('showProgressModal');
    console.log('SETTING PROGRESS MODAL DATA', incomingData);
    },
    showProgressModal: ({commit, state, getters, rootState, rootGetters}) => {
        commit(types.SHOW_PROGRESS_LOADER);
    },
    hideProgressModal: ({commit, state, getters, rootState, rootGetters}) => {
        commit(types.HIDE_PROGRESS_LOADER);
    },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
