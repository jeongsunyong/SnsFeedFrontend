<template>
    <v-toolbar
      dark
      prominent
      src="@/assets/banner.jpg"
    >
       <router-link to='/'><v-btn
      key="home"
      class="mx-4"
      dark
      icon
      >
      <v-icon size="24px">
            {{ "mdi-home" }}
          </v-icon>
      </v-btn>
       </router-link>
      <v-toolbar-title>통합 SNS FEED 서비스</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="$store.state.auth.oUser == null">
      <v-btn
          v-for="sns in social"
          :key="sns['social']"
          class="mx-4"
          @click="socialLogin(sns['social'])"
          dark
          icon
        >
          <v-icon size="24px">
            {{ sns['icon'] }}
          </v-icon>
        </v-btn>
      </div>
      <div v-if="$store.state.auth.oUser != null">
        <v-container>
        <v-row >{{$store.state.auth.oUser.name}}님 환영합니다.</v-row>
        <v-row><v-btn @click="logout()">Logout</v-btn></v-row>
        </v-container>
      </div>
    <!--<router-link to='/login'><v-btn>LOGIN</v-btn></router-link>-->
    </v-toolbar>
    
</template>

<script>
import snslogin from '@/utils/snslogin.js'
import AuthAPI from '@/api/auth.js'

export default {
  name: "LayoutHeader",
  data: () => ({
    facebook:null,
    kakao:null,
      social: [{'social':'facebook','icon':'mdi-facebook'},
        {'social':'kakao','icon':'mdi-temperature-kelvin'}
      ],
    }),
    methods:{
      socialLogin(social) {
          console.log(this.$store.state.auth)
          if (this.$store.state.auth.oUser) { //getter 이용할 것. 
            alert('이미 로그인 되어 있습니다.');
            this.$router.push('/');
          } else {
            if (social==='facebook'){
              this.facebookLogin();
            }
            else if (social==='kakao'){
              this.kakaoLogin();
            }
          }
      },
      facebookLogin(){
        window.FB.login(
          response => {
            if (response.status === 'connected') {
              const accessToken = response.authResponse.accessToken;
              window.FB.api(
                '/me',
                { fields: 'id, name, email' },
                res => {
                  if (!res) {
                    alert('로그인 실패');
                  }
                  const oUser = {
                    id : res.id,
                    name: res.name,
                    email: res.email,
                    social: 'Facebook',
                    token:accessToken,
                  };
                  this.$store.commit('fnSetUser',oUser)

                  const validation = AuthAPI.validation(oUser)
                  validation.then((res) => {
                    console.log(res.data.response)
                    if (res.data.response['registered']==false){
                      alert("통합 계정을 만들어주세요.")
                      this.$router.push({ name: 'SignUpPage' }).catch(() => {})
                    }
                  })
                  const LoginAPI = AuthAPI.login({
                    username:res.email,
                    social:'Facebook',
                    token:this.$store.state.auth.oUser.token
                  })
                  LoginAPI.then((response) => {
                    if(response.status==200){
                      const token=response.data.token
                      this.$cookies.set('Authorization', token)
                      alert("로그인 되었습니다.")
                      this.$router.push({ name: 'HomePage' }).catch(() => {})
                    }
                    else {
                      alert("로그인 실패")
                    }
                  })
                },
              );
            } else {
              alert('로그인 실패');
            }
          },
          { scope: 'public_profile, email' },
        );
        //this.facebook.getInfo().then((response) => {
        //      console.log(response)
        //    })
      },
      kakaoLogin(){
        window.Kakao.Auth.login({
          success:(response)=>{
            const accessToken = response.access_token; //token_type, refresh_token, id_token
            const refreshToken = response.refresh_token;
            const refresh_expiry = response.refresh_token_expires_in;

            window.Kakao.API.request({
              url: "/v2/user/me",
              success: function ( res ) {
                if (!res) {
                  alert('로그인 실패');
                }
              }
            }).then((res) => {
              const oUser = {
                  id:res.id,
                  name: res.kakao_account.profile.nickname,
                  email: res.kakao_account.email,
                  social: 'Kakao',
                  token:accessToken,
                };
                this.$store.commit('fnSetUser',oUser)

                const validation = AuthAPI.validation(oUser)
                  validation.then((response) => {
                    if (response.data.response['registered']==false){
                      alert("통합 계정을 만들어주세요.")
                      this.$router.push({ name: 'SignUpPage' }).catch(() => {})
                    }
                  })

                const LoginAPI = AuthAPI.login({
                    username:res.kakao_account.email,
                    social:'Kakao',
                    token:refreshToken,
                    expiry:refresh_expiry
                  })
                  LoginAPI.then((response) => {
                    if(response.status==200){
                      const token=response.data.token
                      this.$cookies.set('Authorization', token)
                      alert("로그인 되었습니다.")
                      this.$router.push({ name: 'HomePage' }).catch(() => {})
                    }
                    else {
                      alert("로그인 실패")
                    }
                  })
            })
          },
          fail:(err)=>{
            alert('로그인 실패');
            console.log(err)
          }
        })
      },
      logout(){
        console.log(this.$cookies)
        console.log(this.$cookies)
        this.$store.state.auth.oUser=null
        console.log(this.$cookies)
        this.$cookies.remove('Authorization')
        //this.$store.dispatch('fnLogout')
      },
    },
    created(){
      this.facebook=snslogin.Facebook
      this.kakao=snslogin.Kakao
      this.facebook.init();
      this.kakao.init();
    }
}
</script>

