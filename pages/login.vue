<template>
  <v-container fill-height>
    <v-layout align-center justify-center row>
      <v-flex xs6 md4>
        <v-form v-model="valid">
          <v-text-field
            v-model="username"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="Password"
            required
          ></v-text-field>
        </v-form>
        <div class="text-xs-center"><v-btn class="primary" large @click="login">登录</v-btn></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="stylus">

</style>
<script>
  export default {
    layout: 'login',
    data: () => ({
      valid: false,
      username: '',
      password: ''
    }),
    head () {
      return {
        title: '用户登陆'
      }
    },
    methods: {
      async login() {
        try {
          const { data } = await this.$axios.post('/api/login', {
            username: this.username,
            password: this.password
          })
          this.$cookies.set('_lhsai_user', data.username)
          this.$router.push({path: '/admin'})
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.message = error.message
          }
        }
      }
    }
  }
</script>
