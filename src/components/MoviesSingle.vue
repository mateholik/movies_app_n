<template>
  <v-container>
    <div v-if="singleMovie != 'loading'">
      <v-row>
        <v-col cols="8" :md="4" class="mx-auto">
          <v-img :src="'https://image.tmdb.org/t/p/w400/' + singleMovie.info.poster_path"></v-img>
          <!-- <p class="my-4">
            <span v-if="singleMovie.info.tagline.length > 0">
              <strong>Tagline:</strong>
               {{singleMovie.info.tagline}}
            </span>
            <span v-else>
              No tagline available fot this movie
            </span>
          </p> -->
          <div class="">
            <v-btn
              class="mt-4 mx-auto"
              color="primary"
              large
              :href="'https://www.imdb.com/title/' + singleMovie.info.imdb_id"
              target="_blank"
            >
              Open in IMDB
            </v-btn>
          </div>
        </v-col>
        <v-col :md="8">
          <h1 class="mb-2">{{singleMovie.info.original_title}} <span class="grey--text font-weight-regular">({{returnYear(singleMovie.info.release_date)}})</span> </h1>

          <v-row align="center" class="mx-0 mb-4">
            <v-rating half-increments readonly length="10" size="18" dense :value="singleMovie.info.vote_average"></v-rating>
            <div class="grey--text ml-4">{{ singleMovie.info.vote_average }} ({{ singleMovie.info.vote_count }})</div>
          </v-row>

          <p><strong>Genres:</strong>
            <span v-for="(genre, i) in singleMovie.info.genres" :key="genre.id">
              {{ genre.name }}<span v-if="i !== singleMovie.info.genres.length - 1">,</span>
            </span>
          </p>
          <p><strong>Budget:</strong> {{numberWithCommas(singleMovie.info.budget)}}$</p>
          <p><strong>Revenue:</strong> {{numberWithCommas(singleMovie.info.revenue)}}$</p>
          <p><strong>Overview:</strong> {{singleMovie.info.overview}}</p>

          <p><strong>Production countries:</strong>
            <span v-for="(country, i) in singleMovie.info.production_countries" :key="i">
              {{ country.name }}<span v-if="i !== singleMovie.info.production_countries.length - 1">,</span>
            </span>
          </p>
          <div class="">
            <h2 class="mb-4">Actors</h2>
            <div class="d-flex" style="overflow-x: scroll;">
              <div v-for="actor in singleMovie.credits.cast" :key="actor.cast_id" class="mr-3">
                <v-card height="100%" width="130px">
                  <v-img
                    :src="'https://image.tmdb.org/t/p/w138_and_h175_face/' + actor.profile_path"
                    height="175"
                    class="grey darken-4"
                  ></v-img>
                  <div class="px-2 py-2">
                    <span class="font-weight-medium">{{ actor.name }}</span> <br>
                    <span>{{ actor.character }}</span>
                  </div>
                </v-card>
              </div>

            </div>
          </div>
        </v-col>
      </v-row>
      <div class="mt-8">
        <h2 class="mb-4">Videos</h2>
        <div v-if="singleMovie.video.results.length != 0">
          <div class="d-flex" style="overflow-x: scroll;">
            <div v-for="video in singleMovie.video.results" :key="video.id">
              <iframe :src="'https://www.youtube.com/embed/' + video.key"
               frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div v-else>
            No videos available for this movie
        </div>
      </div>




    </div>
    <div v-else class="d-flex justify-center align-center" style="height: 50vh">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
    <!-- <img width="100%" :src="'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + singleMovie.info.backdrop_path" alt=""> -->
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "MoviesSingle",
  data() {
    return {
      id: this.$route.params.id
    }
  },
  created() {
    this.singleMovieById(this.id);
  },
  destroyed() {
    this.singleMovieReset();
  },
  computed: mapGetters(['singleMovie']),
  methods: {
    ...mapActions(['singleMovieById', 'singleMovieReset']),
    returnYear(val){
      const date = new Date(val);
      return date.getFullYear()
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style media="screen">

iframe {
  margin-right: 30px;
  width: 560px;
  height: 315px;
}
@media(max-width: 768px){
  iframe {
    margin-right: 30px;
    width: 400px;
    height: 280px;
  }
}
</style>
