<template>
  <div class="post-page">
    <PostList
    :posts="loadedPost" />
  </div>
</template>

<script>
import PostList from "~/components/Posts/PostList"

export default {
  middleware: 'log',
  components: {
    PostList
  }, 
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPost;
    }
  }
}
</script>

<style scoped>
  .post-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .posts-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

