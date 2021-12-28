<template>
 <el-card>
   <template slot="header">
     <span>{{info ? info.cfg.nodeName : '' }}</span><span style="margin-left: 15px">类型 ：{{info ? info.cfg.nodeType[2] : ''}}</span>
     <el-button size="small" type="primary" @click="deleteNode(info.node.id)" style="float: right">删除节点</el-button>
   </template>
   <el-row :gutter="10" v-if="info && info.cfg.pNum > 1">
     <el-col :span="6">作用参数</el-col>
     <el-col :span="15">
       <el-select v-model="info.cfg.pIdx">
         <el-option
             v-for="item in info.cfg.pNum"
             :label="`第${item}个参数`"
             :key="item-1"
             :value="item-1"
         ></el-option>
       </el-select>
     </el-col>
     <el-col :span="3">
       <el-tooltip content="对于多个入参的处理节点 选中的参数作为被处理对象 其余参数作为常量 通过输入${PARAMS-1} (数字代表第几个参数) 引用">
         <el-icon name="question"></el-icon>
       </el-tooltip>
     </el-col>
   </el-row>
   <component
       :is="curCom"
       :info="curNode.cfg"
   ></component>
 </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import MathAdd from '@/components/common/common/dataNode/nodesConfig/math/mathAdd.vue'
import MathAverage from '@/components/common/common/dataNode/nodesConfig/math/mathAverage.vue'
import MathDivide from '@/components/common/common/dataNode/nodesConfig/math/mathDivide.vue'
import MathMultiply from '@/components/common/common/dataNode/nodesConfig/math/mathMultiply.vue'
import MathResidue from '@/components/common/common/dataNode/nodesConfig/math/mathResidue.vue'
import MathSubtract from '@/components/common/common/dataNode/nodesConfig/math/mathSubtract.vue'
import StaticBoolean from '@/components/common/common/dataNode/nodesConfig/static/staticBoolean.vue'
import StaticNumber from '@/components/common/common/dataNode/nodesConfig/static/staticNumber.vue'
import StaticString from '@/components/common/common/dataNode/nodesConfig/static/staticString.vue'
import TransformToBoolean from '@/components/common/common/dataNode/nodesConfig/transform/transformToBoolean.vue'
import TransformToNumber from '@/components/common/common/dataNode/nodesConfig/transform/transformToNumber.vue'
import TransformToString from '@/components/common/common/dataNode/nodesConfig/transform/transformToString.vue'
import ObjectKeyToArray from '@/components/common/common/dataNode/nodesConfig/object/objectKeyToArray.vue'
import ObjectAddKey from '@/components/common/common/dataNode/nodesConfig/object/objectAddKey.vue'
import ObjectChangeKey from '@/components/common/common/dataNode/nodesConfig/object/objectChangeKey.vue'
import ObjectChangeValue from '@/components/common/common/dataNode/nodesConfig/object/objectChangeValue.vue'
import ObjectDeleteKey from '@/components/common/common/dataNode/nodesConfig/object/objectDeleteKey.vue'
import ObjectGetValue from '@/components/common/common/dataNode/nodesConfig/object/objectGetValue.vue'
import ObjectValueToArray from '@/components/common/common/dataNode/nodesConfig/object/objectValueToArray.vue'
import ArrayConcat from '@/components/common/common/dataNode/nodesConfig/array/arrayConcat.vue'
import ArrayFilter from '@/components/common/common/dataNode/nodesConfig/array/arrayFilter.vue'
import ArrayFind from '@/components/common/common/dataNode/nodesConfig/array/arrayFind.vue'
import ArrayLoop from '@/components/common/common/dataNode/nodesConfig/array/arrayLoop.vue'
import LogicJudge from '@/components/common/common/dataNode/nodesConfig/logic/logicJudge.vue'
import LogicSwitchMap from '@/components/common/common/dataNode/nodesConfig/logic/logicSwitchMap.vue'

@Component({
  components: {
    MathAdd,
    MathAverage,
    MathDivide,
    MathResidue,
    MathMultiply,
    MathSubtract,
    StaticNumber,
    StaticString,
    StaticBoolean,
    TransformToString,
    TransformToNumber,
    TransformToBoolean,
    ObjectKeyToArray,
    ObjectAddKey,
    ObjectChangeKey,
    ObjectChangeValue,
    ObjectDeleteKey,
    ObjectGetValue,
    ObjectValueToArray,
    ArrayConcat,
    ArrayFilter,
    ArrayFind,
    ArrayLoop,
    LogicJudge,
    LogicSwitchMap
  }
})
export default class NodeConfig extends Vue {
  @Prop() info!: any
  @Getter('curNode') curNode!: any

  deleteNode (id: string) {
    this.$emit('deleteNode', id)
  }

  get curCom () {
    if (!this.info || !this.info.cfg.nodeType) return ''
    if (typeof this.info.cfg.nodeType === 'string') return this.info.cfg.nodeType
    return this.info.cfg.nodeType[1] + '-' + this.info.cfg.nodeType[2]
  }
}
</script>

<style scoped>

</style>
