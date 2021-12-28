<template>
  <el-card>
    <div slot="header" style="text-align: center">数据处理</div>
    <el-form size="small" label-width="60px">
      <el-form-item label="旧值"><el-input :value="getValue" :disabled="true"></el-input></el-form-item>
      <new-data :info="info" v-bind="$attrs"></new-data>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import NewData from '@/components/common/common/actionConfig/newData.vue'

@Component({
  components: {
    NewData
  }
})
export default class ExtraStyleResolve extends Vue {
  @Prop() info!: any
  @Getter('currentPage') currentPage: any

  get getValue (): string {
    if (!this.info.class) return ''
    return this.currentPage.components[this.info.id].extraStyle.filter((item: any) => {
      return item.class === this.info.class
    })[0].style[this.info.key]
  }
}
</script>

<style scoped>

</style>
