<template>

  <div id="app">
    <v-app dark>
      <!-- <Nav/> -->
      <Toolbar/>
      <Search/>
      <!-- <List/> -->
      <Footer/>
    </v-app>
  </div>
</template>

<script>
import Nav from './components/Nav';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
import Search from './components/Search';
// import List from './components/List';

export default {
  name: 'App',
  components: {
    Nav,
    Toolbar,
    Search,
    // List,
    Footer
  }
};
</script>

<style>

</style>
