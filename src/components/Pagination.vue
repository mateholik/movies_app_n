<template>
  <div class="text-center">
    <v-snackbar
        v-model="snackBar"
        :timeout="3000"
      >
        Page nr.: {{ pagination.currentPage }} loaded

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackBar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="pagination.currentPage"
              class="my-4"
              :length="pagination.totalPages"
              @input="changePage"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Pagination",
  data: () => ({
    searchInput: "",
    snackBar: false,
    rules: [(v) => v.length <= 100 || "Max 100 characters"],
  }),
  computed: mapGetters(['pagination']),
  methods: {
      ...mapActions(['fetchMovies', 'searchMovies']),
    changePage(number) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      if(this.pagination.search === true) {
        this.searchMovies({query: this.pagination.searchQuery, page: number})
      } else {
        this.fetchMovies({whatMovies: this.pagination.moviesType, page: number})
      }
      this.snackBar = true
    }
  }
};
</script>
