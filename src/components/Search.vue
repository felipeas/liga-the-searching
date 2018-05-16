<template>
  <v-container fluid fill-height>
    <v-layout pt-5>
      <v-flex xs12>
        <v-form v-model="valid" ref="form" lazy-validation @submit.prevent>
          <v-text-field
            label="Name"
            v-model="name"
            :rules="nameRules"
            :counter="10"
            required
            @keyup.enter="search"
          ></v-text-field>
          
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
              <td class="text-xs-right">{{ formatPrice(props.item.preco) }}</td>
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

export default {
  name: 'Search',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [v => !!v || 'Name is required'],
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
        const data = [{ name: this.name }];
        axios
          .post('http://localhost:3000', JSON.stringify(data))
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
    },
    open(price) {
      window.location.href = price.link;
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
