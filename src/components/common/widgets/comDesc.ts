const defaultConfig = {
  name: '',// 组件引用名 组件库文档中的名称 例如 <el-input/> 就是 el-input
  label: '',// 组件描述 用于左侧 组件列表中描述组件
  desc: '',// 组件别名 用于区别多个相同组件，写组件配置说明文件时 不带\
  needRm: false,// 有些组件的入参只会在mount时 初始化一次 修改入参等配置时 并不会立刻生效 变化是需要remount
  stopPropagation: false, // 有些组件本身对组件的点击事件封装了 并且阻止冒泡 外层容器与组件大小又相同 则相当于无法点击到外层容器 并设为当前组件
  config: {
    props: { //组件说明文档的入参
      type: ''// 示例
    },
    propsDec: { // 组件入参配置说明设置
      type: {
        label: '按钮类型',// 入参说明
        component: 'el-select',// element 组件 也可以是自定义组件 例如 图标选择组件
        // component: { 使用的组件可能依赖于其他的props 入参 例如select list 入参采用的组件依赖 mode 入参
        //   key: 'ooo', // 依赖的props键值
        //   use: {
        //     key: 'com'// switch 对应关系 现在提供的组件 有简单数组 对象数组 二维对象数组 树 见component/common/common/specialProps
        //   }
        // },
        options: {
          data: [], // 相关配置组件的入参， el-select 为data, 其他的比如 el-input-number  min: 1 max: 10...
          disabled: true // 组件有 v-model 时 入参 为value 配置时不可更改 value 严格来说是不能配置的入参
        }
      }
    },
    propsS: {
      list: {
        type: 'arrayObject',
        key: ''
      }
    },
    propsDepend: {
      mode: {
        target: 'list',
        comMap: {
          key1: 'el-input',
          key2: 'el-color-picker'
        }
      }
    },
    propsData: { // 组件入参 不是简单的静态数据时 写组件说明时 设为{} 就可以了
      type: {
        enabled: false,// 是否启用动态数据 不需要时 请移除 避免提交无用数据
        type: '',// 动态数据类型 全局变量 数据集字段 自定义
        encode: '',// 全局变量 或 数据集字段的 字段名
        custom: { // 自定义 脚本
          params: [],// 自定义脚本入参
          script: ''// 脚本内容
        }
      }
    },
    style: {
        fontSize: 16
    },
    styleDec: {// 通常style 属性 比如 边框分组下 包含上下左右 等 多个配置 为了更清晰 所以中间有一层分组
      font: {
        fontSize: {
          label: '字体大小',// 属性说明
          component: 'el-input-number',
          options: {
            min: 12,
            max: 30
          }
        }
      }
    },
    styleData: {
      fontSize: {
        enabled: false,// 是否启用动态数据
        type: '',// 动态数据类型
        encode: '',// 绑定字段
        custom: {
          params: [],
          script: ''
        },
        result: '',// 动态数据中间变量
      }
    },
    styleUp: { // style 是通过在组件上的 comId_class_${id} 类名 添加的属性 当样式与入参的配置引起的样式冲突时 需要style中的生效 可以开启 提升style 中的配置优先级
      fontSize: false
    },
    class: {// 一般如果有全局样式类 可以为组件加上类名
      test: true
    },
    on: {// 组件内封装的事件
      change: [
        {
          target: '',// 作用对象 组件、当前页面、通用事件（例如 跳转等），
          id: '',// 组件id
          type: '',// 作用类型 props style dataset extraStyle
          class: '',// 作用类型为 extraStyle时选择的类名
          key: '',// 属性对应的键值，
          new: {// 新值
            type: '',// 新值类型 static global dataset event custom
            key: '',// global dataset event 对应的键值
            value: '',// 静态值
            custom: {
              params: [],
              script: ''
            }
          }
        }
      ]
    },
    onDec: {
      change: {
        label: '',// 组件内封装事件说明
        params: {
          value: ''// 参数说明
        }
      }
    },
    nativeOn: {},// 同上 一般为 点击 触摸 拖拽等 作用于组件最外层
    nativeOnDec: {}
  },
  extraStyle: {// 配置时可不带 统一配置 有些复杂组件 开发人员 可以默认将需求相关 类名预先加上
    'u-action': {
      label: '',// 类名的说明
      style: {
        color: '#ffffff'
      }
    }
  },
  child: {// 插槽 分为默认插槽 与具名插槽 默认插槽可以添加多个子组件  具名插槽只能添加一个
    default: [],
    icon: null
  },
  childDec: {
    default: {// 没有相关功能可以不配
      label: '默认插槽',
      prefixCom: 'uCollapseItem',// 中间辅助组件 例如 el-form  中的 el-form-item 如果没有则不配 格式为驼峰式 不要带_
      hasListMode: true,// 是否拥有列表模式
      listMode: false,// 是否开启列表模式
      position: 'relative',// 子组件定位方式默认为absolute 例如具名插槽一般采用相对定位 relative
    }
  },
  methods: {
    validate: []// 例如表单组件的校验方法 后面的数组为 回调方法的索引
  },
  methodsDec: {
    validate: {
      label: '校验整个表单',// 方法说明
      cbType: 'normal',// 回调类型 normal 代表的是 接受一个函数参数  promise 为返回一个promise 需要通过then 的形式处理 例如 ajax confirm 等
      params: {
        valid: '是否校验通过',// 参数说明
      }
    }
  },
  cb: []// 用于组件触发某个异步事件 例如 组件点击 调用 表单校验方法 校验通过后触发 回调 提交表单 数组元素为单个事件对象 例如上面的 on change 中的数组元素
}

const pageConfig = {
  components: {
    '${id}': defaultConfig
  },
  global: {},// 全局变量
  config: { style: {} }// 页面样式
}


//  对于 某个入参 所采用的组件类型 依赖于另一个属性 的值 增加一个
const propsDepend = {
  key: {
    target: 'xxx',
    comMap: {
      key1: 'el-input',
      key2: 'el-color-picker'
    }
  }
}
// 同时当 被依赖属性变化时  导致其作用属性 配置组件变化 数据结构 可能发生变化  需要重置结构 需要一个组件及其初始化数据的对应关系
