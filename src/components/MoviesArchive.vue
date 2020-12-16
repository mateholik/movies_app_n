<template>
  <div>
    <v-row>
      <v-col v-if="!searchLoader" cols="12 d-flex flex-wrap justify-start">
        <v-card
          v-for="movie in movies"
          :key="movie.id"
          class="mx-auto mb-12"
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
      <div v-else class="d-flex justify-center" style="width: 100%; height: 80vh;">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "MoviesArchive",
  data: () => ({
  }),
  computed: mapGetters(['movies', 'searchLoader']),
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
