<template>
  <div class="text-center">
    <v-snackbar
        v-model="snackBar"
        :timeout="2000"
        color="success"
      >
        <span class="font-weight-medium">Page {{ pagination.currentPage }} loaded</span>

        <template v-slot:action="{ attrs }">
          <v-btn
            v-bind="attrs"
             color="danger"
             small
            @click="snackBar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    <div>
      <v-row justify="center">
        <v-col cols="8">
          <div>
            <v-pagination
              v-model="pagination.currentPage"
              class="my-4"
              :length="pagination.totalPages"
              @input="changePage"
              total-visible="7"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </div>
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
    ...mapActions(['fetchMovies', 'searchMovies', 'filterMovies']),
    changePage(number) {
      const scrollHere = document.getElementById('scrollHere').offsetTop
      window.scrollTo({top: scrollHere, behavior: 'smooth'});
      if(this.pagination.paginationType === 'search') {
        this.searchMovies({query: this.pagination.searchQuery, page: number})
      } else if(this.pagination.paginationType === 'fetch') {
        this.fetchMovies({whatMovies: this.pagination.moviesType, page: number})
      } else if(this.pagination.paginationType === 'filter') {
        this.filterMovies({discoverIds: this.pagination.filterQueries.ids, rating: this.pagination.filterQueries.rating, year: this.pagination.filterQueries.year, page: number})
      }
      this.snackBar = true
    }
  }
};
</script>
