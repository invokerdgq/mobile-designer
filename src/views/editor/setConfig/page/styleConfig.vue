<template>
  <config-style
    style="margin-top: 15px"
    ref="configStyle"
    :is-page="true"
    v-if="!pageInfo.currentComponent"
    :config="pageInfo.config"
  ></config-style>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import ConfigStyle from '@/components/common/common/styleConfig/configStyle.vue'

@Component({
  components: {
    ConfigStyle
  }
})
export default class PageStyleConfig extends Vue {
  @Getter('pageInfo') pageInfo!: any

  @Watch('pageInfo.currentComponent')
  handleChange (val: any): void {
    if (!val) {
      const list = Object.keys(this.pageInfo.config.styleDec).filter((key: string) => {
        return key !== 'Wh'
      });
      (this.$refs.configStyle as any).setInitList(list)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
