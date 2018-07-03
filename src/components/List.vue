<template>
  <v-container fluid fill-height>
    <v-layout pt-5>
      <v-flex xs12>
        <v-form v-model="valid" ref="form" lazy-validation @submit.prevent>
          <v-layout row wrap>
            <v-flex fluid xs3 px-1>
              <v-text-field
                label="List"
                v-model="list"
                :rules="listRules"
                multi-line
                required
                @keyup.enter="search"
              >
              </v-text-field>
            </v-flex>
            <v-flex fluid xs9 text-xs-center px-1>
              <v-card color="secondary">
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
            <v-radio label="Cards" value="card" ></v-radio>
            <v-radio label="Stores" value="store"></v-radio>
          </v-radio-group>
          <group-cards 
            :data="groups[table]"
            :type="table"
          >
          </group-cards>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import parseMolList from '@/parser/mol-list-parser';
  import GroupCards from '@/components/GroupCards.vue';

  export default {
    name: 'List',
    components: { 
      GroupCards
     },
    data: () => ({
      active: null,
      valid: true,
      list: '',
      listRules: [v => !!v || 'List is required'],
      groups: [],
      interpreter: [],
      table: `stores`,
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
          // console.log(data)
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
        this.groups['card'] = data //Default is grouped by card
        
        const reducedByStore = data.reduce((a,b) => {
          return a.concat(b.prices)
        },[]).reduce((a,b) => {
          a[b.loja.nome] = a[b.loja.nome] || [];
          a[b.loja.nome].push(b);
          return a;
        }, {});

        this.groups['store'] = Object.keys(reducedByStore).map(key => {
          return {group: key, prices: reducedByStore[key]};
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
