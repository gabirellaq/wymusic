<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <router-view/>    
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

    }
  }
}
</script>

<style lang="scss">

</style>
