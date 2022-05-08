import instance from '@/api/index.js'

const FeedAPI = {
    getData: (query) => {
      const url = 'feed/feedList'
      const method= 'get'
      const params = query
  
      return instance({
        url,
        method,
        params
    })
    },
    renewData: (query) => {
      console.log(query)
      const url = 'feed/renew'
      const params = query
      return instance.post(
        url,
        params
      )
    },
  }
  
  export default FeedAPI