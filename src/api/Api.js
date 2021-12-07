//import axios
import axios from 'axios'

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://2cf0-125-162-213-215.ngrok.io/api/v1'
})

export default Api