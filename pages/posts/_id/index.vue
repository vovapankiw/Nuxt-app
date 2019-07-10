<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title}}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{ loadedPost.updatedDate | date}}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p>{{ loadedPost.content }}</p>
    </section>
    <section>
      <p class="post-content">Let me know what you think about a post <a href="mailto:panzer1991@bigmir.net">panzer1991@bigmir.net</a></p>
    </section>
  </div>
</template>

<script>

export default {
  asyncData(context) {
    return context.app.$axios.$get('/posts/' + context.params.id + '.json')
    .then(data => {
      return {
        loadedPost: data
      }
    })
    .catch(e => context.error(e))
  },
  head: {
    title: 'A blog post'
  }
}
</script>


<style scoped>
  .single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>

