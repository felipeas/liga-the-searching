<template>
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
          ></v-text-field>
          
          <v-btn
            @click="search"
            :disabled="!valid"
          >
            search
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
          <v-data-iterator
            content-tag="v-layout"
            row
            wrap
            :items="items"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
          >
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm6
              md4
              lg3
            >
              <v-card>
                <v-card-title>ss</v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Preço:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.preco }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Link:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.link }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Condicao:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.condicao }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Quantidade:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.quantidade }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Idioma:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.idioma }}</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-data-iterator>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container >
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
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    }
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
