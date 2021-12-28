import G6 from '@antv/g6'

G6.registerNode('custom-event-node', {
    afterDraw (this: any, cfg: any, group: any) {
        const size = this.getSize(cfg)
        const anchorPoints = this.getAnchorPoints(cfg)
        anchorPoints.forEach((item: any, index: number) => {
            if (index === anchorPoints.length  -1) {
                group.addShape('circle', {
                    attrs: {
                        r: 4,
                        x: size[0] / 2 ,
                        y: -size[1] / 2 + size[1] * item[1],
                        fill: 'red',
                        stroke: 'red'
                    },
                    anchorPointIdx: index,
                    draggable: true,
                    name: 'params-out'
                })
            } else {
                group.addShape('circle', {
                    attrs: {
                        r: 4,
                        x: -size[0] / 2 + size[0] * item[0],
                        y: -size[1] / 2 + size[1] * item[1],
                        fill: 'red',
                        stroke: 'red'
                    },
                    anchorPointIdx: index,
                    draggable: true,
                    name: 'params-in'
                })
            }
        })
    }
}, 'rect')

function generateEventNode (params: number, config: any): any {
    const arc = Array.from({ length: params }).map((item: any, index: number) => {
        return [0, (1 / (params + 1)) * (index + 1)]
    })
    arc.push([1, 0.5])
    return {
        type: 'custom-event-node',
        size: [150, 70],
        style: {
            radius: 8
        },
        x: config.x,
        y: config.y,
        anchorPoints: arc,
        label: '事件流节点',
        labelCfg: {
            fill: '#215bbe'
        }
    }
}

export default generateEventNode
