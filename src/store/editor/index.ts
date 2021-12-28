import actions from './action.ts'
import mutations from './mutation.ts'
import getters from './getters.ts'

const state = {
    pageInfo: {},
    searchEl: false,
    className: '',
    nodes: {},// 事件流程 和 数据处理 的所有节点 结构为 id : {cfg: {}, node: {}} cfg 为节点的配置信息与G6无关 node 为g6 节点信息 id 为添加节点的随机id
    curNode: null, // 事件流程 和 数据处理 的当前节点,
    graph: null,// 流程图对象
}

export default {
    state,
    getters,
    mutations,
    actions
}
