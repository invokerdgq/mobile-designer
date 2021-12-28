<template>
  <el-dialog
    :visible="value"
    width="100%"
    style="height: 100vh;"
    title="脚本设置"
    class="my-dialog"
    @close="$emit('input', false)"
  >
    <el-form label-width="120px" size="small" style="height: 100%;display:flex;flex-direction: column" class="my-form">
      <div style="display: flex">
        <el-form-item label="自定义入参">
          <custom-params v-model="customConfig.params" style="width: 450px"></custom-params>
        </el-form-item>
        <el-form-item label="编辑模式">
          <el-radio-group v-model="customConfig.type">
            <el-radio label="script">脚本模式</el-radio>
            <el-radio label="node">节点流程模式</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item label="代码编辑" v-show="customConfig.type === 'script'">
        <code-editor v-model="customConfig.script" :pre-content="preScript"></code-editor>
      </el-form-item>
      <el-form-item label=数据处理流程 v-show="customConfig.type === 'node'" style="flex: 1">
        <data-resolve-view ref="dataResolve" :params="customConfig.params" style="height: 100%"></data-resolve-view>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="plain" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import CodeEditor from '@/components/common/common/codeEditor/codeEditor.vue'
import { Getter } from 'vuex-class'
import CustomParams from '@/components/common/common/actionConfig/customParams.vue'
import DataResolveView from '@/components/common/common/dataNode/dataResolveView.vue'
import generateFc from '@/components/common/common/dataNode/nodes/nodesToFuction'

@Component({
  components: {
    CodeEditor,
    CustomParams,
    DataResolveView
  }
})
export default class CustomScript extends Vue {
  @Getter('pageInfo') pageInfo: any
  @Getter('graph') graph: any
  @Getter('nodes') nodes: any
  @Prop({ default: false }) value!: boolean
  @Prop({ default: () => {} }) info!: any
  @Prop({
    default: '/**\n' +
      '* invoker-dgq. 2021\n' +
      '* 脚本包含参数\n' +
      'arg0, arg1... 后面的索引按照入参的上下顺序\n' +
      '**/'
  }) preScript!: string

  customConfig: any = {
    params: [],
    type: 'script',
    script: '',
    nodeConfig: {}
  }

  @Watch('preScript', { immediate: true })
  handleChange (val: any): void {
    this.customConfig.script = val
  }

  @Watch('value')
  handleValueChange (val: boolean): void {
    if (val) {
      const config = JSON.parse(JSON.stringify(this.info))
      if (config.params) this.customConfig.params = config.params
      if (config.type) this.customConfig.type = config.type
      if (config.script) this.customConfig.script = config.script
      if (config.nodeConfig) this.customConfig.nodeConfig = config.nodeConfig
    }
  }

  get options (): any {
    const comOptions = Object.keys(this.pageInfo.components).map((key: string) => {
      return { label: this.pageInfo.components[key].label + key, value: key }
    })
    return [
      {
        value: 'event',
        label: '事件参数'
      },
      {
        value: 'components',
        label: '组件数据',
        children: comOptions
      },
      {
        value: 'page',
        label: '页面数据'
      }
    ]
  }

  confirm (): void {
    const config = this.graph.save()
    console.log(config)
    debugger
    const param = {
      nodes: config.nodes,
      edges: config.edges,
      nodesDetail: Object.keys(this.nodes).map((id: string) => {
        return this.nodes[id]
      })
    }
    const result = generateFc(param)
    this.$emit('done', this.customConfig)
    this.$emit('input', false)
    this.customConfig = {
      params: [],
      type: 'script',
      script: this.preScript,
      nodeConfig: {}
    }
  }

  cancel (): void {
    this.$emit('input', false)
    this.customConfig = {
      params: [],
      type: 'script',
      script: this.preScript,
      nodeConfig: {}
    }
  }
}
</script>

<style scoped>
.my-dialog /deep/ .el-dialog {
  margin-top: 0!important;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.my-dialog /deep/ .el-dialog__body {
 flex: 1
}
.my-form /deep/ .el-form-item__content{
  height: 100%;
}
</style>
