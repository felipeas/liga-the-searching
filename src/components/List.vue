<template>
  <div><v-list>
            <v-list-group
              v-model="item.active"
              v-for="item in items"
              :key="item.card"
              prepend-icon="local_activity"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.card }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="price in item.prices" :key="price.card" @click="open(price)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ price.price }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-title>{{ price.idioma }}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </v-list></div>

  
</template>

<script>
export default {
  name: 'List'
};
</script>

<style scoped>

</style>
