import Api from "../../api/Api"

const auth = {
    namespaced: true,

    //state
    state: {    

        // state token
        token: localStorage.getItem('token') || '',
        
        // state user
        user: JSON.parse(localStorage.getItem('user')) || {}
    },

    //mutattions
    mutations:{
        AUTH_SUCCESS(state, token, user){
            state.token = token,
            state.user = user
        },
        GET_USER(state, user){
            state.user = user
        },
        AUTH_LOGOUT(state){
            state.token = ''
            state.user = ''
        }
    },

    //actions 
    actions:{
        register({commit}, user){
            return new Promise((resolve, reject) => {

                // Send To Api
                Api.post('auth/register', {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation
                }).then(result => {
                    const token = result.data.token
                    const user = result.data.data

                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))

                    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    commit('AUTH_SUCCESS', token, user)

                    // resolve
                    resolve(result)
                }).catch(error => {
                    //jika gagal, remove localStorage dengan key token
                    localStorage.removeItem('token')

                    //reject ke component dengan hasil response
                    reject(error.response.data)

                })
            })
        },
        getUser({commit}){
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            Api.get('/user').then(result => {
                commit('GET_USER', result.data)
            })
        },
        logout({commit}){
            return new Promise((resolve) => {
                commit('AUTH_LOGOUT')
                //remove value dari localStorage
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                
                //di atas kita set data-nya menjadi 0

                //delete header axios
                delete Api.defaults.headers.common['Authorization']
                
                //return resolve ke component 
                resolve()
            })

        },
        login({commit}, user){
            return new Promise((resolve, reject) => {
                Api.post('auth/login', {
                    email: user.email,
                    password: user.password
                }).then(result => {
                    const token = result.data.token
                    const user = result.data.data

                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))

                    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    commit('AUTH_SUCCESS', token, user)
                    
                    //commit get user ke mutation
                    commit('GET_USER', user)

                    // resolve
                    resolve(result)
                }).catch(error => {
                    //jika gagal, remove localStorage dengan key token
                    localStorage.removeItem('token')

                    //reject ke component dengan hasil response
                    reject(error.response.data)
                })
            })
        }
    },

    //getters
    getters:{
        currentUser(state){
            return state.user
        },

        isLoggedIn(state){
            return state.token
        }
    }
}

export default auth