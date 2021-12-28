export default {
  setPageInfo(context: any, payload: any) {
    context.commit('setPageInfo', payload)
  },
  setClassName (context: any, payload: string) {
    context.commit('setClassName', payload)
  },
  setSearchEl (context: any, payload: boolean) {
    context.commit('setSearchEl', payload)
  },
  setCurNode(context: any, id: string) {
    context.commit('setCurNode', id)
  },
  addNode (context: any, payload: any) {
    context.commit('addNode', payload)
  },
  deleteNode (context: any, id: string) {
    context.commit('deleteNode', id)
  },
  setGraph (context: any, payload: any) {
    context.commit('setGraph', payload)
  }
}
