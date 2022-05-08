<template>
  <v-container flow>
    <v-row>
      <v-col cols="12" class="text-center my-5">
        <h1 class="display-1">SignUp</h1>
      </v-col>
    </v-row>
    <v-row><h6>  * 회원 정보가 존재한다면 해당 메일에 연동됩니다.</h6></v-row>
    <v-row>
      <v-col class="text-center" cols="8" offset="2" sm="6" offset-sm="3">
        <form @submit.prevent="signUp()">
          <!-- 필수 입력사항이 되도록 required 어트리뷰트 적용 -->
          <v-text-field name="Email" label="이메일" type="email" v-model="email" required>
          </v-text-field>
          <v-text-field name="Password" label="비밀번호" type="password" v-model="password" required>
          </v-text-field>
          <!-- 시간지연상태인 경우 버튼은 사라지게 함 -->
          <v-btn type="submit"  color="green" dark>
            가입하기
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthAPI from '@/api/auth.js'
  export default {
    name:'SignUpPage',
    data() {
      return {
        Email: '', // 이메일 입력값 임시 저장
        Password: '', // 비밀번호 입력값 임시 저장
        social:this.$store.oUser
      }
    },
    methods: {
      // 회원가입 요청
      signUp() {
        console.log(this.email)
        console.log(this.password)
        console.log(this.social)
        //this.$store.dispatch('fnDoLogin', {
        //  pEmail: this.sEmail,
        //  pPassword: this.sPassword
        //})
        const signUpAPI = AuthAPI.signUp({
          email:this.email,
          password:this.password,
          social:this.$store.state.auth.oUser
      })
          signUpAPI.then((res) => {
            if(res.status==200){
              console.log("res 200")
              const LoginAPI = AuthAPI.login({
                username:this.email,
                password:this.password
              })
              LoginAPI.then((res) => {
                if(res.status==200){
                  const token=res.data.token
                  this.$cookies.set('Authorization', token)
                  alert("로그인 되었습니다.")
                  this.$router.push({ name: 'HomePage' }).catch(() => {})
                }
                else {
                  alert("로그인 실패")
                }
              })
            }
            else{
              alert("계정 생성 오류")
            }
          
          })
      }
    },
  }
</script>