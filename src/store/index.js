import {createStore} from 'vuex'

import auth from './module/auth'
import donation from './module/donation'
import profile from './module/profile'
import slider from './module/slider'
import category from './module/category'
import campaign from './module/campaign'

export default createStore({
    modules:{
        auth,
        donation,
        profile,
        slider,
        category,
        campaign
    }
})