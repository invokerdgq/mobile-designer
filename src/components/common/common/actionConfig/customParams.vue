<template>
  <el-cascader
    :value="value"
    :collapse-tags="true"
    @change="paramsChange"
    :props="{ multiple: true }"
    :options="options"
    clearable></el-cascader>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import DatasetHelper from '@/utils/area/dataset/datasetHelper'

@Component({})
export default class CustomParams extends Mixins(DatasetHelper) {
  @Prop({ default: () => [] }) value: any
  @Prop({ default: false }) hasEvent!: boolean
  @Getter('pageInfo') pageInfo!: any

  paramsChange (value: any): void {
    this.$emit('input', JSON.parse(JSON.stringify(value)))
  }

  get eventParams (): Array<any> {
    if (!this.hasEvent) return []
    const params = this.pageInfo.currentComponent.config[`${this.$attrs.eventType}Dec`][this.$attrs.eventName].params || {}
    const child = Object.keys(params).map((key) => {
      return { value: key, label: params[key] }
    })
    child.push({ label: '列表索引', value: 'LIST_INDEX' })
    return child
  }

  get pageParams (): Array<any> {
    const globalParams = Object.keys(this.pageInfo.global).map((key) => {
      return { label: key, value: key }
    })
    const style = Object.keys(this.pageInfo.config.styleDec || {}).map((gKey) => {
      const children = Object.keys(this.pageInfo.config.styleDec[gKey].style).map((key) => {
        return { label: this.pageInfo.config.styleDec[gKey].style[key].label, value: key }
      })
      return { label: this.pageInfo.config.styleDec[gKey].label, value: gKey, children }
    })
    return [
      {
        label: '全局变量',
        value: 'global',
        children: globalParams
      },
      {
        label: '样式',
        value: 'style',
        children: style
      }
    ]
  }

  getPropsChildren (dec: any): Array<any> {
    return Object.keys(dec).map((key) => {
      return { label: dec[key].label, value: key }
    })
  }

  getExtraStyleChildren (extra: any): Array<any> {
    return Object.keys(extra).map((cla: string) => {
      const children = this.getStyleChildren(extra[cla].styleDec)
      return { label: extra[cla].label, value: cla, children }
    })
  }

  getStyleChildren (styleDec: any): Array<any> {
    return Object.keys(styleDec).map((gKey) => {
      const children = Object.keys(styleDec[gKey].style).map((key) => {
        return { label: styleDec[gKey].style[key].label, value: key }
      })
      return { label: styleDec[gKey].label, value: gKey, children }
    })
  }

  getListCom (id: string): Array<any> {
    const list = []
    let com = this.pageInfo.components[id]
    while (com.parentId) {
      com = this.pageInfo.components[com.parentId]
      if (com.childDec.default.hasListMode && com.childDec.default.listMode) {
        list.push({ value: com.id, label: com.desc })
      }
    }
    return list
  }

  get comParams (): Array<any> {
    // 分为组件 是否处于某个列表中
    return Object.keys(this.pageInfo.components).map((key: string) => {
      const com = this.pageInfo.components[key]
      const list = this.getListCom(com.id).reverse()
      const child = typeof com.child === 'string' ? { label: '插槽文字', value: 'child' } : null
      const props = {
        label: '组件入参',
        value: 'props',
        children: this.getPropsChildren(com.config.propsDec)
      }
      const style = {
        label: '组件样式',
        value: 'style',
        children: this.getStyleChildren(com.config.styleDec)
      }
      const extra = {
        label: '额外样式',
        value: 'extraStyle',
        children: this.getExtraStyleChildren(com.extraStyle)
      }
      if (list.length !== 0 && key === this.pageInfo.currentComponent.id) {
        const LIST_INDEX = {
          label: '列表索引',
          value: 'LIST_INDEX',
          children: this.getListCom(key),
          disabled: key !== this.pageInfo.currentComponent.id
        }
        const children: any = [props, style, extra, LIST_INDEX]
        if (child) children.push(child)
        return { label: this.pageInfo.components[key].desc, value: key, children }
      } else if (list.length !== 0 && key !== this.pageInfo.currentComponent.id) {
        const children: any = [props, style, extra]
        if (child) children.push(child)
        return { label: this.pageInfo.components[key].desc, value: key, children: [this.getListIndexChildren(list, children)] }
      }
      const children: any = [props, style, extra]
      if (child) children.push(child)
      return { label: this.pageInfo.components[key].desc, value: key, children }
    })
  }

  getListIndexChildren (this: any, list: Array<any>, cC: any) {
    if (list.length === 0) {
      return cC
    }
    const data = this.getTrueDataset(this.pageInfo.components[list[0].value])
    const children =  data[data.type].source.map((sc: any, index: number) => {
      const child = this.getListIndexChildren(list.slice(1), cC)
      return {
        label: `第${index + 1}项`,
        value: index,
        children: Array.isArray(child) ? child : [child]
      }
    })
    return {
      label: this.pageInfo.components[list[0].value].desc,
      value: list[0].value,
      children
    }
  }

  get options (): any {
    if (this.hasEvent) {
      return [
        {
          value: 'event',
          label: '事件参数',
          children: this.eventParams
        },
        {
          value: 'components',
          label: '组件数据',
          children: this.comParams
        },
        {
          value: 'page',
          label: '页面数据',
          children: this.pageParams
        }
      ]
    }
    return [
      {
        value: 'components',
        label: '组件数据',
        children: this.comParams
      },
      {
        value: 'page',
        label: '页面数据',
        children: this.pageParams
      }
    ]
  }
}
</script>

<style scoped>

</style>
