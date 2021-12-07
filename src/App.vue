<template>
  <div class="h-screen">
    
    <!-- Header -->
    <Header />

    <!-- content -->
    <router-view></router-view>

    <!-- footer -->
    <Footer />

  </div>
</template>

<script>

  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>

<style>

</style>