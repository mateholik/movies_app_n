<template>
  <div>
    <Search/>
    <GetMovies/>
    <MoviesArchive/>
  </div>
</template>

<script>
// @ is an alias to /src

import Search from '@/components/Search';
import GetMovies from '@/components/GetMovies';
import MoviesArchive from '@/components/MoviesArchive';
export default {
  name: 'Home',
  components: {
    Search,
    GetMovies,
    MoviesArchive
  },
}
</script>
