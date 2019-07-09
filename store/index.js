import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPost: []
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
      }
    },
    actions: {
      nuxtServerInit(vueContext, context) {
        return axios.get(process.env.baseUrl + '/posts.json')
        .then(res => {
          const PostArray = [];
          for(const key in res.data) {
            PostArray.push({...res.data[key], id: key })

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
        return axios.post('https://cors-anywhere.herokuapp.com/https://nuxt-blog-dc733.firebaseio.com/posts.json', createdPost)
        .then(res => {
          vueContext.commit('addPost', {...createdPost, id: res.data.name});
        })
        .catch(e => console.log(e))
      },
      editPost(vueContext, editedPost) {
       return axios.put('https://nuxt-blog-dc733.firebaseio.com/posts/' + editedPost.id + '.json', editedPost)
        .then(res => {
          vueContext.commit('editPost', editedPost);
        })
        .catch(e => console.log(e))
      },
      setPosts(vuexContex, posts) {
        vuexContex.commit('setPosts', posts)
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