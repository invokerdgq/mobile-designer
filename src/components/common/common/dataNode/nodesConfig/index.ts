import arrayFc from './array/index'
import logicFc from './logic/index'
import mathFc from './math/index'
import objectFc from './object/index'
import staticFc from './static/index'
import transformFc from './transform/index'
import params from './params/index'

export default {
    ...arrayFc,
    ...logicFc,
    ...mathFc,
    ...objectFc,
    ...staticFc,
    ...transformFc,
    ...params
}
