<template>
  <v-expansion-panel> 
    <v-expansion-panel-content
      v-for="(c, index) in orderedData"
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
  props: [ 'data', 'type' ],
  data: () => ({ 
     
  }),

  methods: {
    info: function(a) {
      const s = [...new Set(a.prices.map(x => x.card))] 
      
      const u = this.uniques
      // console.log(s, ' - ', u)

      return `${s.length}/${u.length}`
      // console.log(this)
      // console.log(a
    }
  },
  computed: {
    orderedData: function() {
      const sorted = this.data.sort((a, b) => {
        const aa = [...new Set(a.prices.map(x => x.card))].length
        const bb = [...new Set(b.prices.map(x => x.card))].length
        console.log(aa,bb)
        return aa - bb
      })

      return sorted.reverse();
    }
  },
  created: function() {
    if (this.type == 'store') {
        const cardList = this.data.reduce((a,b) => {
          
          return a.concat(b.prices)
        },[]).map(x => x.card);
      
        console.log(...new Set(cardList));
        this.uniques = [...new Set(cardList)]
      }
  }
};
</script>

<style scoped>

</style>
