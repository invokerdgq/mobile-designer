<template>
  <div>
    <el-row
        v-if="info"
        :gutter="10"
        v-for="(item, index) in info.eCfg || []"
    >
      <el-col :span="9"><el-input v-model="item.from" placeholder="键"></el-input></el-col>
      <el-col :span="3">-></el-col>
      <el-col :span="9"><el-input v-model="item.to" placeholder="新值"></el-input></el-col>
      <el-icon :span="3" name="delete" @click.native="deleteItem(index)"></el-icon>
    </el-row>
    <el-icon name="plus" @click.native="addItem"></el-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ObjectChangeValue extends Vue {
  @Prop() info!: any

  addItem () {
    this.info.eCfg.push({ from: '', to: '' })
  }

  deleteItem (index: number) {
    this.info.eCfg.splice(index, 1)
  }
}
</script>

<style scoped>

</style>
