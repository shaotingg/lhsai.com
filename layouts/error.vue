<template>
  <v-app>
    <v-container fill-height>
      <v-content>
        <h3 class="text-xs-center">页面不存在</h3>
      </v-content>
    </v-container>
  </v-app>
</template>
<script>
export default {
  layout: 'empty',
  head () {
    return {
      title: '404 Page Not Found!'
    }
  }
}
</script>
