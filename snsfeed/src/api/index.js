import axios from 'axios'
import VueCookies from 'vue-cookies'


const instance = axios.create({
    baseURL: 'http://localhost:8000/'
  });

  instance.interceptors.request.use(
    function (config) {
      const token = VueCookies.get('Authorization')
  
      if (token && token !== '') {
        config.headers.Authorization = `Token ${token}`
        console.log(config.headers.Authorization)
        config.headers['Content-Type'] = 'application/json'
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  export default instance;