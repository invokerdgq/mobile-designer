import G6 from '@antv/g6'

G6.registerNode('custom-data-node', {
    afterDraw (this: any, cfg: any, group: any) {
        const size = this.getSize(cfg)
        const anchorPointsDec = cfg.anchorPointsDec
        const anchorPoints = this.getAnchorPoints(cfg)
        anchorPoints.forEach((item: any, index: number) => {
            group.addShape('circle', {
                attrs: {
                    r: 4,
                    x: -size[0] / 2 + size[0] * item[0],
                    y: -size[1] / 2 + size[1] * item[1],
                    fill: anchorPointsDec[index].fill,
                    stroke: anchorPointsDec[index].stroke
                },
                anchorPointIdx: index,
                draggable: true,
                name: anchorPointsDec[index].name // data-in  data-out 用来判断 点之间能否进行连线
            })
        })
    },
}, 'rect')

G6.registerNode('custom-params-node', {
    afterDraw (this: any, cfg: any, group: any) {
        const size = this.getSize(cfg)
        const anchorPointsDec = cfg.anchorPointsDec
        const anchorPoints = this.getAnchorPoints(cfg)
        anchorPoints.forEach((item: any, index: number) => {
            group.addShape('circle', {
                attrs: {
                    r: 4,
                    x: -size[0] / 2 + size[0] * item[0],
                    y: -size[1] / 2 + size[1] * item[1],
                    fill: anchorPointsDec[index].fill,
                    stroke: anchorPointsDec[index].stroke
                },
                anchorPointIdx: index,
                draggable: true,
                name: anchorPointsDec[index].name // data-in  data-out 用来判断 点之间能否进行连线
            })
        })
    },
}, 'rect')

G6.registerNode('custom-return-node', {
    afterDraw (this: any, cfg: any, group: any) {
        const size = this.getSize(cfg)
        const anchorPointsDec = cfg.anchorPointsDec
        const anchorPoints = this.getAnchorPoints(cfg)
        anchorPoints.forEach((item: any, index: number) => {
            group.addShape('circle', {
                attrs: {
                    r: 4,
                    x: -size[0] / 2 + size[0] * item[0],
                    y: -size[1] / 2 + size[1] * item[1],
                    fill: anchorPointsDec[index].fill,
                    stroke: anchorPointsDec[index].stroke
                },
                anchorPointIdx: index,
                draggable: true,
                name: anchorPointsDec[index].name // data-in  data-out 用来判断 点之间能否进行连线
            })
        })
    },
}, 'rect')
