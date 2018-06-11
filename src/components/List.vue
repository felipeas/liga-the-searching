<template>
  <v-container fluid fill-height>
    <v-layout pt-5>
      <v-flex xs12>
        <v-form v-model="valid" ref="form" lazy-validation @submit.prevent>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                label="List"
                v-model="list"
                :rules="listRules"
                :counter="10"
                multi-line
                required
                @keyup.enter="search"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6 text-xs-center>
              <v-card dark color="secondary">
                <v-list three-line subheader>
                <v-subheader>Info</v-subheader>
                <v-list-tile>
                  <v-list-tile-content v-for="(data, index) in interpreter" :key="`i-${index}`">
                    <v-list-tile-title>{{data.title}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{data.desc}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              </v-card>
            </v-flex>
          </v-layout>
          <v-btn
            @click="search"
            :disabled="!valid"
          >
            search
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
          <v-checkbox
            label="Ignore Basics"
            v-model="ignoreBasics"
          ></v-checkbox>
          <v-radio-group v-model="table" row>
            <v-radio label="Cards" value="byCards" ></v-radio>
            <v-radio label="Stores" value="byStores"></v-radio>
          </v-radio-group>
          <v-tabs 
            v-if="table == 'byCards'"
            dark
            v-model="active"
            slider-color="cyan"
          >
            <v-tab
              v-for="(c, index) in listCards"
              :key="`c-${index}`"
              ripple
            >
              {{c.card}}
            </v-tab>
            <v-tab-item
              v-for="(c, index) in listCards"
              :key="`c-${index}`"
            >
              <table-cards :list="c.prices"></table-cards>
            </v-tab-item>
          </v-tabs>
          <v-tabs 
            v-if="table == 'byStores'"
            v-model="active"
            dark
            slider-color="cyan"
          >
            <v-tab
              v-for="(c, index) in listStores"
              :key="`s-${index}`"
              ripple
            >
              {{c.loja}}
            </v-tab>
            <v-tab-item
              v-for="(c, index) in listStores"
              :key="`s-${index}`"
            >
              <table-stores :list="c.prices"></table-stores>
            </v-tab-item>
          </v-tabs>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import parseMolList from '@/parser/mol-list-parser';
  import TableCards from '@/components/TableCards.vue';
  import TableStores from '@/components/TableStores.vue';

  export default {
    name: 'List',
    components: { TableCards, TableStores
     },
    data: () => ({
      active: null,
      valid: true,
      list: '',
      listRules: [v => !!v || 'List is required'],
      listCards: [],
      listStores: [],
      interpreter: [],
      table: `byCards`,
      ignoreBasics: false,
    }),

    methods: {
      search() {
        const compute = this.compute;
        const options = { ignoreBasics: this.ignoreBasics };
        this.interpreter.push({title: 'Carregando', desc: 'Isto pode demorar um pouco.'})
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          //https://liga-the-scrappering-uxfozcbxjv.now.sh
          const data = parseMolList(this.list, options)
          console.log(data)
          // console.log('sasd', JSON.stringify(data.map(x => {name: x.name} ),null,2));
          axios
            .post('http://localhost:3000', JSON.stringify(data))
            .then(function(response) {
              compute(data, response.data);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      },
      compute(list, data) { 
        this.interpreter = []
        this.listCards = data

        const reducedByStore = data.reduce((a,b) => {
          return a.concat(b.prices)
        },[]).reduce((a,b) => {
          a[b.loja.nome] = a[b.loja.nome] || [];
          a[b.loja.nome].push(b);
          return a;
        }, {});

        this.listStores = Object.keys(reducedByStore).map(key => {
          return {loja: key, prices: reducedByStore[key]};
        });
      },
      clear() {
        this.$refs.form.reset();
      },
      formatPrice(value) {
          let val = (value/1).toFixed(2).replace('.', ',')
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
    }
  };
</script>

<style scoped>

</style>
