<template>
  <v-data-table
      :headers="header"
      :items="list"
      hide-actions
      class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ toPilas(props.item.preco) }}</td>
      <td class="text-xs-right">{{ props.item.edicao }}</td>
      <td class="text-xs-left">{{ props.item.condicao }}</td>
      <td class="text-xs-left">{{ props.item.quantidade }}</td>
      <td class="text-xs-left">{{ props.item.idioma }}</td>
      <td class="text-xs-left">{{ props.item.loja.nome.substring(0,15) }}</td>
    </template>
    
  </v-data-table>

</template>

<script>

import toPilas from '@/helpers/currency';

export default {
  name: 'TableCards',
  props: {
    list: Array
  },
  data: () => ({
    header: [
      { text: 'Preço', align: 'left', value: 'preco' },
      { text: 'Edição', align: 'right', value: 'edicao' },
      { text: 'Condição', align: 'left', value: 'condicao' },
      { text: 'Quantidade', align: 'left', value: 'quantidade' },
      { text: 'Idioma', align: 'left', value: 'idioma' },
      { text: 'Loja', align: 'left', value: 'loja.nome' },
    ],
  }),
};
</script>

<style scoped>

</style>
