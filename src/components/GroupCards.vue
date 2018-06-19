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
    {{uniques()}}
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
  props: [ 'data', 'type' ],
  data: () => ({ 
     
  }),
  computed: {  
    test: (a) => {
      // console.log(a)
      return "lol"
    }
  },
  methods: {
    info: a => {
      // console.log(a)
      return "ha"
    },
    uniques: function() {
      if (this.type == 'store') {
        const cardList = this.data.reduce((a,b) => {
          
          return a.concat(b.prices)
        },[]).map(x => x.card);
      
        console.log(...new Set(cardList));
        return [...new Set(cardList)]
      }
      return []
    }
  }
};
</script>

<style scoped>

</style>
