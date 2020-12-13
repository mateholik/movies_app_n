<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <v-btn @click="topRated" color="primary" class="mr-4">Top Rated</v-btn>
        <v-btn @click="popular" color="primary" class="mr-4">Popular</v-btn>
        <v-btn @click="nowPlaying" color="primary" class="mr-4">Now Playing</v-btn>
        <v-btn @click="nowPlayingCountry" color="primary" class="mr-4">Now Playing (India)</v-btn>
        <v-btn @click="upcoming" color="primary">Upcoming</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "GetMovies",
  data: () => ({
    API_KEY: "fac833a43a16bfefed079cdf238d006f",
    searchResults: [],
  }),
  mounted() {

  },
  methods: {
    topRated() {
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_KEY}`;
      this.getMovies(url)
    },
    popular() {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`;
      this.getMovies(url)
    },
    nowPlaying() {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}`;
      this.getMovies(url)
    },
    nowPlayingCountry() {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}&region=IN`;
      this.getMovies(url)
    },
    upcoming() {
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.API_KEY}`;
      this.getMovies(url)
    },
    getMovies(url) {
      axios
        .get(url)
        .then((res) => {
          const filteretData = res.data.results.filter(e => e.poster_path !== null)
          this.searchResults = filteretData;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>
