<template>
    <div id="home">
        {{mywords}}
    </div>
</template>

<script>
   export default {
       el : '#home',
       data(){
           return{
               mywords : 'hello vue'
           }
       }
   }
</script>

<style scoped>

</style>