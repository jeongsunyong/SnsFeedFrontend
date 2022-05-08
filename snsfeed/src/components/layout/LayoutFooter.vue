<template>
  <v-footer
    dark
    padless
    default
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal">
        <strong class="subheading">SKT ICT Family SW Developer Test</strong>

        <v-spacer></v-spacer>

        <div class="logobox">
        <img class="logo" alt="홈으로 이동" :src="require('@/assets/ci_t.jpg')">
        </div>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Jeong sun yong</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    name: "LayoutFooter",

  }
</script>
<style>
.logobox {
    background: white;
    width:45px;
    height: 45px; 
    border-radius: 70%;
    margin:10px;
    text-align: center;
    overflow:hidden;
}
.logo {
    width: 25px;
    height: 25px;
    object-fit: cover;
    margin-top:12px;
}
</style>