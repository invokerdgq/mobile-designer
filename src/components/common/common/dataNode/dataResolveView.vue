<template>
  <div style="display: flex">
    <node-area :params="params" style="flex: 1" ref="nodeArea"></node-area>
    <node-add v-show="!curNode" :onlyData="onlyData" @addNode="addNode" style="width: 320px;flex:none"></node-add>
    <node-config v-if="curNode" :info="curNode" @deleteNode="deleteNode" style="width: 320px;flex:none"></node-config>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import NodeAdd from '@/components/common/common/dataNode/nodeAdd.vue'
import NodeArea from '@/components/common/common/dataNode/nodeArea.vue'
import NodeConfig from './nodeConfig.vue'
import { Getter, Action } from 'vuex-class'
import './nodes/index'

@Component({
  components: {
    NodeConfig,
    NodeAdd,
    NodeArea
  }
})
export default class DataResolveView extends Vue {
  @Getter('curNode') curNode!: any
  @Prop() params!: any
  @Prop({ default: true }) onlyData!: boolean
  @Getter('pageInfo') pageInfo!: any
  @Action('deleteNode') deleteStoreNode: any
  @Action('setCurNode') setCurNode!: any

  addNode (info: any): void {
    (this.$refs.nodeArea as any).addNode(info)
  }

  getGraphInfo () {
    return (this.$refs.nodeArea as any).getGraphInfo()
  }

  deleteNode (id: string) {
    this.deleteStoreNode(id);
    (this.$refs.nodeArea as any).deleteNode(id)
    this.setCurNode(null)
  }
}
</script>

<style scoped>

</style>
