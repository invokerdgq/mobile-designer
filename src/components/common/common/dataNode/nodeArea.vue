<template>
  <div id="node-canvas" class="node-canvas" style="min-width: 1400px;min-height: 700px"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import G6 from '@antv/g6'
import generateNode, { generateNodeCfg } from '@/components/common/common/dataNode/nodes'

@Component({})
export default class NodeArea extends Vue {
  @Prop({ default: null }) params!: any
  @Getter('pageInfo') pageInfo!: any
  @Action('setCurNode') setCurNode!: any
  @Action('addNode') addStoreNode!: any
  @Action('deleteNode') deleteStoreNode!: any
  @Action('setGraph') setGraph!: any
  graph: any = null

  @Watch('params')
  paramsChange (val: any, old: any) {
    if (val) {
      this.updateParamsNode(val, old)
    }
  }

  deleteNode (id: string) {
    this.graph.removeItem(id, false)
  }

  getGraphInfo () {
    console.log(this.graph.save(), '流程图数据--------------')
    return this.graph.save()
  }

  addNode (info: any) {
    this.addDataNode(info)
  }

  updateParamsNode (params: Array<any>, old: any = []): void {
    const data = this.graph.save()
    const ids = params.map((item: any) => {
      return item.join('-')
    })
    const paramsNode = this.getParamsNodes(params, old)
    data.nodes = data.nodes.filter((node: any) => {
      if (ids.indexOf(node.id) > -1) {
        this.graph.removeItem('node', node)
      }
      return ids.indexOf(node.id) === -1
    })
    data.nodes = [...paramsNode, ...data.nodes]
    this.graph.changeData(data, false)
  }

  addDataNode (info: any) {
    const node: any = generateNode({
      type: info.type[0],
      info
    })
    this.graph.addItem('node', node)
    this.addStoreNode({ id: node.id , cfg: generateNodeCfg('data', node, info), node})
  }

  getReturnNode () {
    const node: any = generateNode({
      type: 'return'
    })
    this.addStoreNode({
      id: node.id,
      cfg: generateNodeCfg('return', node, null),
      node
    })
    return node
  }

  getParamsNodes (params: Array<any>, old: any = null): Array<any> {
    if (old && old.length > 0) {
      old.forEach((item: any) => {
        this.deleteStoreNode(item.join('-'))
      })
    }
    return params.map((item: any, index: number) => {
      const node: any = generateNode({
        type: 'params',
        info: item,
        idx: index
      })
      this.addStoreNode({
        id: node.id ,
        cfg: generateNodeCfg('params', node, null),
        node
      })
      return node
    })
  }

  mounted () {
    let sourceAnchorIdx = -1
    let targetAnchorIdx = -1
    const data = {
      nodes: [...this.params ? this.getParamsNodes(this.params): [], this.getReturnNode()]
    }
    const graph = new G6.Graph({
      container: 'node-canvas',
      width: 1400, // Number，必须，图的宽度
      height: 700, // Number，必须，图的高度
      modes: {
        default: [
          {
            type: 'drag-node',
            trigger: 'drag',
            shouldBegin (e: any): boolean {
              const target = e.target
              return !/in|out/.test(target.get('name'))
            }
          },
          {
            type: 'create-edge',
            trigger: 'drag',
            edgeConfig: {
              type: 'quadratic',
              style: {
                stroke: '#f00',
                lineWidth: 2,
                endArrow: true,
              }
            },
            shouldBegin (e: any): boolean {
              sourceAnchorIdx = e.target.get('anchorPointIdx')
              const target = e.target
              return /in|out/.test(target.get('name'))
            },
            shouldEnd (e: any): boolean {
              targetAnchorIdx = e.target.get('anchorPointIdx')
              const target = e.target
              return /in/.test(target.get('name'))
            }
          }
        ]
      }
    })
    this.setGraph(graph)
    this.graph = graph
    graph.on('node:click', (ev) => {
      const shape = ev.target
      const node: any = ev.item
      this.setCurNode(node._cfg.id)
    })

    graph.on('click', (ev) => {
      const shape = ev.target
      const node = ev.item
      this.setCurNode(null)
    })

    graph.on('aftercreateedge', (e: any) => {
      graph.updateItem(e.edge, {
        sourceAnchor: sourceAnchorIdx,
        targetAnchor: targetAnchorIdx
      })
    })

    graph.on('afteradditem', e => {
      if (e.item && e.item.getType() === 'edge') {
        graph.updateItem(e.item, {
          sourceAnchor: sourceAnchorIdx
        });
      }
    })

    graph.read(data)
  }
}
</script>

<style scoped>

</style>
