<template>
  <div>
    <el-form label-width="80px">
    <el-collapse>
        <el-form-item label="查找元素"><el-switch :value="searchEl" @change="setSearchEl"/></el-form-item>
        <div v-if="searchEl">
          <el-dom></el-dom>
        </div>
      <div v-if="!searchEl">
        <el-form-item label="定位方式">
          <el-select v-model="pageInfo.currentComponent.position.position">
            <el-option
                v-for="item in getOptions('position')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组件描述"><el-input v-model="pageInfo.currentComponent.desc"></el-input></el-form-item>
        <el-collapse-item title="组件位置">
          <el-form label-width="120px" ref="poiRef" size="mini">
            <el-form-item label="组件X">
              <el-input-number
                  :step="1"
                  :min="pageInfo.currentComponent.parentId ? - 400: 0"
                  :max="designWidth - (pageInfo.currentComponent.config.style.width || 0)"
                  v-model="pageInfo.currentComponent.position.left"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="组件Y">
              <el-input-number
                  :step="1"
                  :min="pageInfo.currentComponent.parentId ? - 400: 0"
                  v-model="pageInfo.currentComponent.position.top"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="组件入参">
          <el-form label-width="120px" ref="propsRef" size="mini">
            <el-form-item
                v-for="pKey in Object.keys(pageInfo.currentComponent.config.props)"
                :key="pKey"
                :label="pageInfo.currentComponent.config.propsDec[pKey].label"
            >
              <div class="more-container">
                <middle
                    v-if="pageInfo.currentComponent.config.propsDec[pKey].component && !pageInfo.currentComponent.config.propsDec[pKey].dynamic"
                    :comIs="useCom(pageInfo.currentComponent.config.propsDec[pKey].component)"
                    :options="getComOption('props', pKey, pageInfo.currentComponent.config.propsDec[pKey].options || {})"
                    v-model="pageInfo.currentComponent.config.props[pKey]"
                    @change="propsChange($event, pKey)"
                >
                  <template v-if="pageInfo.currentComponent.config.propsDec[pKey].options && pageInfo.currentComponent.config.propsDec[pKey].options.data">
                    <el-option
                        v-for="item in pageInfo.currentComponent.config.propsDec[pKey].options.data"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </template>
                </middle>
                <i class="el-icon-question" @click="editDynamic('props', pKey)"></i>
              </div>
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="组件样式">
          <config-style
              ref="configStyle"
              v-if="pageInfo.currentComponent"
              :config="pageInfo.currentComponent.config"
              @upChange="upChange"
              @editDynamic="editDynamic"
          ></config-style>
        </el-collapse-item>
        <el-collapse-item title="组件类名">
          <common-class :class-object="pageInfo.currentComponent.config.class"></common-class>
        </el-collapse-item>
        <el-collapse-item title="额外样式">
          <el-button size="mini" type="primary" @click="addExtraStyleItem">增加类名</el-button>
          <el-collapse-item
              v-for="(item, index) in extraStyleList"
              :key="index"
              :title="item.label"
          >
            <extra-style
                :class-name="Object.keys(pageInfo.currentComponent.extraStyle)[index]"
                @editDynamic="editDynamic"
            ></extra-style>
            <el-icon name="delete" @click.native="deleteExtraItem(Object.keys(pageInfo.currentComponent.extraStyle)[index])"></el-icon>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="插槽设置" v-if="typeof pageInfo.currentComponent.child === 'object' && pageInfo.currentComponent.child !== null">
          <el-collapse-item
              v-for="key in Object.keys(pageInfo.currentComponent.child)"
              :title="pageInfo.currentComponent.childDec[key].label"
              :key="key"
          >
            <slot-add-component
                :current-component="pageInfo.currentComponent"
                :slot-key="key"
                :all-component="pageInfo.components"
                :component-list="componentList"
                @listModeChange="listModeChange"
                @addComponentSlot="addComponentSlot"
                @deleteComponentSlot="deleteComponentSlot"
            ></slot-add-component>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="插槽文字" v-if="typeof pageInfo.currentComponent.child === 'string'">
          <el-form-item label="文字内容">
            <el-input type="textarea"
                      v-model="pageInfo.currentComponent.child"
                      placeholder="请输入内容"
                      :disabled="pageInfo.currentComponent.childData && pageInfo.currentComponent.childData.enabled"
            ></el-input>
            <i class="el-icon-question" @click="editDynamic('child', '', 0)"></i>
          </el-form-item>
        </el-collapse-item>
      </div>
    </el-collapse>
    </el-form>
    <!-- 增加类名 -->
    <el-dialog
      width="40%"
      :visible.sync="showAddClass"
      title="增加类名"
    >
      <el-form label-width="120px">
        <el-form-item label="类名">
          <el-input v-model="addClassName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="classDec" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showAddClass = false; $message( {message: '已取消新增', showClose: true})">取消</el-button>
        <el-button type="primary" @click="addConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!--配置动态数据-->
    <el-dialog
      width="60%"
      :visible.sync="showDynamic"
      title="配置动态数据"
      @open="open"
    >
      <el-form label-width="120px" style="min-height: 300px" :model="dynamicData">
        <el-form-item label="开启动态配置">
          <el-switch v-model="dynamicData.enabled"></el-switch>
        </el-form-item>
        <el-form-item label="数据类型" v-show="dynamicData.enabled">
          <el-select v-model="dynamicData.type" @change="typeChange">
            <el-option
              v-for="item in dynamicType"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="绑定字段" v-if="dynamicData.enabled && dynamicData.type !== 'custom'">
          <el-select v-model="dynamicData.encode">
            <el-option
              v-for="item in dynamicEncode"
              :value="item.name"
              :key="item.name"
              :label="item.alias"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义设置" v-show="dynamicData.enabled && dynamicData.type === 'custom'"><el-button @click="showScript = true" type="primary" size="small">编辑</el-button></el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelDynamic">取消</el-button>
        <el-button @click="removeDynamic" type="danger">移除</el-button>
        <el-button type="primary" @click="dynamicConfirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 自定义脚本 -->
    <custom-script v-model="showScript" @done="configDone" :info="dynamicData.custom"></custom-script>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import withOptions from '@/utils/editor/options/selectOptions.ts'
import FontStyle from '@/components/common/common/styleConfig/fontStyle.vue'
import slotAddComponent from '@/components/common/common/styleConfig/slotAddComponent.vue'
import middleCom from '@/components/common/widgets/middleCom.ts'
import { v4 as uuidv4 } from 'uuid'
import CustomScript from '@/components/common/common/actionConfig/customScript.vue'
import ConfigStyle from '@/components/common/common/styleConfig/configStyle.vue'
import ExtraStyle from '@/components/common/common/styleConfig/extraStyle.vue'
import Middle from '@/components/common/common/styleConfig/middle.vue'
import ElDom from '@/views/editor/setConfig/component/elDom.vue'
import CommonClass from '@/components/common/common/styleConfig/commonClass.vue'

@Component({
  components: {
    FontStyle,
    slotAddComponent,
    CustomScript,
    ConfigStyle,
    ExtraStyle,
    Middle,
    ElDom,
    CommonClass
  }
})
@withOptions
export default class ComponentStyleConfig extends Vue {
  @Getter('searchEl') searchEl: any
  @Getter('className') className: any
  @Action('setSearchEl') setSearchEl: any
  @Getter('pageInfo') pageInfo: any
  addClassName = ''
  showScript = false
  classDec = ''
  showAddClass = false
  designWidth = 600
  showDynamic = false
  dynamicType = [
    {
      label: '全局变量',
      value: 'global'
    },
    {
      label: '数据集字段',
      value: 'dataset'
    },
    {
      label: '自定义',
      value: 'custom'
    }
  ]

  dynamicConfig: any = {
    type: '',
    index: -1,
    key: ''
  }

  dynamicData: any = {
    enabled: false,
    type: '',
    encode: '',
    custom: {}
  }

  @Watch('pageInfo.currentComponent', { immediate: true })
  handleChange (val: any): void {
    if (val) {
      const list = Object.keys(val.config.styleDec).filter((key: string) => {
        return key !== 'Wh'
      })
      this.$nextTick(() => {
        (this.$refs.configStyle as any).setInitList(list)
      })
    }
  }

  propsChange (val: any, key: string) {
    if (this.pageInfo.currentComponent.config.propsDec[key].init) {
      const target = this.pageInfo.currentComponent.config.propsDec[key].init.target
      this.pageInfo.currentComponent.config.propsS[target] = this.pageInfo.currentComponent.config.propsDec[key].init.use[this.pageInfo.currentComponent.config.props[key]]
    }
  }

  useCom (dec: any): string {
    if (typeof dec === 'string') {
      return dec
    }
    return dec.use[this.pageInfo.currentComponent.config.props[dec.key]]
  }

  typeChange (): void {
    // this.dynamicData.encode = ''
  }

  getComOption (type: string, key: string, options: any): any {
    let ops = { ...options }
    if (typeof this.pageInfo.currentComponent.config.propsDec[key].component !== 'string') {
      Object.keys(ops).forEach((sKey: string) => {
        ops[sKey] = ops[sKey][this.pageInfo.currentComponent.config.props[this.pageInfo.currentComponent.config.propsDec[key].component.key]]
      })
      ops.SPECIAL_KEY = key
    } else if (this.pageInfo.currentComponent.config.propsS && this.pageInfo.currentComponent.config.propsS[key]) {
      ops.SPECIAL_KEY = key
    }
    if (this.pageInfo.currentComponent.config[`${type}Data`][key] && this.pageInfo.currentComponent.config[`${type}Data`][key].enabled) {
      ops = { ...options, disabled: true }
    }
    return ops
  }

  configDone (config: any): void {
    this.dynamicData.custom = JSON.parse(JSON.stringify(config))
  }

  upChange (val: boolean, key: string): void {
    if (val) {
      this.pageInfo.currentComponent.config.styleUp = {
        ...this.pageInfo.currentComponent.config.styleUp,
        [key]: true
      }
    } else {
      Vue.delete(this.pageInfo.currentComponent.config.styleUp, key)
      this.pageInfo.currentComponent.config.styleUp = {
        ...this.pageInfo.currentComponent.config.styleUp
      }
    }
  }

  get extraStyleList (): Array<any> {
    return Object.keys(this.pageInfo.currentComponent.extraStyle).map((key: string) => {
      return this.pageInfo.currentComponent.extraStyle[key]
    })
  }

  get dynamicEncode (): Array<any> {
    if (this.dynamicData.type === 'global') {
      return Object.keys(this.pageInfo.global).map((item: string) => {
        return {
          name: item,
          alias: item
        }
      })
    } else {
      if (this.pageInfo.currentComponent.dataset.type === 'extend') {
        const id = this.pageInfo.currentComponent.dataset.extend.id
        return this.pageInfo.components[id].dataset[this.pageInfo.components[id].dataset.type].dimensionsAlias
      }
      return this.pageInfo.currentComponent.dataset[this.pageInfo.currentComponent.dataset.type].dimensionsAlias
    }
  }

  removeDynamic (): void {
    this.$confirm('确定移除动态设置', '提示', {
      confirmButtonText: '确认移除',
      cancelButtonText: '取消移除'
    }).then(() => {
      const com = this.pageInfo.currentComponent
      switch (this.dynamicConfig.type) {
        case 'props':
          if (com.config.propsData[this.dynamicConfig.key]) Vue.delete(com.config.propsData, this.dynamicConfig.key)
          break
        case 'style':
          if (com.config.styleData[this.dynamicConfig.key]) Vue.delete(com.config.styleData, this.dynamicConfig.key)
          break
        case 'extra':
          if (com.config.extraStyle[this.dynamicConfig.class].styleData[this.dynamicConfig.key]) Vue.delete(com.config.extraStyle[this.dynamicConfig.class].styleData, this.dynamicConfig.key)
          break
        default :
      }
      this.$message({
        type: 'success',
        message: '移除成功'
      })
      this.showDynamic = false
    }).catch(() => {
      this.$message('已取消移除')
    })
  }

  cancelDynamic (): void {
    this.showDynamic = false
    this.dynamicData = {
      enabled: false,
      type: '',
      encode: '',
      custom: {}
    }
  }

  open (): void {
    const com = this.pageInfo.currentComponent
    switch (this.dynamicConfig.type) {
      case 'props':
        if (com.config.propsData[this.dynamicConfig.key]) this.dynamicData = JSON.parse(JSON.stringify(com.config.propsData[this.dynamicConfig.key]))
        break
      case 'style':
        if (com.config.styleData[this.dynamicConfig.key]) this.dynamicData = JSON.parse(JSON.stringify(com.config.styleData[this.dynamicConfig.key]))
        break
      case 'extraStyle':
        if (com.config.extraStyle[this.dynamicConfig.class].styleData[this.dynamicConfig.key]) this.dynamicData = JSON.parse(JSON.stringify(com.config.extraStyle[this.dynamicConfig.class].styleData[this.dynamicConfig.key]))
        break
      default :
        if (typeof com.child === 'string') this.dynamicData = JSON.parse(JSON.stringify(com.childData))
    }
  }

  dynamicConfirm (): void {
    const com = this.pageInfo.currentComponent
    switch (this.dynamicConfig.type) {
      case 'props':
        com.config.propsData[this.dynamicConfig.key] = JSON.parse(JSON.stringify(this.dynamicData))
        com.config.propsData = { ...com.config.propsData }
        break
      case 'style':
        com.config.styleData[this.dynamicConfig.key] = JSON.parse(JSON.stringify(this.dynamicData))
        com.config.styleData = { ...com.config.styleData }
        break
      case 'extra':
        com.extraStyle[this.dynamicConfig.class].styleData[this.dynamicConfig.key] = JSON.parse(JSON.stringify(this.dynamicData))
        com.extraStyle[this.dynamicConfig.class].styleData = { ...com.extraStyle[this.dynamicConfig.class].styleData }
        break
      default :
        com.childData = JSON.parse(JSON.stringify(this.dynamicData))
    }
    this.showDynamic = false
    this.dynamicData = {
      enabled: false,
      type: '',
      encode: '',
      custom: {}
    }
  }

  mounted (): void {
    this.designWidth = (document.querySelectorAll('uni-page')[0] as HTMLElement).offsetWidth
  }

  editDynamic (type: string, key?: string|null, cla: any = null, up = false): void {
    this.dynamicConfig.type = type
    this.dynamicConfig.key = key as string
    this.dynamicConfig.class = cla
    if (up) this.dynamicConfig.up = up
    this.showDynamic = true
  }

  addExtraStyleItem (): void {
    this.addClassName = ''
    this.classDec = ''
    this.showAddClass = true
  }

  deleteExtraItem (cla: string): void {
    Vue.delete(this.pageInfo.currentComponent.extraStyle, cla)
    this.pageInfo.currentComponent.extraStyle = { ...this.pageInfo.currentComponent.extraStyle }
  }

  addConfirm (): void {
    this.pageInfo.addComponentExtraStyle(this.addClassName, {
      label: this.classDec,
      style: {},
      styleDec: {},
      styleData: {}
    })
    this.showAddClass = false
  }

  get componentList (): Array<any> {
    return Object.keys(this.pageInfo.components).map((key: string) => {
      return this.pageInfo.components[key]
    }).filter((com: any) => {
      return (com.id !== this.pageInfo.currentComponent.id) && (!com.parentId) && (com.id !== this.pageInfo.currentComponent.parentId)
    })
  }

  listModeChange (): void {
    /* 列表模式切换时 需要全部置空 */
    const curCom = this.pageInfo.currentComponent
    curCom.child[curCom.childDec.default.alias || 'default'].forEach((id: string) => {
      if (this.pageInfo.components[id].isMiddle) {
        this.pageInfo.components[id].child[this.pageInfo.components[id].childDec.default.alias || 'default'].forEach((cid: string) => {
          this.pageInfo.components[cid].parentId = ''
          Vue.delete(this.pageInfo.components[cid].config, 'slot')
          this.pageInfo.components[cid].config = { ...this.pageInfo.components[cid].config }
        })
        Vue.delete(this.pageInfo.components, id)
        this.pageInfo.components = { ...this.pageInfo.components }
      } else {
        Vue.delete(this.pageInfo.components[id].config, 'slot')
        this.pageInfo.components[id].config = { ...this.pageInfo.components[id].config }
        this.pageInfo.components[id].parentId = ''
      }
    })
    curCom.child[curCom.childDec.default.alias || 'default'] = []
  }

  addComponentSlot (data: { key: string, id: string, addWithMiddle: boolean, onlyMiddle: boolean }): void{
    const com = this.pageInfo.components[data.id]
    com.parentId = this.pageInfo.currentComponent.id
    com.config.slot = data.key
    if (data.key === 'default' || this.pageInfo.currentComponent.childDec[data.key].multi) {
      /* 默认插槽 采用绝对定位 */
      com.position.position = 'absolute'
      com.position.left = 0
      com.position.top = 0
      /* 中间会加一层组件的情况  例如 u-form 加上 u-form-item */
      const prefix = this.pageInfo.currentComponent.childDec.default.prefixCom
      if (prefix && data.addWithMiddle) {
        if (this.pageInfo.currentComponent.childDec.default.hasListMode && this.pageInfo.currentComponent.childDec.default.listMode && this.pageInfo.currentComponent.child.default.length > 0) {
          const comHelper = this.pageInfo.components[this.pageInfo.currentComponent.child.default[0]]
          const defaultAlias = comHelper.childDec.default.alias || 'default'
          com.config.slot = defaultAlias
          if (comHelper.childDec[defaultAlias].position) {
            /* 对于有单独配置的 定位方式以配置上的 优先级更高 */
            com.position.position = comHelper.childDec[defaultAlias].position
          }
          com.parentId = comHelper.id
          comHelper.child[defaultAlias].push(com.id)
        } else {
          const comHelper = JSON.parse(JSON.stringify((middleCom as any)[this.pageInfo.currentComponent.childDec.default.prefixCom]))
          comHelper.id = uuidv4()
          comHelper.parentId = this.pageInfo.currentComponent.id
          comHelper.desc = comHelper.label + comHelper.id
          comHelper.config.class[`comId_class_${comHelper.id}`] = true
          comHelper.dataset.type = 'extend'
          comHelper.dataset.extend.id = this.pageInfo.currentComponent.id
          if (prefix === 'view') {
            comHelper.isMiddle = true
            comHelper.childDec.default.position = 'absolute'
          }
          const defaultAlias = comHelper.childDec.default.alias || 'default'
          com.config.slot = defaultAlias
          if (comHelper.childDec[defaultAlias].position) {
            /* 对于有单独配置的 定位方式以配置上的 优先级更高 */
            com.position.position = comHelper.childDec[defaultAlias].position
          }
          com.parentId = comHelper.id
          comHelper.child[defaultAlias].push(com.id)
          if (this.pageInfo.currentComponent.childDec[data.key].position) {
            /* 对于有单独配置的 定位方式以配置上的 优先级更高 */
            comHelper.position.position = this.pageInfo.currentComponent.childDec[data.key].position
          }
          this.pageInfo.addComponent(comHelper)
          this.pageInfo.currentComponent.child[data.key].push(comHelper.id)
          this.pageInfo.currentComponent.child[data.key] = [...this.pageInfo.currentComponent.child[data.key]]
        }
      } else {
        if (this.pageInfo.currentComponent.childDec[data.key].position) {
          /* 对于有单独配置的 定位方式以配置上的 优先级更高 */
          com.position.position = this.pageInfo.currentComponent.childDec[data.key].position
        }
        this.pageInfo.currentComponent.child[data.key].push(com.id)
        this.pageInfo.currentComponent.child[data.key] = [...this.pageInfo.currentComponent.child[data.key]]
      }
    } else {
      /* 具名插槽 采用相对定位 */
      com.position.position = 'relative'
      com.position.left = 0
      com.position.top = 0
      if (this.pageInfo.currentComponent.child[data.key]) {
        this.pageInfo.components[this.pageInfo.currentComponent.child[data.key]].config.slot = ''
        this.pageInfo.components[this.pageInfo.currentComponent.child[data.key]].parentId = ''
      }
      this.pageInfo.currentComponent.child[data.key] = com.id
    }
  }

  deleteComponentSlot (data: any): void {
    this.pageInfo.components[data.id].parentId = null
    if (data.key === 'default') {
      this.pageInfo.currentComponent.child[data.key].splice(data.index, 1)
      this.pageInfo.currentComponent.child[data.key] = [...this.pageInfo.currentComponent.child[data.key]]
    } else {
      this.pageInfo.currentComponent.child[data.key] = null
    }
  }
}
</script>

<style scoped lang="scss">
.el-icon-question{
  margin-left: auto;
}
.more-container{
  display: flex;
  align-items: center;
}
</style>
