import { createApp } from 'vue'
import App from './App.vue'

// import Toaster
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

// import tailwind css
import './index.css'

// import mixins
import mixins from './mixins'

// import router
import router from './router'

//import store
import store from './store'

const app = createApp(App)

app.use(Toast)

app.mixin(mixins)

app.use(router)

app.use(store)

app.mount("#app")
