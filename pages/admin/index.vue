<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">Create post</AppButton>
    </section>
    <section class="existing-post">
      <h1>Existing post</h1>
      <PostList 
        :posts="loadedPosts"
        isAdmin
      />
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPost;
    }
  },
}
</script>
