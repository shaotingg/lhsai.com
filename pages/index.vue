<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-flex xs12>
        <v-list>
          <v-list-tile class="list" v-for="(item, index) in css" :key="index" :to="`/${item.id}`">
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-divider></v-divider>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="stylus">
.list
  .v-list__tile
      display: block
</style>
<script>
export default {
  head () {
    return {
      title: '首页'
    }
  },
  data() {
    return {

    }
  },
  async asyncData({ app, store, params }) {
    let { data } = await app.$axios.get(`/api/css`)
    return{
      css: data.css
    }
  }
}
</script>
