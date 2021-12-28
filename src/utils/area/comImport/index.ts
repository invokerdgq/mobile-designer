import uView from './uView'
import uniUi from './uni-ui'
import QiunDataCharts from '@/uni_modules/components/qiun-data-charts/qiun-data-charts.vue'
import QiunError from '@/uni_modules/components/qiun-error/qiun-error.vue'
import QiunLoading from '@/uni_modules/components/qiun-loading/qiun-loading.vue'
import uChartsHelper from '@/components/area/uCharts/uChartsHelper.vue'

export default {
    ...uView,
    // ...uniUi,
    QiunDataCharts,
    QiunError,
    QiunLoading,
    uChartsHelper
}
