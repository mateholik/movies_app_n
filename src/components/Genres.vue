<template>
  <v-container>
    <v-row>
      <v-col :md="4">
        <div>
          <h2>Genres</h2>
          <div class="genres">
            <v-checkbox
              v-for="item in genres"
              v-model="genresSelected"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              @click="filter"
              dense
              hide-details="true"
            ></v-checkbox>
          </div>
        </div>
      </v-col>
      <v-col :md="2">
        <div class="rating">
          <h2>Rating</h2>
          <v-radio-group
            v-model="ratingSelected"
            column
            @change="filter"
          >
            <v-radio
              v-for="i in 10"
              :key="i"
              :label="String(i - 1) + ' - ' + i"
              :value="i - 1"
            ></v-radio>
          </v-radio-group>
        </div>
      </v-col>
      <v-col :md="2">
        <div class="year">
          <h2>Year</h2>
          <v-select
            v-model="yearSelected"
            :items="yearsArray"
            label="Select year"
            return-object
            @change="filter"
          ></v-select>
        </div>
      </v-col>
    </v-row>




  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Genres",
  data: () => ({
    genresSelected: [],
    ratingSelected: '',
    yearSelected: ''
  }),
  created(){
    const years = []
    for(let i = 1900; i < 2021; i++) {
      years.unshift(i)
    }
    this.yearsArray = years
  },
  computed: mapGetters(['genres']),
  methods: {
    ...mapActions(['filterMovies']),
    filter() {
      this.filterMovies({discoverIds: this.genresSelected, rating: this.ratingSelected, year: this.yearSelected})

    }
  }
};
</script>

<style media="screen">
  .genres {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 290px;
    width: 440px;
  }
  .genres .v-input {
    margin-top: 0;
  }
  .rating .v-radio:first-of-type {
    display: none
  }
</style>
