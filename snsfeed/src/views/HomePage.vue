<template>
    <v-container class="home" fluid>
        <v-card class=searchbox fluid
  elevation="1" >
            <v-row>
                <h1>통합 SNS 피드 서비스</h1>
            </v-row>
            <v-row>
                <v-col
                >
                    <v-text-field
                    v-model="keyword"
                        label="검색어를 입력하세요."
                        solo
                    ></v-text-field>
                </v-col>
                <v-col
                >
                    <v-btn class="searchbutton"
                    @click="getData()"
                    >
                    검색
                    </v-btn>
                </v-col>
                <v-col
                >
                    <v-btn
                    rounded
                    color="primary"
                    @click="renewFeed()"
                    dark
                    >
                    데이터 새로고침
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-card>
            <v-row>
            <v-col
            cols="12"
            sm="6">
            </v-col>
            <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="item.user"
                ></v-card-title>

                <v-card-subtitle v-text="item.content"></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    v-if="item.img_url != ''"
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    righ
                    width="40px"
                  >
                    <img :src="item.img_url"
                    height="100px"
                    width="100px"/>
                  </v-btn>

                  <v-btn
                    v-else
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                  >
                    {{item.social}}
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
            <v-col
            cols="12"
            sm="6">
            
            </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>
<script>
import FeedAPI from '@/api/feed.js'

export default {
    name:'HomePage',
    data: () => ({
      keyword:'',
      items: [
        {
          user: 'user',
          img_url: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          content : 'Apple banana',
          social: 'Facebook',
        },
      ],
    }),
    methods:{
      getData(){
        let email=email=this.$store.state.auth.oUser.email
        let social=social=this.$store.state.auth.oUser.social
        let keyword=this.keyword
        const param={
            email,
            social,
            keyword
          }
        const getDataAPI = FeedAPI.getData(param)
        getDataAPI.then((res) => {
            if(res.status==200){
              console.log(res)
              this.items=res.data.response
            }
            }).catch(err => {
            alert("로그인 해주세요.")
          console.log(err)}
          );
      },
      renewFeed(){
        const renewDataAPI = FeedAPI.renewData(this.$store.state.auth.oUser)
        renewDataAPI.then((res) => {
            if(res.status==200){
              console.log(res)
            }
            else{
              alert("인증 오류")
            }
          }).catch(err => {
            alert("로그인 해주세요.")
          console.log(err)}
          );
      }
    }
}
</script>

<style>
.home {
    background-color: white;
    overflow-y: auto;
}
.searchbox {
    background-color: wheat;
    margin-top: 20px;
    padding: 20px;
}
.searchbutton {
    padding: 20%;
}
</style>
