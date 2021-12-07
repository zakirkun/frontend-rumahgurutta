<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

            <div class="bg-white rounded-md shadow-md p-3">
                <img class="rounded-md w-full" :src="campaign.image">

                <div class="mt-5">
                    <p class="text-lg font-semibold">
                        {{ campaign.title }}
                    </p>
                </div>

                <div v-if="sumDonation.length > 0">
                    <div v-for="donation in sumDonation" :key="donation">

                        <p class="mt-4 text-base text-gray-500">
                            <span class="font-bold text-blue-400">Rp. {{ formatPrice(donation.total) }} </span>
                            terkumpul dari
                            <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                        </p>

                        <div class="relative pt-1 mt-2">
                            <div class="overflow-hidden h-2 mb-4 text-base flex rounded bg-blue-200">
                                <div :style="{width: percentage(donation.total, campaign.target_donation) + '%'}"
                                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div v-else>

                    <p class="mt-4 text-base text-gray-500">
                        <span class="font-bold text-blue-400">Rp. 0 </span> terkumpul dari
                        <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                    </p>

                    <div class="relative pt-1 mt-2">
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div :style="{width: percentage(0, campaign.target_donation) + '%'}"
                                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                            </div>
                        </div>
                    </div>

                </div>

                <div class="mt-3">
                    <span class="font-bold">{{ donations.length }}</span> Donasi
                    <span class="float-right"> <strong>{{ countDay(campaign.max_date) }}</strong> hari lagi</span>
                </div>

                <div v-if="maxDate(campaign.max_date) == true">
                    <div class="mt-5">
                        <button
                            class="bg-yellow-500 py-3 rounded-md shadow-md text-xl w-full uppercase font-bold focus:outline-none opacity-50 cursor-not-allowed">Donasi Ditutup!</button>
                    </div>
                </div>
                <div v-else>
                    <div class="mt-5">
                        <router-link v-if="campaign.slug" :to="{name: 'donation.create', params:{slug: campaign.slug}}">
                            <button class="bg-yellow-500 py-3 rounded-md shadow-md text-xl w-full uppercase font-bold focus:outline-none focus:bg-yellow-600">
                            Donasi Sekarang!  
                            </button>
                        </router-link>
                    </div>
                </div>

            </div>

        </div>

        <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

            <div class="bg-white rounded-md shadow-md p-3">
                <div class="text-lg font-semibold">
                    Penggalang Dana
                </div>
                <div class="border-2 border-gray-200 mt-3 mb-2"></div>

                <div class="bg-gray-200 p-3 rounded shadow-md mb-3">

                    <div class="grid grid-cols-10 gap-4">
                        <div class="col-span-2">
                            <img :src="user.avatar" class="w-15 h-15 rounded-full shadow">
                        </div>
                        <div class="col-span-8 text-lg font-bold mt-6">
                            {{ user.name }} 
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

            <div class="bg-white rounded-md shadow-md p-3">
                <div class="text-lg font-semibold">
                    Cerita
                </div>
                <div class="border-2 border-gray-200 mt-3 mb-2"></div>
                <div v-html="campaign.description"></div>
            </div>

        </div>

        <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

            <div class="bg-white rounded-md shadow-md p-3">
                <div class="text-lg font-semibold">
                    Donasi ({{ donations.length }})
                </div>
                <div class="border-2 border-gray-200 mt-3 mb-2"></div>

                <div v-for="donation in donations" :key="donation.id" class="bg-gray-200 p-3 rounded shadow-md mb-3">

                    <div class="grid grid-cols-10 gap-4">

                        <div class="col-span-1">
                            <img :src="donation.donatur.avatar" class="w-15 h-15 rounded-full">
                        </div>
                        <div class="col-span-9 mt-1">
                            <div class="text-base font-bold">
                                {{ donation.donatur.name }}
                            </div>
                            <div class="text-sm mt-2 text-gray-500">
                                Berdonasi sebesar <span class="font-bold">Rp. {{ formatPrice(donation.amount) }}</span>
                            </div>
                        </div>

                    </div>

                    <div class="grid grid-cols-1 gap-4 mt-3">
                        <div class="text-gray-600 text-sm">
                            {{ donation.pray }}
                        </div>
                        <div class="text-gray-500 text-sm italic text-right">
                            {{ donation.created_at }}
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

    //hook vue
    import { computed, onMounted } from 'vue' // computed dan onMounted
    
    //hook vuex
    import { useStore } from 'vuex' 

    //hook vue router
    import { useRoute } from 'vue-router'
    
    export default {
        setup() {

            //vue route
            const route = useRoute()

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getDetailCampaign" di module "campaign"
            onMounted(() => {
                store.dispatch('campaign/getDetailCampaign', route.params.slug)

                console.log(campaign.value.slug)
            })

            //digunakan untuk mendapatkan data detail campaign dari state "campaign" di module "campaign" Vuex
            const campaign = computed(() => {
                return store.state.campaign.campaign
            })

            //digunakan untuk mendapatkan data detail user dari state "user" di module "campaign" Vuex
            const user = computed(() => {
                return store.state.campaign.user
            })

            //digunakan untuk mendapatkan data jumlah donasi state "sumDonation" di module "campaign" Vuex
            const sumDonation = computed(() => {
                return store.state.campaign.sumDonation
            })

            //digunakan untuk mendapatkan data donation dari state "donations" di module "campaign" Vuex
            const donations = computed(() => {
                return store.state.campaign.donations
            })

            return {
                campaign,       // <-- campaign 
                user,           // <-- user
                sumDonation,    // <-- sumDonation
                donations,      // <-- donations
            }
        }

    }
</script>

<style>

</style>