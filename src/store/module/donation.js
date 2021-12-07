import Api from "../../api/Api"

const donation = {

    //set namespace true
    namespaced: true,

    //state
    state: {
        donations: [],

        // loadmore
        nextIfExists: false,
        nextPage: 0,

        // loading
        loading: true
    },

    //mutations
    mutations: {
        SET_LOADING(state, value){
            state.loading = value
        },

        SET_DONATIONS(state, donations){
            state.donations = donations
        },

        SET_NEXTIFEXISTS(state, nextIfExists){
            state.nextIfExists = nextIfExists
        },

        SET_NEXTPAGE(state, nextPage){
            state.nextPage = nextPage
        },

        //set state "donations" dengan data dari response loadmore
        SET_LOADMORE(state, data){
            data.forEach(row => {
                state.donations.push(row)
            })
        }
    },

    //actions
    actions: {
        getDonation({commit}){
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('SET_LOADING', true)

            //get data donations ke server
            Api.get('/donation').then(result => {
                commit('SET_DONATIONS', result.data.data.data)
                commit('SET_LOADING', false)

                if (result.data.data.current_page < result.data.data.last_page) {
                    
                    //commit ke mutation SET_NEXTIFEXISTS dengan true
                    commit('SET_NEXTIFEXISTS', true)
                    
                    //commit ke mutation SET_NEXTPAGE dengan current page + 1
                    commit('SET_NEXTPAGE', result.data.data.current_page + 1)

                } else {

                    //commit ke mutation SET_NEXTIFEXISTS dengan false
                    commit('SET_NEXTIFEXISTS', false)
                }

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        },

        //action getLoadMore
        getLoadMore({ commit }, nextPage) {
            const token = localStorage.getItem('token')
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('SET_LOADING', true)
            // loadmore
            Api.get(`/donation?page=${nextPage}`)
            .then(result => {
                
                //commit ke mutation SET_LOADMORE dengan response data
                commit('SET_LOADMORE', result.data.data.data)
                commit('SET_LOADING', false)

                //console.log(response.data.data.data)

                if (result.data.data.current_page < result.data.data.last_page) {
                    
                    //commit ke mutation SET_NEXTIFEXISTS dengan true
                    commit('SET_NEXTIFEXISTS', true)
                    
                    //commit ke mutation SET_NEXTPAGE dengan current page + 1
                    commit('SET_NEXTPAGE', result.data.data.current_page + 1)

                } else {

                    //commit ke mutation SET_NEXTIFEXISTS dengan false
                    commit('SET_NEXTIFEXISTS', false)
                }

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        },

        //storeDonation
        storeDonation({commit}, data) {

            //define callback promise
            return new Promise((resolve, reject) => {

                //get data token dan user
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                //send data donatiion ke server
                Api.post('/donation', data)
                .then(result => {

                    commit('')
                    resolve(result)

                }).catch(error => {

                    //show error log dari response
                    reject(error.response.data)

                })

            })

        }
    },

    //getters
    getters: {
        isLoading(state){
            return state.loading
        }
    }

}

export default donation