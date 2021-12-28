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
    <el-collapse v-if="Object.keys(config.styleDec).length > 0">
      <el-collapse-item
        v-for="key in styleGroup"
        :key="key"
        :title="config.styleDec[key].label"
      >
        <el-form-item
          v-for="item in Object.keys(config.styleDec[key].style)"
          :key="item"
          :label="config.styleDec[key].style[item].label"
        >
          <div class="more-container">
            <middle
              :comIs="config.styleDec[key].style[item].component"
              :options="getComOption('style', item, config.styleDec[key].style[item].options || {})"
              v-model="config.style[item]"
            >
              <template v-if="config.styleDec[key].style[item].options && config.styleDec[key].style[item].options.data">
                <el-option
                  v-for="item in config.styleDec[key].style[item].options.data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </template>
            </middle>
            <el-switch :value="!!config.styleUp[item]" @change="upChange($event, item)" v-if="!isPage"></el-switch>
            <i class="el-icon-question" @click="editDynamic('style', item)" v-if="!isPage"></i>
          </div>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import allStyle from '@/utils/editor/style/index'
import Middle from '@/components/common/common/styleConfig/middle.vue'

@Component({
  components: {
    Middle
  }
})
export default class ConfigStyle extends Vue {
  @Prop() config!: any
  @Prop({ default: false }) isPage!: boolean
  selectList: any = []
  allStyle: any = {}

  setInitList (list: Array<string>): void {
    this.selectList = list
  }

  getComOption (type: string, key: string, options: any): any {
    if (this.config[`${type}Data`] && this.config[`${type}Data`][key] && this.config[`${type}Data`][key].enabled) {
      return { ...options, disabled: true }
    }
    return options
  }

  get getAllStyle (): Array<any> {
    return Object.keys(allStyle).filter((item: string) => {
      return !/Style$/.test(item) && !/Wh/.test(item)
    }).map((item: any) => {
      return allStyle[item]
    })
  }

  get styleGroup (): Array<any> {
    return Object.keys(this.config.styleDec)
  }

  selectChange (valList: Array<string>): void {
    const exitList = Object.keys(this.config.styleDec)
    valList.forEach((item: string) => {
      if (exitList.indexOf(item) === -1) {
        this.config.style = { ...this.config.style, ...JSON.parse(JSON.stringify(allStyle[item + 'Style'])) }
        this.config.styleDec = {
          ...this.config.styleDec,
          [item]: JSON.parse(JSON.stringify(allStyle[item]))
        }
      }
    })
    exitList.forEach((key: string) => {
      if (valList.indexOf(key) === -1 && key !== 'Wh') {
        Object.keys(this.config.styleDec[key].style).forEach((item: string) => {
          Vue.delete(this.config.style, item)
        })
        Vue.delete(this.config.styleDec, key)
        this.config.style = { ...this.config.style }
        this.config.styleDec = { ...this.config.styleDec }
      }
    })
  }

  editDynamic (type: string, key: string): void {
    this.$emit('editDynamic', type, key)
  }

  upChange (value: boolean, key: string): void {
    this.$emit('upChange', value, key)
  }
}
</script>

<style scoped lang="scss">
.more-container{
  display: flex;
  align-items: center;
}
</style>
