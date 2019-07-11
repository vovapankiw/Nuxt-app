<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">Create post</AppButton>
      <AppButton style='margin-left: 10px' @click="onLogout">Logout</AppButton>
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
  middleware: ['auth-check', 'auth'],
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPost;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
      this.$router.push('/admin/auth');
    }
  },
}
</script>
