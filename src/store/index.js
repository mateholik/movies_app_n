import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_KEY = 'fac833a43a16bfefed079cdf238d006f'
export default new Vuex.Store({
  state: {
    movies: []
  },
  mutations: {
    //syncronous
    setMovies(state, payload) {
      const filteredData = payload.results.filter(e => e.poster_path !== null)
      state.movies = filteredData
    }
  },
  actions: {
    //asyncronous
    async fetchMovies({commit}, info) {
      try {
        const url = info.region ? `https://api.themoviedb.org/3/movie/${info.whatMovies}?api_key=${API_KEY}&region=${info.region}` : `https://api.themoviedb.org/3/movie/${info.whatMovies}?api_key=${API_KEY}`
        const response = await axios.get(url)

        commit('setMovies', response.data)
      } catch(e) {
        console.log('error: ', e);
      }
    },
    async searchMovies({commit}, name) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`)
          
        commit('setMovies', response.data)
      } catch(e) {
        console.log('error: ', e);
      }
    }
  },
  modules: {
  },
  getters: {
    movies(state) {
      return state.movies
    }
  }
})
