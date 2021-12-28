<template>
  <div id="app-main" v-loading="isLoading" element-loading-text="用户npm 资源加载中">
    <el-container class="app-container">
      <el-header style="height:30px;line-height: 30px">
        <top-toolbar></top-toolbar>
      </el-header>
      <el-container style="overflow:auto;">
        <el-aside>
          <left-nav-main></left-nav-main>
        </el-aside>
        <el-main class="area-main">
          <design-area-main style="flex: 1; overflow: auto"></design-area-main>
          <set-config-main style="width: 400px"></set-config-main>
        </el-main>
      </el-container>
      <el-footer style="height:30px;line-height: 30px">
        <bottom-toolbar></bottom-toolbar>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TopToolbar from '@/views/editor/toolbar/topToolbar.vue'
import BottomToolbar from '@/views/editor/toolbar/bottomToolbar.vue'
import LeftNavMain from '@/views/editor/leftNav/leftNavMain.vue'
import DesignAreaMain from '@/views/editor/designArea/designAreaMain.vue'
import SetConfigMain from '@/views/editor/setConfig/setConfigMain.vue'
import { Action } from 'vuex-class'
import { generatePage } from '@/utils/editor/pageInfo'

@Component({
  components: {
    TopToolbar,
    BottomToolbar,
    LeftNavMain,
    DesignAreaMain,
    SetConfigMain
  }
})
export default class Editor extends Vue {
  @Action('setPageInfo') setPageInfo!: any
  isLoading = false

  getAppInfo (): void {
    const pageInfo = generatePage({
      name: '首页',
      route: 'home',
      desc: 'ggg'
    })
    this.setPageInfo(pageInfo)
  }

  created (): void {
    window.Vue = Vue // 将Vue 挂在到window 下 使得npm 包能install
    this.getAppInfo()
  }

  mounted (): void {
    this.isLoading = true
    setTimeout(() => { // 获取用户 自己的npm 组件库
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/invoker-test-new'
      document.body.appendChild(script)
      script.onload = () => {
        this.isLoading = false
      }
    }, 5000)
  }
}
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  .area-main{
    display: flex !important;
    flex-direction: row;
    padding: 10px 0 0;
  }
}
</style>
