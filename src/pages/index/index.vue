<template>
 <div ref="myDiv">
   <custom-test v-if="!isLoading"></custom-test>
 </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "index",
  data () {
    return {
      isLoading: true
    }
  },
  methods: {

  },
  created() {
    window.Vue = Vue // 将Vue 挂在到window 下 使得npm 包能install
  },
  mounted() {
    setTimeout(() => { // 获取用户 自己的npm 组件库
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/invoker-uni@1.0.2'
      document.body.appendChild(script)
      script.onload = () => {
        setTimeout(() => {
          this.isLoading = false
          console.dir(Vue)
        }, 4000)
      }
    }, 1000)
  }
}
</script>

<style scoped>

</style>
