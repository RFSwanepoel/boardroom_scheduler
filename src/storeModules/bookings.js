import * as types from "@/storeModules/mutation-types";
import config from '@/config'

// state, getters, mutations, actions..
const dummyData = {
  bookings: [
    {
      start: '2019-05-06 00:00',
      end: '2019-05-06 04:00',
      title: 'Blue Room Booking',
      icon: 'chair', 
      content: `Billy's show and tell.`,
      class: 'blue_room',
      id: '181_4',
      roomId: 3,
      user: 'Billy'
    },
    {
      start: '2019-05-06 00:45',
      end: '2019-05-06 04:45',
      title: 'Green Room Booking',
      icon: 'chair', 
      content: 'Exco Share.',
      class: 'green_room',
      id: '181_5',
      roomId: 1,
      user: 'Grace'
    },
    {
      start: '2019-05-07 10:00',
      end: '2019-05-07 15:00',
      title: 'Red Room Booking',
      icon: 'chair',
      content: 'Marketing think tank?',
      class: 'red_room',
      id: '181_6',
      roomId: 2,
      user: 'Timmy'
    },
    {
      start: '2019-05-08 00:00',
      end: '2019-05-08 04:00',
      title: 'Green Room Booking',
      icon: 'chair', 
      content: `Billy's show and tell.`,
      class: 'green_room',
      id: '546456',
      roomId: 1,
      user: 'Billy'
    },
    {
      start: '2019-05-09 00:45',
      end: '2019-05-09 04:45',
      title: 'Green Room Booking',
      icon: 'chair', 
      content: 'Exco Share.',
      class: 'red_room',
      id: '84198',
      roomId: 2,
      user: 'Grace'
    },
    {
      start: '2019-05-12 10:00',
      end: '2019-05-12 15:00',
      title: 'Red Room Booking',
      icon: 'chair',
      content: 'Marketing think tank?',
      class: 'red_room',
      id: '96354',
      roomId: 2,
      user: 'Timmy'
    }
  ]
}
const state = {
  //STATE WOULD NORMALLY HAVE A COUPLE OF DEFAULT VALUES BUT WE'RE GONNA GIVE IT DATA FROM DUMMY 
  bookings: []
};

const initialState = { ...state };

const getters = {
  getAllBookings:state=>{
    return state.bookings;
  }
};

const mutations = {
  [types.ADD_BOOKING](state, booking){
    state.bookings.push(booking)
  },
  [types.REMOVE_BOOKING](state, id){
    state.bookings = [...state.bookings.filter(o=> o.id !== id)];
  },
  [types.UPDATE_BOOKING](state, booking){
    let index = state.bookings.findIndex(o=> o.id === booking.id);
    state.bookings.splice(index, 1, booking);
  },
  [types.SET_BOOKINGS](state, bookings){
    state.bookings = bookings
  }
};

const actions = {
  updateBooking({ commit, state, getters, rootState, rootGetters, dispatch }, booking){
    commit(types.UPDATE_BOOKING, booking);
  },
  addBooking({ commit, state, getters, rootState, rootGetters, dispatch }, booking){
    commit(types.ADD_BOOKING, booking);
  },
  removeBooking({ commit, state, getters, rootState, rootGetters, dispatch }, id){
    commit(types.REMOVE_BOOKING, id);
  },
  getBookings({ commit, state, getters, rootState, rootGetters, dispatch }, cfg){
    //THIS IS WHERE A FETCH GET WOULD HAPPEN TO GET DATA FROM A REST API.
    //IT WOULD commit(types.SOME_MUTATION) AND UPDATE THE SATE WITH THE DATA.
    //BUT WE'RE GONNA PRETEND THAT HAPPENED 
    let self = this;
    dispatch("guiMod/setProgressModalContent", {msg: `Fetching Bookings...`}, { root: true });
    //The code below is just here to pretend like there is a backend and use the state instead. 
    
    setTimeout(()=>{
      let setBookings = [];
      if(state.bookings.length === 0){
        setBookings = [...dummyData.bookings];
      }
      else{
        setBookings = [...state.bookings];
      }
      //this would usual happen in a promise
      commit(types.SET_BOOKINGS, setBookings);
      dispatch('guiMod/hideProgressModal',null, { root: true });
    }, config.dummyModeTimout);
  },
  //BELOW IS AN EXAMPLE FOR A REST API
  async exampleFetch({ commit, state, dispatch, rootGetters }, options) {
    dispatch("guiMod/setProgressModalContent", {msg: `Fetching Bookings...`}, { root: true });
    let config = config.apiConfig["someGetRequestConfig"];

    //Here we see if an app is running in dummy/development mode.
    if (config.dummyMode) {
      setTimeout(()=>{
        commit(types.SET_BOOKINGS, [...dummyData.bookings]);
        dispatch('guiMod/hideProgressModal',null, { root: true });
      }, config.dummyModeTimout);
      return false;
    }

    let url;
    //A GET REQUEST CONFIG WOULD LOOK LIKE:
    let someParam = 'someParam';
    url = config.url.replace("{SOME_PARAM}", someParam);

    //A (POST/PUT/DELETE) REQUEST CONFIG WOULD LOOK LIKE:
    url = config.url;
    let someData = 'someData';
    let body = { someData };

    //GENERAL
    let headers = {};
    let props = {
      method: config.method,
      mode: config.mode,
      headers: new Headers({ ...config.apiConfig.defaultHeaders, ...headers }),
      body: config.method == "GET" ? null : JSON.stringify(body)
    };

    return await fetch(url, props)
      .then(promise => {
        return promise.json();
      })
      .then(json => {
        //HANDLE JSON RESPONSE
        //TRIGGER MUTATION OF STORE IS USED
        return false; //OR THE DATA 
      })
      .catch(err => {
        //HANDLE ERROR
        //TRIGGER MUTATION OF STORE IS USED
        return false // OR THE ERROR
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
