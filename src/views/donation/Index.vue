<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

            <div class="bg-white rounded-md shadow-md p-5">

                <div class="text-xl">
                    RIWAYAT DONASI SAYA
                </div>
                <div class="border-2 border-gray-200 mt-3 mb-2"></div>

                <div v-if="loading">
                    <div v-for="index in 2" :key="index" class="grid grid-cols-1 bg-white rounded shadow-md p-3 text-sm mt-4 mb-4">
                        <FacebookLoader class="h-24"/>
                    </div>
                </div>
                <div v-else>
                    <div v-if="donations.length > 0">
                        <div class="mt-5 grid grid-cols-4 gap-4">

                            <div class="col-span-4" v-for="donation in donations" :key="donation.id">
                                <div class="bg-gray-200 rounded-md shadow-sm p-2">
                                    <figure class="md:flex rounded-xl md:p-0">
                                        <img class="w-full h-34 md:w-48 rounded mx-auto object-cover"
                                            :src="donation.campaign.image"
                                            alt="" width="384" height="512">
                                        <div class="w-full pt-6 p-5 md:p-3 text-center md:text-left space-y-4">
                                            
                                            <router-link :to="{name: 'campaign.show', params:{slug: donation.campaign.slug}}">
                                                <p class="text-sm font-semibold">
                                                    {{ donation.campaign.title }}
                                                </p>
                                            </router-link>
                                            <figcaption class="font-medium">
                                                <p class="text-xs text-gray-500 mt-5">
                                                    <span class="font-bold text-gray-500 mr-3">{{ donation.created_at }}</span>
                                                    <span class="font-bold text-blue-900">Rp. {{ formatPrice(donation.amount) }}</span>
                                                </p>
                                                <p class="text-xs text-gray-500 mt-7">ID : #{{ donation.invoice }}</p>
                                            </figcaption>
                                            <div v-if="donation.status == 'pending'">
                                                <button @click="payment(donation.snap_token)" class="w-full bg-yellow-600 rounded shadow-sm text-xs py-1 px-2 focus:outline-none">BAYAR SEKARANG</button>
                                            </div>
                                        </div>
                                        <div class="ml-auto text-sm text-gray-500 underline">
                                            <div v-if="donation.status == 'success'">
                                                <button class="bg-green-500 border-2 border-green-500 rounded shadow-sm text-xs py-1 px-2 text-black focus:outline-none">Berhasil</button>
                                            </div>
                                            <div v-else-if="donation.status == 'pending'">
                                                <button class="bg-yellow-500 border-2 border-yellow-500 rounded shadow-sm text-xs py-1 px-2 text-black focus:outline-none">Pending</button>
                                            </div>
                                            <div v-else-if="donation.status == 'expired'">
                                                <button class="bg-red-500 border-2 border-red-500 rounded shadow-sm text-xs py-1 px-2 text-black focus:outline-none">Dibatalkan</button>
                                            </div>
                                            <div v-else-if="donation.status == 'failed'">
                                                <button class="bg-red-500 border-2 border-red-500 rounded shadow-sm text-xs py-1 px-2 text-black focus:outline-none">Dibatalkan</button>
                                            </div>
                                        </div>
                                    </figure>
                                </div>
                            </div>

                        </div>

                        <div class="text-center mt-7" v-show="nextExists">
                            <a @click="loadMore"
                                class="bg-gray-700 text-white p-1 px-3 rounded-md shadow-md focus:outline-none focus:bg-gray-900 cursor-pointer">LIHAT
                                SEMUA <i class="fa fa-long-arrow-alt-right"></i></a>
                        </div>

                    </div>
                    <div v-else-if="donations.length == 0">
                        <div class="mb-3 bg-red-500 text-white p-4 rounded-md">
                            Anda Belum Memiliki Transaksi Donasi Saat ini!
                        </div>
                    </div>
                    <div v-else>
                        <div v-for="index in 2" :key="index" class="grid grid-cols-1 bg-white rounded shadow-md p-3 text-sm mt-4 mb-4">
                            <FacebookLoader class="h-24"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    //hook vue
    import { computed, onMounted } from 'vue'

    //hook vuex
    import { useStore } from 'vuex'

    //hook vue router
    import { useRouter } from 'vue-router'

    //hook Toast
    import { useToast } from "vue-toastification"

    import { FacebookLoader } from 'vue-content-loader'

    export default {
        
        components:{
            FacebookLoader
        },

        setup() {

            //store vuex
            const store = useStore()

            //router
            const router = useRouter()

            //toast
            const toast = useToast()

            // loading
            let loading = false

            //onMounted akan menjalankan action "getDonation" di module "donation"
            onMounted(() => {
                loading = store.getters['donation/isLoading']
                store.dispatch('donation/getDonation')
            })

            //digunakan untuk get data state "donations" di module "donation" 
            const donations = computed(() => {
                return store.state.donation.donations
            })

            //digunakan untuk get data state "nextExists" di module "donation" 
            const nextExists = computed(() => {
                return store.state.donation.nextIfExists
            })

            //digunakan untuk get data state "nextPage" di module "donation" 
            const nextPage = computed(() => {
                return store.state.donation.nextPage
            })

            //loadMore function
            function loadMore() {
                store.dispatch('donation/getLoadMore', nextPage.value)
            }

            //function payment "Midtrans"
            function payment(snap_token) {

                window.snap.pay(snap_token, {

                    onSuccess: function (result) {
                        console.log(result);
                        toast.success('Pembyaran Sukes!')
                        router.push({name: 'thanks'})  
                    },
                    onPending: function (result) {
                        console.log(result);
                        toast.info('Menunggu Pembyaran')
                        router.push({name: 'donation.index'})
                    },
                    onError: function (result) {
                        console.log(result);
                        
                        if(result.status_code == 409){
                            toast.success('Pembayaran telah sukses!')
                            router.push({name: 'thanks'})  
                        } else {
                            toast.error('Sepertinya ada kesalahan.')
                            router.push({name: 'donation.index'})  
                        }
                    }
                })

            }

            return {
                loading,
                donations,      // <-- return donations
                nextExists,     // <-- return nextExists
                nextPage,       // <-- return nextPage
                loadMore,       // <-- return loadMore
                payment,        // <-- return payment Midtrans Snap
            }

        }

    }
</script>

<style>

</style>