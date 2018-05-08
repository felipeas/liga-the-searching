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

          <v-data-table
              :headers="headers"
              :items="items"
              hide-actions
              class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.preco }}</td>
              <td class="text-xs-right">{{ props.item.condicao }}</td>
              <td class="text-xs-right">{{ props.item.quantidade }}</td>
              <td class="text-xs-right">{{ props.item.idioma }}</td>
              <td class="text-xs-right">{{ props.item.link }}</td>
            </template>
          </v-data-table>  
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
    valid: true,
    list: '',
    listRules: [v => !!v || 'List is required'],
    items: [],
    headers: [
      { text: 'Preço', align: 'right', value: 'preco' },
      { text: 'Edição', align: 'right', value: 'edicao' },
      { text: 'Condição', align: 'right', value: 'condicao' },
      { text: 'Quantidade', align: 'right', value: 'quantidade' },
      { text: 'Idioma', align: 'right', value: 'idioma' },
      { text: 'Loja', align: 'right', value: 'link' }
    ]
  }),

  methods: {
    search() {
      var self = this;
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        //https://liga-the-scrappering-uxfozcbxjv.now.sh
        const data = parseMolList(this.list);
        console.log(JSON.stringify(data.map(x => x.name)),null,2);
        axios
          .post('http://localhost:3000', JSON.stringify(data.map(x => {name: x.name} )))
          .then(function(response) {
            self.items = response.data[0].prices;
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>

</style>
