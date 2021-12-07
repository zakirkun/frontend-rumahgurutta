<template>
    <div>
        <div v-if="sliders.length > 0">
            <vueper-slides slide-image-inside autoplay>
                 <template v-slot:arrow-left>
                    <i class="icon icon-arrow-left" />
                </template>
                    <vueper-slide v-for="(slider, i) in sliders" :key="i" :image="slider.image" />
                <template v-slot:arrow-right>
                    <i class="icon icon-arrow-right" />
                </template>
            </vueper-slides>
        </div>
        <div v-else>
            <ContentLoader />
        </div>
    </div>
</template>

<script>
    //hook vue
    import { computed, onMounted  } from 'vue'

    //vuex
    import { useStore } from 'vuex'

    //content loader
    import { ContentLoader } from 'vue-content-loader'
    
    //vueper slider
    import { VueperSlides, VueperSlide } from 'vueperslides'
    import 'vueperslides/dist/vueperslides.css'

    export default {

        components: {
            ContentLoader,
            VueperSlides, 
            VueperSlide
        },

        setup() {

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getSlider" di module "slider"
            onMounted(() => {
                store.dispatch('slider/getSlider')
            })

            //digunakan untuk get data state "sliders" di module "slider" 
            const sliders = computed(() => {
                return store.state.slider.sliders
            })

            return {
                sliders,   // <-- sliders
            }

        }

    }
</script>

<style scoped>
    .vueperslide__image {
        transform: scale(1.5) rotate(-10deg);
    }

    .vueperslide__title {
        font-size: 7em;
        opacity: 0.7;
    }
</style>