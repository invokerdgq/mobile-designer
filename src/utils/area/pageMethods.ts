import { Vue, Component } from 'vue-property-decorator'
import withResize from '@/utils/area/moveAndResize'
import { resolveInitPoi } from './appNode'
import { Getter, Action } from 'vuex-class'
import MiddleContainer from '@/components/area/middleContainer.vue'
import MiddleContainerView from '@/components/area/middleContainerView.vue'// 避免所有组件 在页面上render 影响性能
import DraggableContainer from '@/components/area/draggableContainer.vue'

@Component({
    components: {
        MiddleContainer,
        MiddleContainerView,
        DraggableContainer
    }
})
@withResize
export default class PageMethodsMixins extends Vue {
    customRefs: any = {}
    @Getter('searchEl') searchEl!: any
    @Getter('className') className!: string
    @Action('setSearchEl') setSearchEl!: any
    @Action('setClassName') setClassName!: any

    getPageStyle (): any {
        return {
            height: '100%',
            position: 'relative'
        }
    }

    handleMouseOver (this: any, e: any) {
        e.stopPropagation()
        if (e.target.className === `pages-custom-${this.pageInfo.route}`) {
            this.setClassName('')
            return
        }
        if (this.curNode && this.curNode !== e.target) {
            this.curNode.classList.remove('SEARCH_HOVER')
        }
        this.curNode = e.target
        e.target.classList.add('SEARCH_HOVER')
        this.setClassName(Array.from(e.target.classList).filter(item => {
            return (item !== 'SEARCH_HOVER' && !/comId-/.test(item as string))
        }).join(' '))
    }

    handleMouseLeave (e: any) {
        e.stopPropagation()
        e.target.classList.remove('SEARCH_HOVER')
    }

    resolvePrefixName (h: any): any {
        return function (...arg: any) {
            if (typeof arg[0] === 'string' && arg[0].split('-').length < 2) {
                arg[0] = 'VUni-' + arg[0]
            }
            return h(...arg)
        }
    }

    render (this: any, h: any): any {
        h = this.resolvePrefixName(h)
        const mid = (this.isEdit && !this.searchEl) ? DraggableContainer : MiddleContainerView
        return h('view', {
            class: `pages-custom-${this.pageInfo.route}`,
            style: this.getPageStyle(),
            nativeOn: {
                click: () => {
                    if (this.searchEl) {
                        // this.setSearchEl(false)
                    } else {
                        this.pageInfo.setCurrentComponent(null)
                    }
                },
                mousedown: this.handlePageMouseDown,
                mousemove: this.handlePageMouseMove,
                mouseup: this.handlePageMouseUp,
                mouseover: this.searchEl ? this.handleMouseOver : () => {},
                mouseleave: this.searchEl ? this.handleMouseLeave : () => {},
                dragover: (e: any) => {
                    e.preventDefault()
                },
                drop: (e: any) => {
                    let comInfo = e.dataTransfer.getData('text')
                    if (comInfo) {
                        const info = JSON.parse(comInfo)
                        resolveInitPoi(info, e)
                        this.pageInfo.addComponent(info)
                        if (info.isPopup) this.pageInfo.setCurrentComponent(info.id)
                    }
                }
            }
        },[
            Object.keys(this.pageInfo.components).map((id: string) => {
                const com = this.pageInfo.components[id]
                return h(mid, {
                    props: {
                        comInfo: com,
                        pageInfo: this.pageInfo,
                        isEdit: this.isEdit,
                        first: true,
                        customRefs: this.customRefs
                    },
                    on: {
                        setType: (type: string) => {
                            this.setType(type)
                        },
                        setRefs: (id: string, info: any) => {
                            Vue.set(this.customRefs, id, info)
                        }
                    }
                })
            })
        ])
    }
}
