<template>
    <div>
        <!-- header -->
        <header>
            <div class="bg-gray-700 text-white text-center fixed inset-x-0 top-0 z-10">
                <div class="container mx-auto grid grid-cols-10 p-3 sm:w-full md:w-5/12">
                <div class="col-span-2 mb-2 h-12 w-13 p-1 mr-3 shadow-sm bg-gradient-to-l md:bg-gradient-to-r">
                    <router-link :to="{name: 'home'}">
                        <img src="@/assets/logo.png" class="inline-block max-h-11">
                    </router-link>
                </div>
                <div class="col-span-8">
                    <input type="text" @click="linkToSearch" v-model="search" @keyup="searchQuery" class="appearance-none w-full bg-gray-500 rounded-full h-7 shadow-md placeholder-white focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-5"
                    placeholder="Cari yang ingin kamu bantu">
                </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
  
//hook vue
  import { ref } from 'vue'
  
  //hook vue router
  import { useRouter } from 'vue-router'
  
  //hook vuex
  import { useStore } from 'vuex'
  
  export default {

    setup() {

      //router
      const router = useRouter()

      //store
      const store = useStore()

      //state seacrh
      const search = ref(null)

      //queryString
      function searchQuery() {
        store.dispatch('campaign/searchCampaign', search.value)
      }

      //redirect to route search
      function linkToSearch() {
        router.push({
          name: 'search'
        })
      }

      return {
        search,         // <-- state search
        linkToSearch,   // <-- method linkToSearch
        searchQuery     // <-- method searchQuery
      }
    }

  }
</script>

<style>

</style>

<style>

</style>