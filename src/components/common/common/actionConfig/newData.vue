<template>
  <el-card>
    <div slot="header">新值设置</div>
    <el-form label-width="80px" size="mini" ref="form">
      <el-form-item label="新值来源">
        <el-select v-model="info.resolve.source">
          <el-option
            v-for="item in getOptions('source')"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新值" v-if="info.resolve.source === 'static' && (info.paramsType === 'props' || info.paramsType === 'style')">
        <component :is="currentPage.components[info.id].config.propsDec[info.key].component"
                   v-if="currentPage.components[info.id].config.propsDec[info.key].component && !currentPage.components[info.id].config.propsDec[info.key].dynamic"
                   :type="currentPage.components[info.id].config.propsDec[info.key].type"
                   :disabled="currentPage.components[info.id].config.propsDec[info.key].disabled"
                   v-model="info.resolve.value"
        >
          <template v-if="currentPage.components[info.id].config.propsDec[info.key].data">
            <el-option
              v-for="item in currentPage.components[info.id].config.propsDec[info.key].data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </template>
        </component>
      </el-form-item>
      <el-form-item label="新值" v-if="info.resolve.source === 'static' && info.paramsType === 'child'">
        <el-input v-model="info.resolve.value"></el-input>
      </el-form-item>
      <el-form-item label="新值" v-if="info.resolve.source === 'static' && info.paramsType === 'extraStyle'">
        <el-input v-model="info.resolve.value"></el-input>
      </el-form-item>
      <el-form-item label="新值绑定参数" v-if="info.resolve.source === 'event'">
        <el-select v-model="info.resolve.eKey">
          <el-option
            v-for="pKey in eventParams"
            :key="pKey"
            :value="pKey"
            :label="pKey"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自定义设置" v-if="info.resolve.source === 'custom'"><el-button @click.native="showCustom = true">编辑</el-button></el-form-item>
    </el-form>
    <!-- 自定义参数对话框 -->
    <el-dialog
      :visible.sync="showCustom"
      width="80%"
      title="脚本设置"
      class="my-dialog"
    >
      <el-form label-width="120px" size="small">
        <el-form-item label="自定义入参">
          <custom-params v-model="info.new.params" :has-event="true"></custom-params>
        </el-form-item>
        <el-form-item label="代码编辑">
          <code-editor :info="info"></code-editor>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="plain" @click="showCustom = false; info.resolve.script = script">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import withOptions from '@/utils/editor/options/selectOptions'
import { Getter } from 'vuex-class'
import CodeEditor from '@/components/common/common/codeEditor/codeEditor.vue'
import CustomParams from './customParams.vue'

@Component({
  components: {
    CodeEditor,
    CustomParams
  }
})
@withOptions
export default class NewData extends Vue {
  @Prop() info!: any
  @Getter('currentPage') currentPage!: any
  showCustom = false
  script = '/**\n' +
   '* invoker-dgq. 2021\n' +
   '* 脚本包含参数\n' +
   '* evt: 事件参数 未选则为 null\n' +
   '* page: 页面参数 未选则为 null\n' +
   '* widgets: 组件id数组 未选则为[]\n' +
   '**/'

  paramsChange (value: Array<any>): void {
    this.info.new.custom.params = value
  }

  confirm (): void {
    console.log(';;;')
  }
}
</script>

<style scoped lang="scss">
.my-dialog /deep/ .el-dialog {
  margin-top: 3vh !important;
}
</style>
