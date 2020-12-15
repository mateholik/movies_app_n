import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_KEY = 'fac833a43a16bfefed079cdf238d006f'
export default new Vuex.Store({
  state: {
    movies: [],
    pagination: {},
    singleMovie: 'loading'
  },
  mutations: {
    //syncronous
    setMovies(state, payload) {
      const filteredData = payload.results.filter(e => e.poster_path !== null)
      state.movies = filteredData
    },
    setPagination(state, payload) {

      state.pagination = payload
    },
    setSingleMovie(state, payload) {
      state.singleMovie = payload
    },
    resetSingleMovie(state, payload) {
      state.singleMovie = payload
    }
  },
  actions: {
    //asyncronous
    async fetchMovies({commit}, info) {
      try {

        // const url = info.region ? `https://api.themoviedb.org/3/movie/${info.whatMovies}?api_key=${API_KEY}&region=${info.region}` : `https://api.themoviedb.org/3/movie/${info.whatMovies}?api_key=${API_KEY}`
        console.log(info);
        const url = `https://api.themoviedb.org/3/movie/${info.whatMovies}?api_key=${API_KEY}${info.region ? '&region=' + info.region : ''}${info.page ? '&page=' + info.page : ''}`
        console.log(url);

        const response = await axios.get(url)
        console.log(response);
        commit('setMovies', response.data)

        const pagination = {
          currentPage: response.data.page,
          totalPages: response.data.total_pages,
          moviesType: info.whatMovies
        }
        console.log(pagination);
        commit('setPagination', pagination)
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
    async singleMovieById({commit}, id) {
      try {
        const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        const movieVideo = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        const movieCredits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
        const movieSimilarMovies = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`)

        const dataObject = {
          info: movieInfo.data,
          video: movieVideo.data,
          credits: movieCredits.data,
          similar: movieSimilarMovies.data
        }

        console.log(dataObject);
        commit('setSingleMovie', dataObject)
      } catch(e) {
        console.log('error: ', e);
      }
    },
    singleMovieReset({commit}) {
        commit('resetSingleMovie', 'loading')
    }
  },
  modules: {
  },
  getters: {
    movies(state) {
      return state.movies
    },
    pagination(state) {
        return state.pagination
    },
    singleMovie(state) {
      return state.singleMovie
    }
  }
})
