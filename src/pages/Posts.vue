<template>
  <h1 align="center">POSTS</h1>
  <q-page class="flex flex-center">
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="post in posts" :key="post.id">
        <q-item-section>
          <q-item-label overline>{{ post.title }}</q-item-label>
          <q-item-label>{{ post.body }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      posts: []
    }
  },
  created () {
    this.$axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
      this.posts = response.data
    })
  }
})

</script>
