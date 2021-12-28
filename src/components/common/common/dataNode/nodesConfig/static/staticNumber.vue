<template>
  <el-row :gutter="10">
    <el-col :span="6">静态值</el-col>
    <el-col :span="18">
      <el-input-number v-model="info.eCfg.value"></el-input-number>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({})
export default class StaticNumber extends Vue {
  @Prop() info!: any
}
</script>

<style scoped>

</style>
