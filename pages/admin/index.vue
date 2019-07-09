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
import PostList from '~/components/Posts/PostList';
import AppButton from '~/components/UI/AppButton';

export default {
  layout: 'admin',
  components: {
    PostList,
    AppButton, 
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPost;
    }
  },
}
</script>
