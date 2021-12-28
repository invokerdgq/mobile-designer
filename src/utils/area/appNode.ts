const el = document.querySelectorAll('[data-name=uni-app]')[0] as HTMLElement

function resolveInitPoi (info: any, e: any) {
    info.position.left = e.offsetX
    info.position.top = e.offsetY
    if (info.initPoi) {
        info.position.left -= info.initPoi.width / 2
        info.position.top -= info.initPoi.height / 2
    }
}

export { resolveInitPoi }
export default el
