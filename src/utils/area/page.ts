import { Vue, Component, Mixins, Watch } from 'vue-property-decorator'
import PageMethodsMixins from './pageMethods'
import { resolveConfigStyle } from '@/utils/area/formateComponent'
import { Getter } from 'vuex-class'

function generatePageClass (info: any, isEdit: boolean): any {
    @Component({})
    class CustomPage extends Mixins(PageMethodsMixins) {
        @Getter('pageInfo') pageInfo!: any
        isEdit: boolean = isEdit
        curNode: any = null
    }
    return CustomPage
}

let first = true

function resolvePagesChange (this: any, val: any, isEdit: boolean = true) {
    if (!val) return
    if (!first) return
    let page = (Vue as any).options.components
    for (let i = 0;i < 3;i++ ) {
        page = Object.getPrototypeOf(page)
    }
    let deleteKey = Object.keys(page).filter((key: string) => {
        return /^pages-custom/.test(key)
    })
    deleteKey.forEach((key: string) => {
        delete page[key]
    })
        if (!page[`pages-custom-${val.route}`]) {
            let PATH = `/pages/custom/${val.route}`
            page[`pages-custom-${val.route}`] = generatePageClass(val, isEdit)
            this.$router.addRoutes([{
                path: PATH,
                component: {
                    render: function (h: any) {
                        let style = JSON.parse(JSON.stringify(val.config.style))
                        resolveConfigStyle(style)
                        return h('Page', {
                            props:  Object.assign({
                                isQuit: true,
                                isEntry: false,
                                isTabBar: true,
                                tabBarIndex: 0
                                // @ts-ignore
                            }, window.__uniConfig.globalStyle, {
                                "navigationBarTitleText": "uni-app"
                            })
                        }, [h(`pages-custom-${val.route}`, {
                            slot: 'page',
                            style: { overflow: 'auto', borderRadius: isEdit ? '45px': 0, ...style }
                        })]);
                    }
                },
                meta: {
                    id: val.id,
                    name: `pages-custom-${val.route}`,
                    isEntry: false,
                    isNVue: false,
                    isQuit: false,
                    pagePath: PATH,
                    windowTop: 0
                }
            }]);
        }
    first = false
}

export { resolvePagesChange }
