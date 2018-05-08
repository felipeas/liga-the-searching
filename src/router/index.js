import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/components/Search';
import List from '@/components/List';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/search',
      name: 'Single',
      component: Search
    },
    {
      path: '/list',
      name: 'Multiple',
      component: List
    }
  ]
});

export default router;
