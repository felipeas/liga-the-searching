<template>
  <v-expansion-panel> 
    <v-expansion-panel-content
      v-for="(c, index) in data"
      :key="`c-${index}`"
      ripple
    >
      <div slot="header">
        {{`${c.group} - ${info(c)}`}}
      </div>
      <v-card
        <table-cards :list="c.prices"></table-cards>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
            
</template>

<script>
// TODO: Generify this f*ckers
import TableCards from '@/components/TableCards.vue';

export default {
  name: 'group-cards',
  components: {  
    TableCards
  },
  props: [ 'data' ],
  data: () => ({
  }),
  computed: {
    test: (a) =>  {
      console.log(a)
      return "lol"
    }
  },
  methods: {
    info: a => {
      console.log(a)
      return "ha"
    }
  }
};
</script>

<style scoped>

</style>
