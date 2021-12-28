<template>
  <div>
    <div> 作用参数（默认第一个）匹配左边的值 返回右边的值 </div>
    <el-row
        v-if="info"
        :gutter="10"
        v-for="(item, index) in getList"
        :key="index"
    >
      <el-col :span="9"><el-input v-model="item.from" placeholder="原值"></el-input></el-col>
      <el-col :span="3">-></el-col>
      <el-col :span="9"><el-input v-model="item.to" placeholder="映射值"></el-input></el-col>
      <el-icon :span="3" name="delete" @click.native="deleteItem(index)"></el-icon>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="9">皆不匹配</el-col>
      <el-col :span="3">-></el-col>
      <el-col :span="9"><el-input v-model="info.eCfg[0].to" placeholder="映射值"></el-input></el-col>
    </el-row>
    <el-icon name="plus" @click.native="addItem"></el-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class LogicSwitchMap extends Vue {
  @Prop() info!: any

  addItem () {
    this.info.eCfg = [{ from: '', to: ''}, ...this.info.eCfg]
  }

  get getList () {
    if (!this.info) return []
    return this.info.eCfg.slice(1)
  }

  deleteItem (index: number) {
    this.info.eCfg.splice(index, 1)
  }
}
</script>

<style scoped>

</style>
