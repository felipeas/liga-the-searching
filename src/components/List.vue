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
                <v-card-text class="px-0">[[interpreter]]</v-card-text>
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
          <v-tabs
            dark
            v-model="active"
            slider-color="cyan"
          >
            <v-tab
              v-for="(c, index) in byCard"
              :key="index"
              ripple
            >
              {{c.card}}
            </v-tab>
            <v-tab-item
              v-for="(c, index) in byCard"
              :key="index"
            >
              <v-data-table
                  :headers="headersC"
                  :items="c.prices"
                  hide-actions
                  class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-right">{{ formatPrice(props.item.preco) }}</td>
                  <td class="text-xs-right">{{ props.item.edicao }}</td>
                  <td class="text-xs-right">{{ props.item.condicao }}</td>
                  <td class="text-xs-right">{{ props.item.quantidade }}</td>
                  <td class="text-xs-right">{{ props.item.idioma }}</td>
                  <td class="text-xs-right">{{ props.item.loja.nome }}</td>
                  <td class="text-xs-right">{{ props.item.link }}</td>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs>


          <v-tabs
            v-model="active"
            dark
            slider-color="cyan"
          >
            <v-tab
              v-for="(c, index) in byStore"
              :key="index"
              ripple
            >
              {{c.loja}}
            </v-tab>
            <v-tab-item
              v-for="(c, index) in byStore"
              :key="index"
            >
              <v-data-table
                  :headers="headersS"
                  :items="c.prices"
                  hide-actions
                  class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-right">{{ props.item.card }}</td>
                  <td class="text-xs-right">{{ formatPrice(props.item.preco) }}</td>
                  <td class="text-xs-right">{{ props.item.edicao }}</td>
                  <td class="text-xs-right">{{ props.item.condicao }}</td>
                  <td class="text-xs-right">{{ props.item.quantidade }}</td>
                  <td class="text-xs-right">{{ props.item.idioma }}</td>
                  <td class="text-xs-right">{{ props.item.link }}</td>
                </template>
              </v-data-table>
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

export default {
  name: 'List',
  data: () => ({
    active: null,
    valid: true,
    list: '',
    listRules: [v => !!v || 'List is required'],
    byCard: [],
    byStore: [],
    headersC: [
      { text: 'Preço', align: 'right', value: 'preco' },
      { text: 'Edição', align: 'right', value: 'edicao' },
      { text: 'Condição', align: 'right', value: 'condicao' },
      { text: 'Quantidade', align: 'right', value: 'quantidade' },
      { text: 'Idioma', align: 'right', value: 'idioma' },
      { text: 'Loja', align: 'right', value: 'loja.nome' },
      { text: 'Link', align: 'right', value: 'link' }
    ],
    headersS: [
      { text: 'Card', align: 'right', value: 'card' },
      { text: 'Preço', align: 'right', value: 'preco' },
      { text: 'Edição', align: 'right', value: 'edicao' },
      { text: 'Condição', align: 'right', value: 'condicao' },
      { text: 'Quantidade', align: 'right', value: 'quantidade' },
      { text: 'Idioma', align: 'right', value: 'idioma' },
      { text: 'Link', align: 'right', value: 'link' }
    ]
  }),

  methods: {
    search() {
      var self = this;
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        //https://liga-the-scrappering-uxfozcbxjv.now.sh
        const data = parseMolList(this.list)
        // console.log(data)
        // console.log('sasd', JSON.stringify(data.map(x => {name: x.name} ),null,2));
        axios
          .post('http://localhost:3000', JSON.stringify(data))
          .then(function(response) {
            self.byCard = response.data
            

            //self.byStore = [].concat.apply([], response.data)
            // self.byStore = response.data.map((x, i) => {
            //   return x[i];
            //   console.log(i)
            //   console.log(x)
            // })
            const reducedByStore = response.data.reduce((a,b) => {              
              return a.concat(b.prices)
            },[]).reduce((a,b) => {
              a[b.loja.nome] = a[b.loja.nome] || [];
              a[b.loja.nome].push(b);
              return a;
            }, {});

            self.byStore = Object.keys(reducedByStore).map(key => {
              return {loja: key, prices: reducedByStore[key]};
            });

            // console.log('aaaaaaaaaaaaaa', self.byStore);
            // console.log(JSON.stringify(self.byStore, null, 2))
          
            console.log(self.byStore);
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
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
