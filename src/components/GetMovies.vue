<template>
  <div>
    <v-btn @click="getMovies('top_rated')" color="primary" class="mr-4 mb-4">Top Rated</v-btn>
    <v-btn @click="getMovies('popular')" color="primary" class="mr-4 mb-4">Popular</v-btn>
    <v-btn @click="getMovies('now_playing')" color="primary" class="mr-4 mb-4">Now Playing</v-btn>
    <v-btn @click="getMovies('now_playing', 'IN')" color="primary" class="mr-4 mb-4">Now Playing (India)</v-btn>
    <v-btn @click="getMovies('upcoming')" color="primary" class="mr-4 mb-4">Upcoming</v-btn>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "GetMovies",
  data: () => ({
    API_KEY: "fac833a43a16bfefed079cdf238d006f",
    searchResults: [],
  }),
  methods: {
    ...mapActions(['fetchMovies']),
    search() {
      this.searchMovies(this.searchInput)
    },
    getMovies(val, region) {
      this.fetchMovies({whatMovies: val, region: region})
    }
  },
};
</script>
