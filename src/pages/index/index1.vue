<template>
  <div>
    <p
        v-for="item in items"
        :key="item.type"
    >{{item.desc}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import G6 from '@antv/g6'
import img from '@/assets/logo.png'

@Component({})
export default class Index extends Vue {
  items: any = [
    {
      type: 'desc',
      desc: '操作组件'
    },
    {
      type: 'config',
      desc: '流程配置'
    }
  ]

  mounted () {
    const menu = new G6.Menu({
      offsetX: 6,
      offsetX: 10,
      itemTypes: ['node'],
      getContent (e: any, graph: any): any {
        const outDiv = document.createElement('div');
        outDiv.style.width = '180px';
        outDiv.innerHTML = `<ul>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
      </ul>`
        return outDiv
      },
      handleMenuClick (target, item, graph) {
        console.log(target, item, graph)
      }
    })
    G6.registerNode('custom', {
      afterDraw(this: any, cfg: any, group: any) {
        const size = this.getSize(cfg)
        group.addShape('text',{
          attrs: {
            text: '流程对象',
            x: -20,
            y: 5,
            fill: 'blue'
          },
          name: 'custom-operation'
        })
        group.addShape('circle',{
          attrs: {
            r: 10,
            x: size[0] / 2,
            y:  - size[1] / 4,
            fill: 'blue'
          },
          name: 'custom-success'
        })
        group.addShape('text',{
          attrs: {
            text: '成功',
            x: size[0] / 2 + 10,
            y:  - size[1] / 4,
            fill: 'blue'
          },
          name: 'custom-success-desc'
        })
        group.addShape('circle',{
          attrs: {
            r: 10,
            x: size[0] / 2,
            y: size[1] / 4,
            fill: 'red'
          },
          name: 'custom-fail'
        })
        group.addShape('text',{
          attrs: {
            text: '失败',
            x: size[0] / 2 + 10,
            y: size[1] / 4 + 10,
            fill: 'red'
          },
          name: 'custom-fail-desc'
        })
        group.addShape('circle',{
          attrs: {
            r: 10,
            x: -size[0] / 2,
            y: 0,
            fill: 'green'
          },
          name: 'custom-execute'
        })
        group.addShape('text',{
          attrs: {
            text: '执行',
            x: -size[0] / 2 - 30,
            y: -10,
            fill: 'green'
          },
          name: 'custom-execute-desc'
        })
      }
    }, 'rect')
    const data = {
      nodes: [
        {
          id: 'node1',
          type: 'custom',
          size: [100, 100],
          x: 100,
          y: 100,
          style: {
            stroke: '#4289e5',
            lineWidth: 2
          },
          stateStyles: {
            hover: {
              lineWidth: 8,
              'custom-operation': {
                fill: 'yellow'
              }
            }
          }
        }
      ]
    }

    const graph = new G6.Graph({
      container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 1300, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
      modes: {
        default: ['drag-node', 'click-select']
      },
      plugins: [menu]
    })
    graph.on('node:click', (e) => {
      console.log(e, 'kkkkk')
    })
    graph.on('node:mouseenter', (e: any) => {
      graph.setItemState(e.item, 'hover', true)
    })
    graph.on('node:mouseleave', (e: any) => {
      graph.setItemState(e.item, 'hover', false)
    })
    graph.read(data); // 读取 Step 2 中的数据源到图上
    // graph.render(); // 渲染图
  }
}
</script>
