<template>
  <div>
    <Search/>
    <GetMovies/>
    <MoviesArchive/>
    <Pagination/>
  </div>
</template>

<script>
// @ is an alias to /src

import Search from '@/components/Search';
import GetMovies from '@/components/GetMovies';
import MoviesArchive from '@/components/MoviesArchive';
import Pagination from '@/components/Pagination';
export default {
  name: 'Home',
  components: {
    Search,
    GetMovies,
    MoviesArchive,
    Pagination
  },
}
</script>
