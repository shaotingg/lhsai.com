<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="css"
          class="elevation-1 table"
        >
          <template slot="items" slot-scope="props">
            <td><v-checkbox class="checkbox" :id="'check-'+props.index" :value='props.item' v-model="checkbox"></v-checkbox></td>
            <td class="text-xs-left">{{ props.item.date }}</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.image }}</td>
            <td class="text-xs-center">{{ props.item.excerpt }}</td>
            <td class="text-xs-center">
              <nuxt-link :to="`/admin/css/${props.item.id}`"><v-btn color="primary">修改</v-btn></nuxt-link>
              <v-btn :disabled="active && currentidx == props.item.id" color="error" @click="del(props.item.id,index)">删除</v-btn>
            </td>
          </template>
          <template slot="footer">
            <td :colspan="headers.length">
              <v-checkbox class="checkbox" id="check-all" label="全选" v-model="checkboxall"></v-checkbox>
              <v-btn color="error">删除</v-btn>
              <nuxt-link to="/admin/css/add"><v-btn color="info">添加</v-btn></nuxt-link>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="stylus">
.table
  .checkbox
    .v-input__slot
      padding: 14px 0 0
      margin: 0
</style>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      checkbox: [],
      checkboxall: [],
      css: [],
      active: false,
      currentidx: '',
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: '#'
        },
        { text: '日期', value: '日期' },
        { text: '标题', value: '标题', sortable: false},
        { text: '图片', value: '图片', sortable: false},
        { text: '摘要', value: '摘要', sortable: false},
        { text: '操作', align: 'center',value: '操作', sortable: false}
      ],
    }
  },
  watch: {
    checkboxall: function(val) {
      if(val.length > 0){
        this.checkbox = this.css
      }else{
        this.checkbox = []
      }
    }
  },
  mounted() {
    this.$axios.get(`/api/css`).then((res)=>{
      this.css = res.data.css
      this.pageCount = res.data.pageCount
    })
  },
  methods: {
    async del(id,idx) {
      this.active = true
      this.currentidx = id
      await this.$axios.delete(`/api/css/${id}`).then((res)=>{
        if(res.data.success == true){
          this.active = false
          this.css.splice(idx, 1)
        }
      })
    }
  }
}
</script>
