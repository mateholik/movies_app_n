<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link to="/" class="d-flex align-center white--text text-decoration-none">
        <h1>Movies app</h1>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/mateholik/movies_app_n"
        target="_blank"
        text
      >
        <span class="mr-2">Code repo</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>


import { mapActions } from 'vuex'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  created() {
    this.fetchMovies({whatMovies: 'popular', region: null})
  },
  methods: {
    ...mapActions(['fetchMovies'])
  }
};
</script>

<style media="screen">
@media (min-width: 1904px) {
  .container {
    max-width: 1400px!important;
  }
}
</style>
