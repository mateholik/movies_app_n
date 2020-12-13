import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_KEY = 'fac833a43a16bfefed079cdf238d006f'
export default new Vuex.Store({
  state: {
    movies: [],
    singleMovie: {}
  },
  mutations: {
    //syncronous
    setMovies(state, payload) {
      const filteredData = payload.results.filter(e => e.poster_path !== null)
      state.movies = filteredData
    },
    setSingleMovie(state, payload) {
      state.singleMovie = state.movies.filter(el => el.id === payload *1)[0]
    }
  },
  actions: {
    //asyncronous
    async fetchMovies({commit}, info) {
      try {
        console.log('fetchinam');
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
    },
    singleMovieById({commit}, id) {
      commit('setSingleMovie', id)
    }
  },
  modules: {
  },
  getters: {
    movies(state) {
      return state.movies
    },
    singleMovie(state) {
      return state.singleMovie
    }
  }
})
