<template>
  <div id="app">
    <HeaderComponent :searchQuery="searchQueryValue" ></HeaderComponent>
    <router-view />    
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent'
export default {
  name: 'app',
  components: {
    HeaderComponent
  },
  data () {
    return {
      searchQ:''
    }
  },
  methods: {
    searchQueryValue(data) {
      this.searchQ = data
    }
  }
}
</script>

<style lang="scss">

</style>
