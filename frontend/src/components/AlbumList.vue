<template>
  <div
      class="flex items-center justify-center"
      v-if="(!albums || albums.length === 0) && !loading && !error"
  >

    <p class="font-bold	text-2xl"> No Album Found</p>
  </div>

  <div v-if="albums && albums.length > 0">
    <p><span class="font-bold text-lg">{{albums.length}}</span> album found.</p>
    <div class="grid grid-cols-4 gap-4 justify-between">
      <div
          class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:border-gray-200"
          v-for="album in albums"
          :key="album.albumId"
      >
        <img class="p-8 rounded-t-lg" :src="album.albumPic" :alt="album.albumName"/>

        <div class="px-5 pb-5">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">
            {{album.albumName}}
          </h5>
          <div class="flex items-center mt-2.5 mb-5">

                <span
                    class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{{album.primaryGenreName}}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900">${{album.collectionPrice}}</span>
            <span class="bg-blue-100 text-gray-400 text-xs font-semibold px-2.5 py-0.5 rounded text-black">{{album.releaseDate}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  export default {
    data() {
      return {}
    },
    props: [
      'albums',
      'error',
      'loading'
    ]
  }
</script>
