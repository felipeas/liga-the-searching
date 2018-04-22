
<template>
  
<v-footer app fixed>
      <span>this is footer</span>
</v-footer>


    
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    drawer: true
  }),
  props: {
    source: String
  }
};
</script>

<style scoped>

</style>
