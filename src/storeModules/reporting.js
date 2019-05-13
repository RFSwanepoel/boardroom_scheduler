import * as types from "@/storeModules/mutation-types";
import config from '@/config'

// state, getters, mutations, actions..
const dummyData = {
    reportDefinitions: [
        {
            title: `Most Popular Room`,
            description: `This displays the room that is booked the most`,
            displayType: `dougnut`,
            size: 1,
            matchKey: `mostPopularRoom`,
            position: 2
        },
        {
            title: `Most Bookings per person`,
            description: `This displays the room that is booked the most`,
            displayType: `line_chart`,
            size: 3,
            matchKey: `mostBookingsPerPerson`,
            position: 1
        },
        {
            title: `Most Popular time of day`,
            description: `This displays the room that is booked the most`,
            displayType: `bar_graph`,
            size: 4,
            matchKey: `mostPopularTimeOfDay`,
            position: 3
        }
    ],
    reportData: {
        mostPopularRoom: {
            labels: ["The green room", "The red room", "The blue room"], 
            datasets: [
                { 
                    backgroundColor: ["green", "red", "blue"], 
                    data: [4, 3, 1] 
                }
            ]
        },
        mostBookingsPerPerson: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Timmy',
                    backgroundColor: 'rgba(255,179,186,0.5)',
                    data: [40, 39, 22, 40, 39, 50, 40]
                },
                {
                    label: 'Jimmy',
                    backgroundColor: 'rgba(255,255,186,0.5)',
                    data: [42, 49, 29, 30, 50, 25, 16]
                },
                {
                    label: 'Grace',
                    backgroundColor: 'rgba(186,225,255,0.5)',
                    data: [25, 20, 18, 12, 6, 15, 30]
                }
            ]
        },
        mostPopularTimeOfDay: {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:07', '08:00', '09:00', '10:00', 
            '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            datasets: [
                {
                    label: 'Red Room',
                    backgroundColor: 'red',
                    data: [10, 11, 11, 11, 13, 15, 13, 10, 13, 20, 12, 11, 10, 11, 11, 11, 13, 15, 13, 10, 15, 20, 12, 15]
                },
                {
                    label: 'Green Room',
                    backgroundColor: 'green',
                    data: [10, 8, 20, 12, 15, 15, 13, 10, 11, 11, 13, 15, 13, 10, 11, 11, 11, 13, 15, 13, 10, 10, 20, 12]
                },
                {
                    label: 'Blue Room',
                    backgroundColor: 'blue',
                    data: [18, 10, 11, 19, 13, 15, 13, 10, 11, 20, 12, 11, 13, 10, 14, 20, 12, 13, 15, 13, 10, 16, 20, 12]
                },
            ]
        }
    }
}

const state = {
    reportData: {},
    reportDefinitions: []
};

const initialState = { ...state };

const getters = {
    getAllReportData: state => {
        return { ...state.reportData }
    },
    getReportDefinitions: state => {
        return state.reportDefinitions;
    }
};

const mutations = {
    [types.SET_REPORT_DEFINITIONS](state, incomingData) {
        state.reportDefinitions = incomingData.sort((a,b)=>{
            return a.position - b.position;
        });
    },
    [types.SET_REPORT_DATA](state, incomingData) {
        state.reportData = incomingData;
    }
};

const actions = {
    async getReportData({ commit, state, getters, rootState, rootGetters, dispatch }, cfg) {
        //THIS IS WHERE A FETCH GET WOULD HAPPEN TO GET DATA FROM A REST API.
        //IT WOULD commit(types.SOME_MUTATION) AND UPDATE THE SATE WITH THE DATA.
        //BUT WE'RE GONNA PRETEND THAT HAPPENED 
        let self = this;
        dispatch("guiMod/setProgressModalContent", { msg: `Fetching Report data...` }, { root: true });
        //The code below is just here to pretend like there is a backend and use the state instead. 

        return await setTimeout(() => {
            //this would usual happen in a promise
            commit(types.SET_REPORT_DATA, { ...dummyData.reportData });
            dispatch('guiMod/hideProgressModal', null, { root: true });
            return true;
        }, config.dummyModeTimout);
    },
    async getReportDefinitions({ commit, state, getters, rootState, rootGetters, dispatch }, cfg) {
        //THIS IS WHERE A FETCH GET WOULD HAPPEN TO GET DATA FROM A REST API.
        //IT WOULD commit(types.SOME_MUTATION) AND UPDATE THE SATE WITH THE DATA.
        //BUT WE'RE GONNA PRETEND THAT HAPPENED 
        let self = this;
        dispatch("guiMod/setProgressModalContent", { msg: `Fetching Report definitions...` }, { root: true });
        //The code below is just here to pretend like there is a backend and use the state instead. 

        return await setTimeout(() => {
            //this would usual happen in a promise
            commit(types.SET_REPORT_DEFINITIONS, [...dummyData.reportDefinitions]);
            dispatch('guiMod/hideProgressModal', null, { root: true });
            return true;
        }, config.dummyModeTimout);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
