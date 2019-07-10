import Vuex from "vuex";
<<<<<<< HEAD
=======
import axios from "axios";
import Cookie from 'js-cookies';
>>>>>>> 7cbf473fe6b0f93ff6d24771b355820fcf0849d0

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
<<<<<<< HEAD
      setToken(state, token) {
        state.token = token;
=======
      setToken (state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
>>>>>>> 7cbf473fe6b0f93ff6d24771b355820fcf0849d0
      }
    },
    actions: {
      nuxtServerInit(vueContext, context) {
<<<<<<< HEAD
        return context.app.$axios.$get('/posts.json')
        .then(data => {
=======
        return context.app.$axios.get(process.env.baseUrl + '/posts.json')
        .then(res => {
>>>>>>> 7cbf473fe6b0f93ff6d24771b355820fcf0849d0
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
<<<<<<< HEAD
        return this.$axios.$post('https://nuxt-blog-dc733.firebaseio.com/posts.json.json?auth=' + vueContext.state.token, createdPost)
        .then(data => {
          vueContext.commit('addPost', {...createdPost, id: data.name});
=======
        return this.$axios.$post('https://cors-anywhere.herokuapp.com/https://nuxt-blog-dc733.firebaseio.com/posts.json?auth=' + vueContext.state.token, createdPost)
        .then(res => {
          vueContext.commit('addPost', {...createdPost, id: res.data.name});
>>>>>>> 7cbf473fe6b0f93ff6d24771b355820fcf0849d0
        })
        .catch(e => console.log(e))
      },
      editPost(vueContext, editedPost) {
       return this.$axios.$put('https://nuxt-blog-dc733.firebaseio.com/posts/' + editedPost.id + '.json?auth=' + vueContext.state.token, editedPost)
<<<<<<< HEAD
        .then(data => {
=======
        .then(res => {
>>>>>>> 7cbf473fe6b0f93ff6d24771b355820fcf0849d0
          vueContext.commit('editPost', editedPost);
        })
        .catch(e => console.log(e))
      },
      setPosts(vuexContex, posts) {
        vuexContex.commit('setPosts', posts)
      },
<<<<<<< HEAD
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
=======
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
>>>>>>> 7cbf473fe6b0f93ff6d24771b355820fcf0849d0
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