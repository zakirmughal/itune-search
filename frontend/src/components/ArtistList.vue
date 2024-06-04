<template>
  <div v-if="artists.length > 0">
    <p><span class="font-bold text-lg">{{artists.length}}</span> artist found.</p>
    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700"
    >
      <router-link tag="li"
                   :to="'/albums/'+artist.artistId"
                   class="py-3 px-2 sm:py-4 block hover:shadow-md hover:background-gray-100 hover:cursor-pointer"
                   v-for="artist in artists"
                   :key="artist.artistId"
      >
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img class="w-8 h-8 rounded-full" :src="artist.artworkUrl60" :alt="artist.artistName"/>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              {{artist.artistName}}
            </p>
          </div>
          <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
            </svg>
          </div>
        </div>
      </router-link>
    </ul>
  </div>

  <div
      class="flex items-center justify-center"
      v-if="artists.length === 0 && !error && !loading"
  >

    <p class="font-bold	text-2xl"> No Artist Found</p>
  </div>
</template>
<script lang="ts">
  export default {
    data() {
      return {}
    },
    props: [
      'artists',
      'error',
      'loading'
    ]
  }
</script>
