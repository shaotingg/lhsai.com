<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-flex xs12>
        <v-form v-model="css.valid">
        <v-text-field
          v-model="css.title"
          label="Title"
          required
        ></v-text-field>
        <div id="main">
          <mavon-editor v-model="css.value"/>
        </div>
      </v-form>
      <div class="text-xs-center"><v-btn color="primary" :disabled="active" @click="saveContent">Add</v-btn></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    layout: 'admin',
    data () {
      return {
        valid: false,
        active: false,
        css: {
          title: '',
          value: ''
        }
      }
    },
    methods: {
      saveContent(){
        this.active = true
        const date = new Date()
        const qlEditor = document.querySelector('.ql-editor')
        this.$axios.post(`/api/css/add`, {
        css: {
          title: this.css.title,
          date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
          image: this.css.value.match(/<img.*?(?:>|\/>)/gi) ? this.css.value.match(/<img.*?(?:>|\/>)/gi)[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1] : null,
          excerpt: '',
          content: this.css.value
        }
      }).then((res)=>{
        this.news = {}
        this.$store.commit('CLEAR_NEWS')
        this.isLoading = false
      })
      }
    }
  }
</script>
