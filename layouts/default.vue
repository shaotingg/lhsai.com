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
      <v-toolbar-title>首页</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer app><v-spacer></v-spacer><div>&copy; {{ new Date().getFullYear() }}</div></v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          title: '首页',
          link: '/'
        },
        {
          title: 'css样式',
          link: '/'
        },
        {
          title: '前端框架',
          link: '/'
        }
      ],
      drawer: true
    }
  }
}
</script>
</script>
