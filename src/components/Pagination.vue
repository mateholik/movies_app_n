<template>
  <div class="text-center">
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
    rules: [(v) => v.length <= 100 || "Max 100 characters"],
  }),
  computed: mapGetters(['pagination']),
  methods: {
      ...mapActions(['fetchMovies']),
    changePage(number) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      this.fetchMovies({whatMovies: this.pagination.moviesType, page: number}) //add page number
    }
  }
};
</script>
