<template>
  <v-app>
    <v-navigation-drawer>
      <v-list v-for="(item, index) in links" :key="index">
        <v-list-tile :to="item.link">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
      ]
    }
  }
}
</script>
</script>
