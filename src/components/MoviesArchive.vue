<template>
  <v-container>
    <v-row>
      <v-col cols="12 d-flex flex-wrap">
        <v-card
          v-for="movie in movies"
          :key="movie.id"
          class="mx-auto my-12"
          max-width="300"
          :to="'/movie-single/' + movie.id"
        >
          <v-img height="400" :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path"></v-img>
          <v-card-title>{{ movie.title }}</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating half-increments length="10" size="14" dense :value="movie.vote_average"></v-rating>
              <div class="grey--text ml-4">{{ movie.vote_average }} ({{ movie.vote_count }})</div>
            </v-row>
            <div>{{ truncate(movie.overview) }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "MoviesArchive",
  data: () => ({
  }),
  computed: mapGetters(['movies']),
  methods: {
    truncate(val) {
      const length = 200
      if(val.length > length) {
        return val.substring(0, length) + '...'
      } else {
        return val
      }
    }
  }
};
</script>
