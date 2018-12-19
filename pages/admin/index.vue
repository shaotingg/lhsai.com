<template>
  <v-container fluid class="add">
    <v-layout align-center justify-center row>
      <v-flex xs12>
        <v-form v-model="valid">
        <v-text-field
          v-model="admin.title"
          label="Title"
          required
        ></v-text-field>
        <v-select
          :items="items"
          label="Category"
          class="select"
          v-model="item"
        ></v-select>
        <div id="main" class="edit">
          <mavon-editor v-model="admin.value"/>
        </div>
      </v-form>
      <div class="text-xs-center"><v-btn color="primary" :disabled="active" @click="saveContent">Add</v-btn></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style lang="stylus">
.add
  .select
    position: relative
    z-index: 3
  .edit
    position: relative
    z-index: 1
</style>
<script>
  export default {
    layout: 'admin',
    data () {
      return {
        valid: false,
        active: false,
        admin: {
          title: '',
          value: ''
        },
        items: ['css', 'frontend'],
        item: ''
      }
    },
    methods: {
      saveContent(){
        this.active = true
        const date = new Date()
        this.$axios.post(`/api/admin/add`, {
          category: this.item,
          adminer: {
            title: this.admin.title,
            date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            image: this.admin.value.match(/<img.*?(?:>|\/>)/gi) ? this.admin.value.match(/<img.*?(?:>|\/>)/gi)[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1] : null,
            excerpt: '',
            content: this.admin.value
          }
        }).then((res)=>{
          this.active = false
        })
      }
    }
  }
</script>
