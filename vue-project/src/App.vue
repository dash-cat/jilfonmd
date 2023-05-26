<template>
  <div id="app" class="main-container">
    <hello-world/>
  </div>
</template>


<script type="module">  
import HelloWorld from './components/HelloWorld.vue'

export default {
  components: {
    'hello-world': HelloWorld
  }
}


</script>

<style lang="scss" scoped>

$background: #F5F5F5;
.main-container {
  background: $background;
  padding: 50px;
}
</style>
