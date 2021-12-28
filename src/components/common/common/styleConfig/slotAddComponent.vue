<template>
  <div>
    <div v-if="slotKey !== 'default' && !currentComponent.childDec[slotKey].multi">
      <el-form-item label="添加组件">
        <el-select v-model="addComponentId">
          <el-option
            v-for="com in componentList"
            :key="com.id"
            :value="com.id"
            :label="`${com.label}-${com.id}`"
          ></el-option>
        </el-select>
        <el-icon class="el-icon-plus" @click.native="addComponentSlot(slotKey)"></el-icon>
      </el-form-item>
    </div>
    <div v-else>
      <div style="display: flex; align-items: center">
        <el-form-item label="开启列表模式" v-if="currentComponent.childDec[slotKey].hasListMode" label-width="140px">
          <el-switch v-model="currentComponent.childDec[slotKey].listMode" @change="listModeChange"></el-switch>
        </el-form-item>
        <el-form-item label="添加辅助组件" v-show="currentComponent.childDec.default.prefixCom" label-width="140px">
          <el-switch v-model="addWithMiddle"></el-switch>
        </el-form-item>
      </div>
      <el-button type="primary" size="small" @click="addComponentSlot(slotKey, true)">直接添加辅助组件</el-button>
      <el-form-item
        label="组件名称"
        v-for="(item, index) in currentComponent.child[slotKey]"
        :key="item"
      >
        <div class="flex-container">
          <el-input :value="allComponent[item].label" disabled></el-input>
          <el-icon class="el-icon-delete" @click.native="deleteComponentSlot(slotKey, item, index)"></el-icon>
        </div>
      </el-form-item>
      <el-form-item label="添加组件">
        <div class="flex-container">
          <el-select v-model="addComponentId">
            <el-option
              v-for="com in componentList"
              :key="com.id"
              :value="com.id"
              :label="`${com.desc}`"
            ></el-option>
          </el-select>
          <el-icon class="el-icon-plus" @click.native="addComponentSlot(slotKey)"></el-icon>
        </div>
      </el-form-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class SlotAddComponent extends Vue {
  @Prop() componentList!: Array<any>
  @Prop() currentComponent: any
  @Prop() slotKey!: string
  @Prop() allComponent!: Array<any>
  addComponentId = ''
  addWithMiddle = true

  @Watch('currentComponent', { immediate: true })
  handleChange (val: any): void {
    if (this.slotKey !== 'default' && val.child[this.slotKey]) {
      this.addComponentId = val.child[this.slotKey].id
    }
  }

  addComponentSlot (key: string, onlyMiddle: boolean = false): void {
    this.$emit('addComponentSlot', { key, id: this.addComponentId, addWithMiddle: this.addWithMiddle, onlyMiddle })
    this.addComponentId = ''
  }

  deleteComponentSlot (key: string, id: string, index: number): void {
    this.$emit('deleteComponentSlot', { key, id, index })
  }

  listModeChange (val: boolean): void {
    // 当列表模式切换时 会将当前组件的 默认插槽内的组件清空 将子组件的slot 与 parentId 清空
    this.$emit('listModeChange')
  }
}
</script>

<style scoped lang="scss">
.flex-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  [class^=el-icon] {
    margin-left: auto;
  }
}
</style>
