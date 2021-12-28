<template>
  <div id="mountNode"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import G6 from '@antv/g6'

@Component({})
export default class Index extends Vue {
  mounted () {
    const items: any = [
      {
        type: 'desc',
        desc: '操作组件'
      },
      {
        type: 'config',
        desc: '流程配置'
      }
    ]
    let sourceAnchorIdx, targetAnchorIdx
    const menu = new G6.Menu({
      offsetX: 6,
      offsetX: 10,
      itemTypes: ['node'],
      getContent (e: any, graph: any): any {
        const outDiv = document.createElement('div');
        outDiv.style.width = '180px';
        outDiv.innerHTML = '<div>\n' + items.map((item) => {
          return `<p key="${item.type}">${item.desc}`
        }).join('\n') + '</div>'
        return outDiv
      },
      handleMenuClick (target, item, graph) {
        console.log(target, item, graph)
      }
    })
    G6.registerNode('operation-node', {
      afterDraw(this: any, cfg: any, group: any) {
        const size = this.getSize(cfg)
        group.addShape('circle', {
          attrs: {
            r: 4,
            x: size[0] / 2,
            y: size[1] / 4,
            fill: 'red',
            stroke: 'red'
          },
          anchorPointIdx: 1,
          draggable: true,
          name: 'operation-fail'
        })
        group.addShape('circle', {
          attrs: {
            r: 4,
            x: -size[0] / 2,
            y: 0,
            fill: 'green',
            stroke: 'green'
          },
          draggable: true,
          anchorPointIdx: 2,
          name: 'operation-execute'
        })
        group.addShape('circle', {
          attrs: {
            r: 4,
            x: size[0] / 2,
            y: -size[1] / 4,
            fill: 'blue',
            stroke: 'blue'
          },
          draggable: true,
          anchorPointIdx: 0,
          name: 'operation-success'
        })
        group.addShape('text', {
          attrs: {
            fill: 'black',
            x: 0,
            y: 0
          }
        })
      }
    }, 'rect')
    G6.registerNode('data-transform-node', {}, 'rect')
    const data = {
      nodes: [
        {
          id: 'node1',
          type: 'operation-node',
          size: [150, 40],
          style: {
            radius: 8
          },
          x: 100,
          y: 100,
          anchorPoints: [
            [1, 0.25],
            [1, 0.75],
            [0, 0.5]
          ],
        },
        {
          id: 'node2',
          type: 'operation-node',
          size: [150, 40],
          style: {
            radius: 8
          },
          x: 400,
          y: 400,
          anchorPoints: [
            [1, 0.25],
            [1, 0.75],
            [0, 0.5]
          ],
        }
      ]
    }
    const graph = new G6.Graph({
      container: 'mountNode',
      width: 1300, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
      modes: {
        default: [
          {
            type: 'drag-node',
            trigger: 'drag',
            shouldBegin (e: any) {
              return /keyShape/.test(e.target.get('name'))
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
              return !/keyShape/.test(target.get('name'))
            },
            shouldEnd (e: any): boolean {
              targetAnchorIdx = e.target.get('anchorPointIdx')
              const target = e.target
              return !/keyShape/.test(target.get('name'))
            }
          }
        ]
      },
      plugins: [menu]
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
