<script setup lang="ts">
  import {RouterLink, RouterView} from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import SearchFilter from './components/Filter.vue'
</script>

<template>
  <div class="m-2">
    <RouterView />
    <header>
      <!--<img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

      <!--<div class="wrapper">-->
      <!--<HelloWorld msg="You did it!" />-->

      <!--<nav>-->
      <!--<RouterLink to="/">Home</RouterLink>-->
      <!--<RouterLink to="/about">About</RouterLink>-->
      <!--</nav>-->
      <!--</div>-->
    </header>
  </div>
</template>

<!--<script lang="ts">-->
  <!--import axios from 'axios'-->

  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--posts: []-->
      <!--}-->
    <!--},-->
    <!--computed: {},-->
    <!--mounted() {-->
      <!--axios-->
        <!--.get('https://jsonplaceholder.typicode.com/posts/1')-->
        <!--.then((response) => {-->
          <!--this.posts = response.data-->
        <!--})-->
    <!--}-->
  <!--}-->
<!--</script>-->
