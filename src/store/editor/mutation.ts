import Vue from 'vue'

export default {
  setPageInfo (state: any, payload: any) {
    Vue.observable(payload)
    state.pageInfo = payload
  },
  setClassName (state: any, payload: string) {
    state.className = payload
  },
  setSearchEl (state: any, payload: boolean): void {
    state.searchEl = payload
  },
  setCurNode (state: any, payload: string): void {
    state.curNode = state.nodes[payload]
  },
  addNode (state: any, payload: any): void {
    Vue.set(state.nodes, payload.id, {
      cfg: payload.cfg,
      node: payload.node
    })
  },
  deleteNode (state: any, id: string): void {
    Vue.delete(state.nodes, id)
  },
  setGraph (state: any, payload: any): void {
    state.graph = payload
  }
}
