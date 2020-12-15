<template>
  <v-container>
    <v-row>
      <v-col :md="6">
        <v-form class="d-flex align-center" ref="form" @submit.prevent="search">
          <v-text-field
            ref="input"
            prepend-icon="mdi-file"
            v-model="searchInput"
            :rules="rules"
            counter="100"
            hint="Type movie name"
            label="Search"
            keydown.enter="search"

          ></v-text-field>
          <v-btn @click="search" :loading="searchLoader" color="success" class="ml-8">Search</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Search",
  data: () => ({
    searchInput: "",
    rules: [(v) => v.length <= 100 || "Max 100 characters", (v) => v.length != 0 || "Field can not be empty"],
  }),
  computed: mapGetters(['searchLoader']),
  methods: {
    ...mapActions(['searchMovies']),
    search() {
      if(this.$refs.form.validate()) {
        this.searchMovies({query: this.searchInput})
        this.$refs.form.reset()
        this.$refs.input.blur()
        this.searchInput = ''
      } else {
        console.log('not valid');
      }
    }
  }
};
</script>
