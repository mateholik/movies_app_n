<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
        <v-text-field
          v-model="searchInput"
          :rules="rules"
          counter="100"
          hint="Type movie name"
          label="Search"
          @keydown.enter="search"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <v-btn @click="search" color="primary">Search</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Search",
  data: () => ({
    searchInput: "",
    rules: [(v) => v.length <= 100 || "Max 100 characters"],
  }),
  methods: {
    ...mapActions(['searchMovies']),
    search() {
      this.searchMovies(this.searchInput)
    }
  }
};
</script>
