import { options } from '@/utils/editor/options/selectOptions'

const PositionStyle = {
    position: 'relative',
    left: 0,
    top: 0
}

const PositionStyleDec = {
    position: {
        label: '定位方式',
        component: 'el-select',
        options: {
            data: JSON.parse(JSON.stringify(options.position))
        }
    },
    left: {
        label: 'x',
        component: 'el-input-number'
    },
    top: {
        label: 'y',
        component: 'el-input-number'
    }
}

const Position = {
    label: '定位',
    value: 'Position',
    style: PositionStyleDec
}

export default PositionStyle
export { Position }
