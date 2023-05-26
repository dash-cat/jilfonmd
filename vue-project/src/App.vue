<template>
  <div id="app" class="main-container">
    <table-employees/>
  </div>
</template>

<script type="module">  
import TableEmployees from './components/TableEmployees.vue'

export default {
  components: {
    TableEmployees
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
