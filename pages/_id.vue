<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-flex xs12>
        <pre v-html="css.content"></pre>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    async asyncData({ app, store, params }) {
      let { data } = await app.$axios.get(`/api/css/${params.id}`)
      return{
        css: {
          id: data[0].id,
          content: data[0].content? data[0].content:''
        }
      }
    }
  }    
  
</script>