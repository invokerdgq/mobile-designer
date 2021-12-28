import { editorBus } from '@/utils/area/event/bus'

function withResize (comClass: any) {
    let pro = comClass.prototype
    let type = ''
    let borderIndex = -1
    let cornerIndex = -1

    pro.handleMoveMouseDown = function (this: any, e: any) {
    }

    pro.handleMoveMouseMove = function (this: any, e: any) {
        this.pageInfo.setComponentPosition(e.movementX, e.movementY)
    }

    pro.handleMoveMouseUp = function () {
    }

    pro.handleResizeMouseDown = function (this: any, e: any) {
    }

    pro.handleResizeMouseMove = function (this: any, type: string, e: any, index: number) {
        if (type === 'resize') {
            /* 连线中心 点是从 左线开始顺时针排序 */
            switch (Number(index)) {
                case 0:
                    this.pageInfo.setComponentPosition(e.movementX, 0)
                    this.pageInfo.setComponentSize(-e.movementX, 0)
                    break
                case 1:
                    this.pageInfo.setComponentPosition(0, e.movementY)
                    this.pageInfo.setComponentSize(0, -e.movementY)
                    break
                case 2:
                    this.pageInfo.setComponentPosition(0, 0)
                    this.pageInfo.setComponentSize(e.movementX, 0)
                    break
                default :
                    this.pageInfo.setComponentPosition(0, 0)
                    this.pageInfo.setComponentSize(0, e.movementY)
            }
        } else {
            /* 角落上的点是从 左上点开始顺时针排序 */
            switch (Number(index)) {
                case 0:
                    this.pageInfo.setComponentPosition(e.movementX, e.movementY)
                    this.pageInfo.setComponentSize(-e.movementX, -e.movementY)
                    break
                case 1:
                    this.pageInfo.setComponentPosition(0, e.movementY)
                    this.pageInfo.setComponentSize(e.movementX, -e.movementY)
                    break
                case 2:
                    this.pageInfo.setComponentPosition(0, 0)
                    this.pageInfo.setComponentSize(e.movementX, e.movementY)
                    break
                default :
                    this.pageInfo.setComponentPosition(e.movementX, 0)
                    this.pageInfo.setComponentSize(-e.movementX, e.movementY)
            }
        }
    }

    pro.handleResizeMouseUp = function () {
    }

    pro.handlePageMouseDown = function (this: any, e: any) {
        const target = e.target
        if (/^comId-/.test(target.classList[0])) {
            type = 'move'
            this.handleMoveMouseDown(e)
        } else if (/^hover-border-/.test(target.classList[0])) {
            type = 'resize'
            borderIndex = target.classList[0].split('-')[2]
            this.handleResizeMouseDown(e)
        } else if (/^hover-corner-/.test(target.classList[0])) {
            type = 'resizeAll'
            cornerIndex = target.classList[0].split('-')[2]
            this.handleResizeMouseDown(e)
        }
        if (type && type === 'move') { // 配置插槽时 元素后面 ::after 会被去掉 无法判断额 target
            this.handleMoveMouseDown(e)
        }

    }

    pro.handlePageMouseMove = function (this: any, e: any) {
        if (type === 'move') {
            this.handleMoveMouseMove(e)
        } else if (type === 'resize') {
            this.handleResizeMouseMove(type, e, borderIndex)
        } else if (type === 'resizeAll') {
            this.handleResizeMouseMove(type, e, cornerIndex)
        }
    }

    pro.handlePageMouseUp = function (this: any, e: any) {
        if (type) {
            editorBus.$emit('POI_CHANGE_STOP')
        }
        type = ''
        cornerIndex = -1
        borderIndex = -1
    }

    pro.setType = function (this: any, type1: string) {
        type = type1
    }
}

export default withResize
