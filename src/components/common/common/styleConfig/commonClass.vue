<template>
  <el-form label-width="100px">
    <el-form-item
        v-for="item in classList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    >
      <el-switch v-model="classObject[item.value]"></el-switch>
      <el-icon name="delete" @click.native="deleteClass(item.value)"></el-icon>
    </el-form-item>
    <div style="display: flex">
      <el-input v-model="newClass"></el-input>
      <el-button type="primary" size="small" @click="addClass" style="margin-left: 30px">添加类名</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class CommonClass extends Vue {
  @Prop() classObject!: any
  newClass = ''

  get classList (): Array<any> {
    return Object.keys(this.classObject).filter((key: string) => {
      return !/^comId/.test(key)
    }).map((key1) => {
      return {
        value: key1,
        label: key1
      }
    })
  }

  addClass () {
    this.$set(this.classObject, this.newClass, false)
    this.newClass = ''
  }

  deleteClass (key: string) {
    this.$delete(this.classObject, key)
  }
}
</script>

<style scoped>

</style>
