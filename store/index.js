import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: [],
      token: null,
    },
    mutations:{
      setPosts(state, posts) {
        state.loadedPost = posts; 
      },
      addPost(state, post) {
        state.loadedPost.push(post);
      },
      editPost(state, editedPost) {
       let postIndex = state.loadedPost.findIndex(post => post.id === editedPost.id);
        state.loadedPost[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      }
    },
    actions: {
      nuxtServerInit(vueContext, context) {
        return context.app.$axios.$get('/posts.json')
        .then(data => {
          const PostArray = [];
          for(const key in data) {
            PostArray.push({...data[key], id: key })

          }
          vueContext.commit('setPosts', PostArray);
        }) 
        .catch(e => context.error(e))
      },
      addPost(vueContext, post) {
        const createdPost = {
          ...post, 
          updatedDate: new Date()
        }
        return this.$axios.$post('https://nuxt-blog-dc733.firebaseio.com/posts.json.json?auth=' + vueContext.state.token, createdPost)
        .then(data => {
          vueContext.commit('addPost', {...createdPost, id: data.name});
        })
        .catch(e => console.log(e))
      },
      editPost(vueContext, editedPost) {
       return this.$axios.$put('https://nuxt-blog-dc733.firebaseio.com/posts/' + editedPost.id + '.json?auth=' + vueContext.state.token, editedPost)
        .then(data => {
          vueContext.commit('editPost', editedPost);
        })
        .catch(e => console.log(e))
      },
      setPosts(vuexContex, posts) {
        vuexContex.commit('setPosts', posts)
      },
      authenticateUser(vueContext, authData) {
        let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey;

        if(!authData.isLogin) {
          authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey
        }
        // we return axios in order to be able add then block where it called and extract info
        return this.$axios.$post(authUrl,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then(result =>{
          vueContext.commit('setToken', result.idToken);
        })
        .catch(e => console.log(e))
      }
    },
    getters: {
      loadedPost(state) {
        return state.loadedPost
      }
    }
  })
}

export default createStore;