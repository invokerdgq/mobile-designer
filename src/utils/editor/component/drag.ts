import { v4 as uuidv4 } from 'uuid'

function comDragstart (this: any, com: any, e: any): void {
  const id = uuidv4()
  const comInfo = JSON.parse(JSON.stringify(com))
  comInfo.id = id
  comInfo.parentId = ''
  comInfo.config.class[`comId_class_${id}`] = true
  comInfo.desc = comInfo.label + id.slice(0, 4)
  e.dataTransfer.setData('text', JSON.stringify(comInfo))
}

function comDragend (e: any): void {
  console.log('dragend-->>')
}

export default {
  methods: {
    comDragend,
    comDragstart,
    uuidv4
  }
}
