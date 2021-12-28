<template>
  <el-form :mode="addForm" label-width="100px">
    <el-form-item label="节点名称">
      <el-input v-model="addForm.nodeName"></el-input>
    </el-form-item>
    <el-form-item label="节点类型">
      <el-cascader :options="typeList" v-model="addForm.type" ref="cas" @change="nodeTypeChange"></el-cascader>
    </el-form-item>
    <el-form-item label="节点入参个数" v-show="curNode && curNode.multiParams">
      <el-input-number size="small" :min="1" :max="8" v-model="addForm.params"></el-input-number>
    </el-form-item>
    <el-button @click="addNode" type="primary">添加节点</el-button>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component({})
export default class NodeAdd extends Vue {
  @Getter('nodes') nodes!: any
  @Prop() onlyData!: boolean
  curNode: any = null
  addForm: any = {
    nodeName: '',
    type: 'data',
    params: 1
  }

  dataNode = {
    label: '数据处理节点',
    value: 'data',
    children: [
      {
        label: '运算',
        value: 'math',
        children: [
          {
            label: '加',
            value: 'add',
            multiParams: true
          },
          {
            label: '减',
            value: 'subtract',
            multiParams: true
          },
          {
            label: '乘',
            value: 'multiply',
            multiParams: true
          },
          {
            label: '除',
            value: 'divide',
            multiParams: true
          },
          {
            label: '取余',
            value: 'residue'
          },
          {
            label: '取平均',
            value: 'average',
            multiParams: true
          }
        ]
      },
      {
        label: '逻辑',
        value: 'logic',
        children: [
          {
            label: '映射',
            value: 'switch-map',
            multiParams: true
          },
          {
            label: '判断',
            value: 'judge',
            multiParams: true,
            outParams: 2
          }
        ]
      },
      {
        label: '变换',
        value: 'transform',
        children: [
          {
            label: '转布尔',
            value: 'to-boolean'
          },
          {
            label: '转数字',
            value: 'to-number'
          },
          {
            label: '转字符串',
            value: 'to-string'
          }
        ]
      },
      {
        label: '对象',
        value: 'object',
        children: [
          {
            label: '添加键',
            value: 'add-key',
            multiParams: true
          },
          {
            label: '删除键',
            value: 'delete-key',
            multiParams: true
          },
          {
            label: '修改键',
            value: 'change-key',
            multiParams: true
          },
          {
            label: '修改值',
            value: 'change-value',
            multiParams: true
          },
          {
            label: '取键值',
            value: 'get-value',
            multiParams: true
          },
          {
            label: '转键值数组',
            value: 'key-to-array'
          },
          {
            label: '转值数组',
            value: 'value-to-array'
          }
        ]
      },
      {
        label: '数组',
        value: 'array',
        children: [
          {
            label: '循环',
            value: 'loop',
            middleParams: 2,
            multiParams: true
          },
          {
            label: '过滤',
            value: 'filter',
            middleParams: 2,
            multiParams: true
          },
          {
            label: '查找',
            value: 'find',
            middleParams: 2,
            multiParams: true
          },
          {
            label: '合并',
            value: 'concat',
            multiParams: true
          }
        ]
      },
      {
        label: '静态数据',
        value: 'static',
        children: [ // 可以加一些 额外的 比如 字体 颜色等
          {
            label: '数字',
            value: 'number',
            inParams: 0
          },
          {
            label: '字符',
            value: 'string',
            inParams: 0
          },
          {
            label: '布尔',
            value: 'boolean',
            inParams: 0
          }
        ]
      }
    ]
  }

  componentNode = {
    label: '组件处理节点',
    value: 'component'
  }

  commonEventNode = {
    label: '通用事件节点',
    common: 'common-event'
  }

  pageNode = {
    label: '页面处理节点',
    value: 'page'
  }

  addNode () {
    let arg = JSON.parse(JSON.stringify(this.addForm))
    if (this.curNode.middleParams) arg = { ...arg, middleParams: this.curNode.middleParams }
    if (this.curNode.outParams) arg = { ...arg, outParams: this.curNode.outParams }
    if (this.curNode.inParams !== undefined) arg = { ...arg, params: this.curNode.inParams }
    this.$emit('addNode', arg)
    this.addForm = {
      nodeName: '',
      type: '',
      params: 1,
    }
  }

  get typeList (): Array<any> {
    if (this.onlyData) {
      return [this.dataNode]
    }
    return [this.dataNode, this.componentNode, this.commonEventNode, this.pageNode]
  }

  nodeTypeChange () {
    this.curNode = (this.$refs.cas as any).getCheckedNodes()[0].data
  }

  get connectList ():Array<any> {
    return Object.keys(this.nodes).map((id: string) => {
      return {
        label: this.nodes[id].cfg.nodeName,
        value: id,
        disabled: this.nodes[id].cfg.nodeType !== 'event'
      }
    })
  }
}
</script>

<style scoped>

</style>
