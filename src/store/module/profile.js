import Api from "../../api/Api"

const profile = {

    //set namespace true
    namespaced: true,

    //state
    state: {
        profile: {},
    },

    //mutations
    mutations: {
        SET_PROFILE(state, data) {
            state.profile = data
        },
    },

    //actions
    actions: {
        getProfile({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            //get data profile ke server
            Api.get('/profile')
            .then(result => {

                //commit ke mutation SET_PROFILE dengan response data
                commit('SET_PROFILE', result.data.data)

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        },

        //action updateProfile
        updateProfile({commit}, formData) {

            return new Promise((resolve, reject) => {

                //get data token dan user
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                //get data profile ke server
                Api.post('/profile', formData)
                .then(result => {

                    //commit ke mutation SET_PROFILE dengan response data
                    commit('SET_PROFILE', result.data.data)

                    resolve(result)

                }).catch(error => {

                    //reject ke component dengan hasil response
                    reject(error.response.data)

                })
            })

        },

        //action updatePassword
        updatePassword({commit}, user) {

            return new Promise((resolve, reject) => {

                //get data token dan user
                const token = localStorage.getItem('token')

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                //get data profile ke server
                Api.post('/profile/password', {
                    password: user.password,
                    password_confirmation: user.password_confirmation
                })
                .then(result => {

                    //commit ke mutation SET_PROFILE dengan response data
                    commit('SET_PROFILE', result.data.data)

                    resolve(result)

                }).catch(error => {

                    //reject ke component dengan hasil response
                    reject(error.response.data)

                })
            })

        }
    },

    //getters
    getters: {

    }

}

export default profile