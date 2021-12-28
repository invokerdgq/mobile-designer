<template>
  <el-collapse>
    <el-collapse-item title="全局变量"></el-collapse-item>
    <el-collapse-item title="数据集配置"></el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class PageDataConfig extends Vue {
  @Getter('pageInfo') pageInfo!: any
}
</script>

<style scoped lang="scss">

</style>
