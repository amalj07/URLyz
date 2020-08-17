const axios = require('axios')

export function isAuthenticated(to, from, next) {
  const url = 'http://localhost:5000/api/user/authenticate'
  axios.post(url, {
      sid: getCookie('sid'),
      token: getCookie('t')
  }).then(response => {
    console.log(response.data.status)
      if(response.data.status == 'SUCCESS') {
          next()
      }else {
          next({name: 'Login'})
      }
  })
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}