import instance from '@/api/index.js'

const AuthAPI = {
    signUp: (query) => {
      const url = 'accounts/signup'
      const params = query
  
      return instance.post(
        url,
        params
      )
    },
    login: (query) => {
      const url = 'accounts/login'
      const params = query
      return instance.post(
        url,
        params
      )
    },
    validation: (query) => {
      console.log(query)
      const url = 'accounts/validation'
      const params = query
      return instance.post(
        url,
        params
      )
    },
  }
  
  export default AuthAPI