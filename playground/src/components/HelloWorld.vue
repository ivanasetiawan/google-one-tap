<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Vue from "vue";
import OneTapLogin from 'one-tap-login';

const callback = () => {
    const redirectUrl = 'https://www.venopi.com';
    window.location.assign(redirectUrl);
};

new Vue.use(OneTapLogin, {
  id: '522692714268-9peb532q1urebtr3sagqnm2qdvpl6en7.apps.googleusercontent.com',
  isLoggedIn: false,
}, callback);

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>