<template>
  <el-form label-width="100px">
    <el-form-item label="组件库选择">
      <el-select v-model="componentType">
        <el-option
          v-for="item in componentTypeList"
          :key="item.key"
          :value="item.key"
          :label="item.key + `(${item.platform})`"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-collapse>
      <el-collapse-item
        v-for="(group, index) in componentList"
        :key="index"
        :title="group.label"
      >
        <div class="group-container">
          <component-item
            v-for="com in group.components"
            :key="com.name"
            :info="com"
            style="width: 100px;height: 125px"
            @dragstart.native="comDragstart(com, $event)"
            @dragend.native="comDragend"
          ></component-item>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import componentConfig from '@/components/common/widgets/index'
import ComponentItem from '@/components/common/common/navConfig/componentItem.vue'
import DragMethods from '@/utils/editor/component/drag'
import { Getter } from 'vuex-class'

@Component({
  components: {
    ComponentItem
  },
  mixins: [DragMethods]
})
export default class ComponentNav extends Vue {
  @Getter('pageInfo') pageInfo: any
  componentType = 'Base'

  get componentTypeList (): Array<any> {
    return Object.keys(componentConfig).map((key: string) => {
      return {...componentConfig[key], key}
    })
  }

  get componentList (): any {
    return Object.keys(componentConfig[this.componentType].com).map((key: string) => {
      return componentConfig[this.componentType].com[key]
    })
  }
}
</script>

<style scoped lang="scss">
.group-container{
  display: flex;
}
</style>
