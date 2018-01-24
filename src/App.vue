<template>
  <div id="app">
    <HeaderComponent :searchQuery="searchQueryValue" ></HeaderComponent>
    <router-view :key="key" />    
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
  },
  computed:{
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  }
}
</script>

<style lang="scss">

</style>
