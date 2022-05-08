<template>
  <v-container fluid>
    <LayoutHeader />
    <router-view/>
    <LayoutFooter />
  </v-container>
</template>

<script>
import LayoutHeader from './components/layout/LayoutHeader';
import LayoutFooter from './components/layout/LayoutFooter';

export default {
  name: 'App',

  components: {
    LayoutHeader,
    LayoutFooter,
  },

  data: () => ({
  }),
};
</script>
