<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list v-for="(item, index) in links" :key="index">
        <v-list-tile :to="item.link">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
     <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="logout">退出</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          title: 'css样式',
          link: '/admin/css'
        },
        {
          title: '前端框架',
          link: '/admin/front-end'
        }
      ],
      drawer: true
    }
  },
  methods: {
    async logout() {
      try {
        const { data } = await this.$axios.post('/api/logout')
        this.$cookies.remove('_lhsai_user')
        this.$router.push({path: '/login'})
      } catch (error) {
          this.message = error.message
      }
    }
  }
}
</script>
