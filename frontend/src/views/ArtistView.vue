<script setup lang="ts">
  import SearchFilter from '../components/Filter.vue'
  import Loading from '../components/Loading.vue'
  import ArtistList from '../components/ArtistList.vue'
</script>
<template>
  <header>
    <SearchFilter
        :getArtistRequest="getArtistRequest"
    />
  </header>
  <main>
    <div class="relative items-center block m-2 p-6 bg-white border border-gray-100 rounded-lg shadow-md">
      <div class="flex items-center justify-center" v-if="error">
        <p class="text-red-600 text-xl">{{error}}</p>
      </div>

      <ArtistList :artists="artists"/>
      <Loading :loading="loading"/>
    </div>
  </main>
</template>

<script lang="ts">
  import axios from 'axios'
  import {Artists, Artist} from '../app.definition'

  export default {
    data() {
      return {
        artists: [] as Artist[],
        isFetching: false,
        error: ''
      }
    },
    computed: {
      loading: {
        get() {
          return this.isFetching;
        },
        set(fetch: boolean) {
          this.isFetching = fetch;
        }
      }
    },
    methods: {
      async getArtistRequest(term) {
        this.error = '';
        term = term.toLowerCase().trim();
        this.loading = true;
        this.artists = [];
        try {
          const {data}: { data: Artists } = await axios
            .get(`http://localhost:8080/api/search/${term}/1`)
          this.loading = false
          if (data?.success) {
            this.artists = data?.data
          }
          return this.artists;
        } catch (e) {
          this.loading = false;
          console.log(e?.message || e?.response?.data?.error?.description)
          this.error = e?.message || e?.response?.data?.error?.description;
        }

      }
    }
  }
</script>
