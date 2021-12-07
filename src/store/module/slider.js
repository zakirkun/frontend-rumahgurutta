import Api from "../../api/Api"

const slider = {

    //set namespace true
    namespaced: true,

    //state
    state: {
        //index sliders
        sliders: [],
    },

    //mutations
    mutations: {
        //set state sliders dengan data dari response 
        SET_SLIDERS(state, data) {
            state.sliders = data
        },
    },

    //actions
    actions: {
        //action getSlider
        getSlider({ commit }) {

            //get data sliders ke server
            Api.get('/slider')
            .then(result => {

                //commit ke mutation SET_SLIDERS dengan response data
                commit('SET_SLIDERS', result.data.data)

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        }
    },

    //getters
    getters: {

    }

}

export default slider