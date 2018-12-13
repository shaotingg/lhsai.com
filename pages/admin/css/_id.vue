<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-flex xs12>
        <v-form v-model="valid">
        <v-text-field
          v-model="css.title"
          label="Title"
          required
        ></v-text-field>
        <div id="main">
          <mavon-editor v-model="css.value"/>
        </div>
      </v-form>
      <div class="text-xs-center"><v-btn color="primary" :disabled="active" @click="updateContent">Update</v-btn></div>
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
        active: true,
      }
    },
    async asyncData({ app, store, params }) {
      let { data } = await app.$axios.get(`/api/css/${params.id}`)
      return{
        css: {
          id: data[0].id,
          title: data[0].title? data[0].title: '',
          value: data[0].content? data[0].content:''
        }
      }
    },
    watch: {
      css: {
        handler: function(val) {
          if(this.css.title!=='' || this.css.value!==''){
            this.active = false
          }else {
            this.active = true
          }
      },
      deep: true
      }
    },
    methods: {
      async updateContent() {
        const date = new Date()
        await this.$axios.put(`/api/css/${this.$route.params.id}`, {
          css: {
            id: this.$route.params.id,
            title: this.css.title,
            date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            image: this.css.value.match(/<img.*?(?:>|\/>)/gi) ? this.css.value.match(/<img.*?(?:>|\/>)/gi)[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1] : null,
            excerpt: '',
            content: this.css.value
          }
        }).then((res)=>{
          this.active = true
        })
      }
    }
  }
</script>
