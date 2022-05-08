<template>
  <v-container flow>
    <v-row>
      <v-col cols="12" class="text-center my-5">
        <h1 class="display-1">LOGIN</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
        <form @submit.prevent="fnDoLogin">
          <v-text-field name="Email" label="이메일" type="email" v-model="email" required>
          </v-text-field>
          <v-text-field name="Password" label="비밀번호" type="password" v-model="password" required>
          </v-text-field>
          <v-btn type="submit" color="green" dark>
            로그인
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import fb from '@/utils/snslogin.js'
  export default {
    name:'LoginPage',
    data() {
      return {
        email: '', // 이메일 입력값 임시 저장
        password: '' // 비밀번호 입력값 임시 저장
      }
    },
    methods: {
        socialLogin(social) {
          console.log(this.$store.state.auth)
          if (this.$store.state.auth.oUser) { //getter 이용할 것. 
            alert('이미 로그인 되어 있습니다.');
            this.$router.push('/');
          } else {
            if (social==='facebook'){window.FB.login(
          response => {
            if (response.status === 'connected') {
              const accessToken = response.authResponse.accessToken;
              window.FB.api(
                '/me',
                { fields: 'id, name, email' },
                res => {
                  if (!res) {
                    this.LoginFailure();
                  }
                  console.log(res)
                  const oUser = {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    social: 'Facebook',
                    token:accessToken,
                  };
                  this.$store.commit('fnSetUser',oUser)
                  console.log(this.$store.getters.fnGetUser)
                },
              );
            } else {
              this.LoginFailure();
            }
          },
          { scope: 'public_profile, email' },
        );}
            fb.getInfo().then((responseData) => {
              console.log(responseData)
            })
          }
      },
      //  // 스토어에 이메일 로그인 처리 요청
      fnDoLogin() {
        this.$store.dispatch('fnDoLogin', {
          email: this.email,
          password: this.password
        })
      }
    },
    created(){
      fb.init();
    },
  }
</script>