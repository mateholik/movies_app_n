import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_KEY = 'fac833a43a16bfefed079cdf238d006f'
export default new Vuex.Store({
  state: {
    movies: [],
    pagination: {},
    singleMovie: 'loading',
    searchLoader: false,
    genres: [],
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
    },
    toggleSearchLoader(state, payload) {
      state.searchLoader = payload
    },
    setGenres(state, payload) {
      state.genres = payload
    }
  },
  actions: {
    //asyncronous
    async fetchMovies({commit}, info) {
      try {
        const url = `https://api.themoviedb.org/3/movie/${info.whatMovies}?api_key=${API_KEY}${info.region ? '&region=' + info.region : ''}${info.page ? '&page=' + info.page : ''}`

        const response = await axios.get(url)
    
        commit('setMovies', response.data)

        const pagination = {
          currentPage: response.data.page,
          totalPages: response.data.total_pages,
          moviesType: info.whatMovies,
          search: false,
          searchQuery: null
        }
        commit('setPagination', pagination)
      } catch(e) {
        console.log('error: ', e);
      }
    },
    async filterMovies({commit}, info) {
      try {
        const url = `https://api.themoviedb.org/3/discover/movie/?api_key=${API_KEY}${info.discoverIds ? '&with_genres=' + info.discoverIds : ''}${info.rating ? '&vote_average.gte=' + String(info.rating) + '&vote_average.lte=' + String(info.rating + 1) : ''}${info.year ? '&primary_release_year=' + info.year : ''}`

        console.log(url);
        const response = await axios.get(url)

        commit('setMovies', response.data)

        const pagination = {
          currentPage: response.data.page,
          totalPages: response.data.total_pages,
          moviesType: info.whatMovies,
          search: false,
          searchQuery: null
        }
        commit('setPagination', pagination)
      } catch(e) {
        console.log('error: ', e);
      }
    },
    async movieGenresList({commit}) {
      try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

        const response = await axios.get(url)
        commit('setGenres', response.data.genres)

      } catch(e) {
        console.log('error: ', e);
      }
    },
    async searchMovies({commit}, info) {
      try {
        commit('toggleSearchLoader', true)
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${info.query}${info.page ? '&page=' + info.page : ''}`
        const response = await axios.get(url)
        commit('setMovies', response.data)
        commit('toggleSearchLoader', false)

        const pagination = {
          currentPage: response.data.page,
          totalPages: response.data.total_pages,
          moviesType: null,
          search: true,
          searchQuery: info.query
        }
        commit('setPagination', pagination)
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
    },
    searchLoader(state) {
      return state.searchLoader
    },
    genres(state) {
      return state.genres
    }
  }
})
