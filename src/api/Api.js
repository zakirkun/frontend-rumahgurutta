//import axios
import axios from 'axios'

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://d980-180-252-204-236.ngrok.io/api/v1'
})

export default Api