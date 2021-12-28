<template>
    <el-form>
      <el-form-item label="组件结构">
        <el-tree
            :data="treeData"
            :props="{ label: 'nodeName', children: 'childNodes'}"
            node-key="className"
            :expand-on-click-node="false"
            @node-click="nodeClick"
        ></el-tree>
      </el-form-item>
      <el-form-item label="选中节点类名">
        <span> {{className.replace('SELECT_HOVER', '')}}</span>
        <el-button type="plain" size="small" @click="copyClass" style="margin-left: 10px" v-show="className">复制</el-button>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component({})
export default class ElDom extends Vue {
  @Getter('pageInfo') pageInfo!: any
  @Getter('className') className!: string
  @Action('setClassName') setClassName!: any

  treeData: any = []
  currentNode: any = null

  getNode (el: any): any {
    return {
      nodeName: el.nodeName.toLowerCase(),
      className: el.className,
      el: el,
      childNodes: el.childNodes.length === 0 ? [] : Array.from(el.childNodes).map((item: any) => {
        return this.getNode(item)
      })
    }
  }

  copyClass () {
    const cN = this.className.replaceAll(' ', '.')
    this.$copyText(cN).then(() => {
      this.$message({
        type: 'success',
        message: '复制成功',
        showClose: true
      })
    }, () => {
      this.$message({
        type: 'error',
        message: '复制失败,稍后重试',
        showClose: true
      })
    })
  }

  nodeClick (data: any, node: any) {
    if (this.currentNode) {
      this.currentNode.data.el && this.currentNode.data.el.classList && this.currentNode.data.el.classList.remove('SELECT_HOVER')
    }
    this.currentNode = node
    data.el.classList.add('SELECT_HOVER')
    this.setClassName(data.className)
  }

  mounted () {
    // 获取组件Dom 结构
    const el = document.getElementsByClassName(`comId_class_${this.pageInfo.currentComponent.id}`)[0]
    this.treeData = [{
      nodeName: '组件节点',
      className: 'root',
      childNodes: [this.getNode(el)]
    }]
  }
}
</script>

<style scoped>

</style>
