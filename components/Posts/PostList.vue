<template>
  <section class="posts-list">
    <PostPreview 
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :thumbnail="post.thumbnail"
      :title="post.title"
      :is-admin="isAdmin"
      :previewText="post.previewText"
    />
  </section>
</template>

<script>
import PostPreview from "~/components/Posts/PostPreview"

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      require: true,
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
