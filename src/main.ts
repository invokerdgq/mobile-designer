import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import store from '@/store/index'
import 'element-ui/lib/theme-chalk/index.css'
import './style/standard.scss'
import Dependency from './utils/area/comImport/index'
import VCharts from 'v-charts'
import uView from 'uview-ui'
import VueClipboard from 'vue-clipboard2'
// import uniUi from '@dcloudio/uni-ui'
import MiddleContainerView from '@/components/area/middleContainerView.vue'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(uView)
Vue.use(VueClipboard)
// Vue.use(uniUi)
Vue.use(VCharts)

Object.keys(Dependency).forEach((item: string) => {
    Vue.component(item, (Dependency as any)[item])
})
Vue.component('middle-container-view', MiddleContainerView )

new Vue({
    store,
    render: h => h(App)
}).$mount()
