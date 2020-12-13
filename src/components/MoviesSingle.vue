<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{singleMovie.original_title}}</h1>
      </v-col>
    </v-row>
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
  computed: mapGetters(['singleMovie']),
  methods: {
    ...mapActions(['singleMovieById']),
  }
};
</script>
