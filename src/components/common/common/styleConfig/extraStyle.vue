<template>
  <el-form size="small" label-width="100px">
    <el-form-item label="选择样式">
      <el-select v-model="selectList" multiple @change="selectChange">
        <el-option
          v-for="item in getAllStyle"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-collapse v-if="Object.keys(pageInfo.currentComponent.extraStyle[className].styleDec).length > 0">
      <el-collapse-item
        v-for="key in styleGroup"
        :key="key"
        :title="pageInfo.currentComponent.extraStyle[className].styleDec[key].label"
      >
        <el-form-item
          v-for="item in Object.keys(pageInfo.currentComponent.extraStyle[className].styleDec[key].style)"
          :key="item"
          :label="pageInfo.currentComponent.extraStyle[className].styleDec[key].style[item].label"
        >
          <div class="more-container">
            <middle
              :comIs="pageInfo.currentComponent.extraStyle[className].styleDec[key].style[item].component"
              :options="getComOption(className, item, pageInfo.currentComponent.extraStyle[className].styleDec[key].style[item].options || {})"
              v-model="pageInfo.currentComponent.extraStyle[className].style[item]"
            >
              <template v-if="pageInfo.currentComponent.extraStyle[className].styleDec[key].style[item].options && pageInfo.currentComponent.extraStyle[className].styleDec[key].style[item].options.data">
                <el-option
                  v-for="item in pageInfo.currentComponent.extraStyle[className].styleDec[key].style[item].options.data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </template>
            </middle>
            <i class="el-icon-question" @click="editDynamic('extra', item)"></i>
          </div>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import allStyle from '@/utils/editor/style/index'
import Middle from '@/components/common/common/styleConfig/middle.vue'

@Component({
  components: {
    Middle
  }
})
export default class ExtraStyle extends Vue {
  @Getter('pageInfo') pageInfo: any
  @Prop() className!: string
  selectList: Array<any> = []

  @Watch('pageInfo.currentComponent')
  handleChange (val: any): void {
    if (val) {
      this.selectList = Object.keys(val.config.styleDec)
    }
  }

  get styleGroup (): Array<any> {
    return Object.keys(this.pageInfo.currentComponent.extraStyle[this.className].styleDec)
  }

  getComOption (cla: string, key: string, options: any): any {
    if (this.pageInfo.currentComponent.extraStyle[cla].styleData[key] && this.pageInfo.currentComponent.extraStyle[cla].styleData[key].enabled) {
      return { ...options, disabled: true }
    }
    return options
  }

  selectChange (valList: Array<string>): void {
    const exitList = Object.keys(this.pageInfo.currentComponent.extraStyle[this.className].styleDec)
    valList.forEach((item: string) => {
      if (exitList.indexOf(item) === -1) {
        this.pageInfo.currentComponent.extraStyle[this.className].style = { ...this.pageInfo.currentComponent.extraStyle[this.className].style, ...JSON.parse(JSON.stringify(allStyle[item + 'Style'])) }
        this.pageInfo.currentComponent.extraStyle[this.className].styleDec = {
          ...this.pageInfo.currentComponent.extraStyle[this.className].styleDec,
          [item]: JSON.parse(JSON.stringify(allStyle[item]))
        }
      }
    })
    exitList.forEach((key: string) => {
      const extra = this.pageInfo.currentComponent.extraStyle
      if (valList.indexOf(key) === -1) {
        Object.keys(extra[this.className].styleDec[key]).forEach((item: string) => {
          Vue.delete(extra[this.className].style, item)
        })
        Vue.delete(extra[this.className].styleDec, key)
        extra[this.className].style = { ...extra[this.className].style }
        extra[this.className].styleDec = { ...extra[this.className].styleDec }
      }
    })
  }

  get getAllStyle (): Array<any> {
    return Object.keys(allStyle).filter((item: string) => {
      return !/Style$/.test(item)
    }).map((item: any) => {
      return allStyle[item]
    })
  }

  upChange (val: boolean, key: string): void {
    this.$emit('upChange', val, key, this.className)
  }

  editDynamic (type: string, key: string): void {
    this.$emit('editDynamic', type, key, this.className)
  }
}
</script>

<style scoped lang="scss">

</style>
