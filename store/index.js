import Vuex from "vuex";
import axios from "axios";
import Cookie from 'js-cookies';

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
      setToken (state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
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
      authenticateUser(vuexContext, data) {
        let authUrl =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
        process.env.fbAPIKey;
        if (!data.isLogin) {
        authUrl =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
            process.env.fbAPIKey;
        }

        return this.$axios
          .$post(authUrl, {
            email: data.email,
            password: data.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit('setToken', result.idToken);
            localStorage.setItem('token', result.idToken);
            localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000 );
            Cookie.set('jwt', result.idToken);
            Cookie.set('expirationDate',  new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
          })
          .catch(e => console.log(e));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if(req) {
          if(req.headers.cookies) {
            return;
          }
          
          const jwtCookies = req.headers.cookies.split(';').find(c => c.trim().startsWith('jwt='))
          if(!jwtCookies) {
            return ;
          }

          token = jwtCookies.split('=')[1];
          ExpirationDate = req.headers.cookies.split(';').find(c => c.trim().startsWith('expirationDate='))
          .split('=')[1];
        } else {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('tokenExpiration');
        }

        if(new Date().getTime() > +expirationDate || !token) {
          vuexContext.dispatch('logout');
          return ;
        } 

        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');
        Cookie.remove('token');
        Cookie.remove('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
      },
    },
    getters: {
      loadedPost(state) {
        return state.loadedPost
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  })
}

export default createStore;