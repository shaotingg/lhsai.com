<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-flex xs12>
        <table class="table" fluid>
          <thead>
            <tr>
              <th class="text-lg-left">#</th>
              <th class="text-lg-center">日期</th>
              <th class="text-lg-left">标题</th>
              <th>图片</th>
              <th class="text-lg-left">摘要</th>
              <th class="text-lg-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in css" :key="index">
              <td>
                <v-checkbox :id="'check-'+index" :value='item' v-model="checkbox"></v-checkbox>
              </td>
              <td class="text-lg-center">{{item.date}}</td>
              <td class="text-lg-left">{{item.title}}</td>
              <td>{{item.image}}</td>
              <td class="text-lg-left">{{item.excerpt}}</td>
              <td class="text-lg-center">
                <nuxt-link to="/admin/css/add"><v-btn color="info">添加</v-btn></nuxt-link>
                <nuxt-link :to="`/admin/css/${item.id}`"><v-btn color="primary">修改</v-btn></nuxt-link>
                <v-btn color="error">删除</v-btn>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-xs-center">
          <v-pagination
            v-model="page"
            :length="6"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="stylus">
.table
  width: 100%
</style>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      checkbox: [],
      page: 1,
      css: [],
      pageCount: 1
    }
  },
  mounted() {
    this.$axios.get(`/api/css`).then((res)=>{
      this.css = res.data.css
      this.pageCount = res.data.pageCount
    })
  }
}
</script>
