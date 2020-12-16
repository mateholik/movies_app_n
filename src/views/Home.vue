<template>
  <v-container>
    <v-row>
      <v-col cols="12" :md="8">
        <GetMovies/>
      </v-col>
      <v-col cols="12" :md="4">
        <Search/>
      </v-col>
    </v-row>
    <Filters/>
    <h1 id="scrollHere" class="text-center mt-10">MOVIES LIST</h1>
    <Pagination/>
    <MoviesArchive/>
    <Pagination/>
  </v-container>
</template>

<script>
// @ is an alias to /src

import Search from '@/components/Search';
import GetMovies from '@/components/GetMovies';
import MoviesArchive from '@/components/MoviesArchive';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';
export default {
  name: 'Home',
  components: {
    Search,
    GetMovies,
    MoviesArchive,
    Pagination,
    Filters
  },
}
</script>

<style media="screen">
/* loader */
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  }
  .lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #000;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
  }
  @keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
  }
  @keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
