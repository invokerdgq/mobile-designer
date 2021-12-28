/*
* 适配问题解决方案
* 对于单页面 有三种可能场景
*    1 只需宽度自适应 高度不变 且看板高度 就保持配置时的高度 一般用于长屏页面
*    2 在宽度自适应的情况下 高度同比例缩放 页面高度保持配置时的高度
*    3 宽度自适应的情况下 保证看板高度 与手机屏幕高度一致 达到整屏的效果
* 在编辑与预览情况下 是动态生成的 单位不能用 rpx 且组件的某些入参 单位是rpx 所以需要计算转化
* 在 生成时 数据不用计算转化
* */


/*
* 对于组件入参 是大小相关数据时 加上前缀 是rpx 则为 rpx-xxx 是px 则为 px-xxx
*
* */


/*
* 对于 插槽问题 分为 具名插槽 与 默认插槽
* 具名插槽
* 例如 u-field 有 icon 与 right 两个插槽 具名插槽 只能添加一个组件 采用相对定位方式
* =========================》》》》》》》》》》》》》》》》》》》》》》》》》》
* 默认插槽
* 例如 u-button u-form 等很多组件  这种默认插槽 可以添加多个组件 采用绝对定位方式
* 且 默认插槽 还会与 数据关联 形成 列表型的 默认插槽添加组件列表
* 例如 u-form  内部可以添加 多个表单组件
* 对于 类似div 的view 容器组件 内部可能是 关联数组数据 v-for 遍历 每一项 有多个组件 不同组件用到容器数据的字段
* */

/*
* 表单类 form-item  组件的配置 挂到插槽的组件上 如果form -fromItem -com  层级太深 性能问题 把el-form-item 的配置在添加
* 组件时 复制到 com 上
*
* */

const actionObj = {
  target: 'com', // component page common  组件 页面 不取对象事件(跳转...)
  id: '', // 组件id 或者 页面 id
  paramsType: 'props', // 组件 props style extraStyle data dataset
  class: '', // extraStyle 的某一项类名
  key: '', // props style extraStyle data 的 属性键值
  value: {
    valueType: 'static',// static 页面全局变量 页面数据集中的字段数据  组件参数  组件数据集中的字段数据 其他组件，
    paramType: 'props', // 组件 props style extraStyle data dataset(仅仅值来源于其他组件)
    class: '', // extraStyle 的某一项类名 (仅仅值来源于其他组件)，
    key: ''
  }
}
/*
* 对于事件 单个事件对象
*
*
*
*
*
* */
