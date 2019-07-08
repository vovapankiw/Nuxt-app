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
      }
    },
    actions: {
      nuxtServerInit(vueContext, context) {
        return axios.get('https://nuxt-blog-dc733.firebaseio.com/posts.json')
        .then(res => {
          const PostArray = [];
          for(const key in res.data) {
            PostArray.push({...res.data[key], id: key })

          }
          vueContext.commit('setPosts', PostArray);
        }) 
        .catch(e => context.error(e))
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