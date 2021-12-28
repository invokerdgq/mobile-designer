<template>
  <el-form size="mini" label-width="80px">
    <el-form-item label="作用对象">
      <el-select v-model="formData.target">
        <el-option
          v-for="item in getOptions('target')"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <template v-if="formData.target === 'page'">
    </template>
    <template v-else-if="formData.target === 'component'">
      <el-form-item label="选择组件">
        <el-select v-model="formData.id">
          <el-option
            v-for="item in componentList"
            :key="item.id"
            :value="item.id"
            :label="item.desc"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作用类型" v-if="formData.id">
        <el-select v-model="formData.type" @change="resetKey">
          <el-option
            v-for="item in getOptions('paramsType')"
            :key="item.value"
            :disabled="(item.value === 'child' && (!formData.id && typeof pageInfo.components[formData.id].child !== 'string'))"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.type === 'extraStyle'" label="选择类名">
        <el-select v-model="formData.class">
          <el-option
            v-for="item in pageInfo.components[formData.id].extraStyle"
            :value="item.class"
            :key="item.class"
            :label="item.classDec.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择键值" v-if="formData.type !== 'child' && formData.type !== 'methods' && formData.id">
        <el-select v-model="formData.key">
          <el-option
            v-for="key in getKeyList()"
            :key="key.value"
            :value="key.value"
            :label="key.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <component
        v-bind="$attrs"
        v-if="formData.type"
        :is="`${formData.type + '-resolve'}`"
        :info="formData"
      ></component>
    </template>
    <template v-else-if="formData.target === 'common'">
      <el-form-item label="选择通用事件"></el-form-item>
    </template>
    <template v-else></template>
    <div v-if="!info"><el-button @click.native="addConfirm">添加事件</el-button></div>
    <div v-else><el-button @click.native="deleteConfirm">删除事件</el-button></div>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import withOptions from '@/utils/editor/options/selectOptions'
import { Getter } from 'vuex-class'
import PropsResolve from '@/components/common/common/actionConfig/propsResolve.vue'
import StyleResolve from '@/components/common/common/actionConfig/styleResolve.vue'
import ChildResolve from '@/components/common/common/actionConfig/childResolve.vue'
import ExtraStyleResolve from '@/components/common/common/actionConfig/extraStyleResolve.vue'
import DatasetResolve from '@/components/common/common/actionConfig/datasetResolve.vue'
import MethodsResolve from '@/components/common/common/actionConfig/methodsResolve.vue'

@Component({
  components: {
    PropsResolve,
    StyleResolve,
    ChildResolve,
    ExtraStyleResolve,
    DatasetResolve,
    MethodsResolve
  }
})
@withOptions
export default class AddEvent extends Vue {
  @Prop() info!: any
  @Getter('pageInfo') pageInfo: any
  formData: any = {
    target: '',
    id: '',
    type: '',
    key: '',
    class: '',
    new: {
      type: '', // static event custom,
      key: '',
      custom: {
        params: [],
        script: ''
      },
      value: ''
    }
  }

  created (): void {
    if (this.info) {
      this.formData = this.info
    }
  }

  resetKey (): void {
    this.formData.key = ''
    this.formData.class = ''
    this.formData.new = {
      type: '', // static event custom,
      key: '',
      custom: {
        params: [],
        script: ''
      },
      value: ''
    }
  }

  addConfirm (): void {
    this.$emit('add-event', this.formData)
    this.formData = {
      target: '',
      id: '',
      type: '',
      key: '',
      class: '',
      new: {}
    }
  }

  deleteConfirm (): void {
    this.$emit('delete-event')
  }

  get componentList (): Array<any> {
    return Object.keys(this.pageInfo.components).map((key: string) => {
      return this.pageInfo.components[key]
    })
  }

  getKeyList (): Array<any> {
    const com = this.pageInfo.components[this.formData.id]
    let index = -1
    switch (this.formData.type) {
      case 'props':
        return Object.keys(com.config.propsDec).map((item: string) => {
          return { value: item, label: com.config.propsDec[item].label }
        })
      case 'style':
        return Object.keys(com.config.style).map((item: string) => {
          return { value: item, label: item }
        })
      case 'extraStyle':
        if (com.extraStyle.length === 0 && !this.formData.class) return []
        index = com.extraStyle.findIndex((item: any) => {
          return item.class === this.formData.class
        })
        if (index > -1) {
          return Object.keys(com.extraStyle[index].style).map((item: string) => {
            return { value: item, label: item }
          })
        }
        return []
      default :
        return []
    }
  }
}
</script>

<style scoped>

</style>
