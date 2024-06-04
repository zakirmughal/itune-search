<script setup lang="ts">
  import {ref, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import axios from 'axios'
  import Loading from '../components/Loading.vue'
  import AlbumList from '../components/AlbumList.vue'
  import {Albums, Album} from '../app.definition'

  const route = useRoute()

  const loading = ref<boolean>(true)
  const albums = ref<Album[]>(null)
  const artistName = ref<string>(null)
  const error = ref<string>(null)

  watch(() => route?.params?.artistId, fetchAlbums, {immediate: true})

  const timeAgo = (time) => {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    const timeFormats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    let seconds = (+new Date() - time) / 1000,
      token = 'ago',
      listChoice = 1;

    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      listChoice = 2;
    }
    let i = 0,
      format;
    while (format = timeFormats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[listChoice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  }

  async function fetchAlbums(artistId: number) {
    error.value = artistName.value = albums.value = null
    loading.value = true

    try {
      const {data}: { data: Albums } = await axios.get(`http://localhost:8080/api/albums/${artistId}`)
      loading.value = false
      if (data?.success) {
        albums.value = (data?.data?.albums || []).map((album: Album) => {
          return {
            ...album,
            releaseDate: timeAgo(album.releaseDate)
          }
        }) as Album[];
        artistName.value = data?.data?.artistName || ''
      }
      return {albums: albums.value, artistName: artistName.value};
    } catch (e) {
      loading.value = false
      error.value = e.response.data.error.description
      return {albums: [], artistName: ''};
    }
  }

</script>
<template>
  <main>
    <div class="relative items-center block m-2 p-6 bg-white border border-gray-100 rounded-lg shadow-md">
      <div class="flex justify-between items-center space-x-2">
        <div>
          <router-link to="/"
                       class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
            <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
            </svg>
            <span>Go back</span>
          </router-link>
        </div>
        <h2 v-if="artistName" class="text-2xl">Album: <span class="font-bold ">{{artistName}}</span></h2>
        <div></div>
      </div>
      <div class="flex items-center justify-center" v-if="error">
        <p class="text-red-600 text-xl">{{error}}</p>
      </div>
      <AlbumList :albums="albums" :error="error" :loading="loading"/>
      <Loading :loading="loading"/>
    </div>
  </main>
</template>
