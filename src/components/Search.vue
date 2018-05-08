<template>
  <form v-on:submit.prevent>
    <v-container fluid fill-height>
      <v-layout pt-5>
        <v-flex xs12>
          <v-form v-model="valid" ref="form" lazy-validation>
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
  </form>
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
          {
            text: 'preco',
            align: 'right',
            value: 'preco'
          },
          { text: 'Condicao', value: 'condicao' },
          { text: 'Qtde', value: 'quantidade' },
          { text: 'Idioma', value: 'idioma' },
          { text: 'Link', value: 'link' }
        ],
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
    }
  }
};
</script>

<style scoped>

</style>
