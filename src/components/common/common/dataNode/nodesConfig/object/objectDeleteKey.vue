<template>
  <div>
    <el-row
        v-if="info"
        :gutter="10"
        v-for="(item, index) in info.eCfg || []"
    >
      <el-col :span="21"><el-input :value="item" @input="changeValue(index, $event)" placeholder="键"></el-input></el-col>
      <el-icon :span="3" name="delete" @click.native="deleteItem(index)"></el-icon>
    </el-row>
    <el-icon name="plus" @click.native="addItem"></el-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ObjectDeleteKey extends Vue {
  @Prop() info!: any

  addItem () {
    this.info.eCfg.push('')
  }

  deleteItem (index: number) {
    this.info.eCfg.splice(index, 1)
  }

  changeValue (index: number, val: string) {
    this.info.eCfg[index] = val
    this.info.eCfg = [...this.info.eCfg]
  }
}
</script>

<style scoped>

</style>
