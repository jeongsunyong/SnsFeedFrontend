
export default {
  state: {
      oUser: null // 사용자 정보를 담을 객체
    },
    
  mutations: {
    // 사용자 객체를 저장
    fnSetUser(state, payload) {
      state.oUser = payload
    }
  },

  getters: {
    fnGetUser(state) {
      return state.oUser
    }
  },
  actions: {
    }
}
