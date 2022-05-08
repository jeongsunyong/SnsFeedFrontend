//import store from '@/store';
//import router from '@/routes';
//import AuthAPI from '@/api/auth';
const Kakao = {
  init() {
    window.Kakao.init("37324202695006da4a3475386cfb8f43");
  }
}
const Facebook = {
  init() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '342297684658248',
        cookie: true,
        xfbml: true,
        version: 'v9.0',
      });
      window.FB.AppEvents.logPageView();
    };
    (function(d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      //console.log(process.env)//현재 env파일 인식 x- > 이후 수정할 거 
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  },
  getInfo() {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus(() => {
        // 첫 시도
        window.FB.login(
          response => {
            if (response.status === 'connected') {
              // const accessToken = response.authResponse.accessToken;
              window.FB.api(
                '/me',
                { fields: 'id, name, email, picture' },
                res => {
                  if (!res) {
                    this.LoginFailure();
                  }
                  const req_body = {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    picture: res.picture.data.url,
                    social: 'Facebook',
                  };

                  resolve(req_body);
                },
              );
            } else {
              this.LoginFailure();
              reject();
            }
          },
          { scope: 'public_profile, email' },
        );
      });
    });
  },
}

export default {Facebook,Kakao};