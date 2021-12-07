<template>
    <div>
        <div v-if="categories.length > 0">
            <div class="mt-5 grid grid-cols-4  gap-4 md:gap-4 text-center items-center">
                <div v-for="category in categories" :key="category.id" class="col-span-2 md:col-span-2 lg:col-span-1 bg-white rounded-md shadow-md p-4 text-center text-xs">
                    <router-link :to="{name: 'category.show', params:{slug: category.slug}}">
                        <div>
                            <img :src="category.image" width="40" class="inline-block mb-2">
                        </div>
                        {{ category.name.toUpperCase() }}
                    </router-link>
                </div>
                <div class="col-span-2 md:col-span-1 lg:col-span-1 bg-white rounded-md shadow-md p-4 text-center text-xs">
                    <router-link :to="{name: 'category.index'}">
                        <div>
                            <img src="@/assets/images/menu.png" width="40" class="inline-block mb-2">
                        </div>
                        LAINNYA
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="mt-5 grid grid-cols-4  gap-4 md:gap-4 text-center items-center">
                <div v-for="index in 4" :key="index" class="sm:col-span-2 md:col-span-2 lg:col-span-2 bg-white rounded-md shadow-md text-center text-xs">
                    <ContentLoader />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //hook vue
    import { computed, onMounted  } from 'vue'
    
    //vuex
    import { useStore } from 'vuex'
    
    //vue content loader
    import { ContentLoader } from 'vue-content-loader'

    export default {

        components: {
            ContentLoader   // <-- register content loader
        },

        setup() {

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getCategoryHome" di module "category"
            onMounted(() => {
                store.dispatch('category/getCategoryHome')
            })

            //digunakan untuk get data state "categories" di module "category" 
            const categories = computed(() => {
                return store.state.category.categories
            })

            return {
                categories  // <-- categories
            }

        }

    }
</script>

<style>

</style>