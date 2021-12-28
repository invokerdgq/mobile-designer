<template>
  <div style="position: relative">
    <div
      :style="{width: '454px', height: '782px',background: `url(${png})`, backgroundSize: '100% 100%',padding: '50px 20px 20px',margin: '20px auto'}"
      id="app-container"
    >
      <custom-page></custom-page>
    </div>
    <div class="popup-helper">
      <div
        :class="`popup-item ${pageInfo && pageInfo.currentComponent && pageInfo.currentComponent.id === item ? 'select-item': ''}`"
        v-for="item in popupComponent"
        :key="item"
        @click="setPopup(item)"
      >{{pageInfo.components[item].label + item}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import png from '@/assets/images/iphone.png'
import { Getter } from 'vuex-class'
import CustomPage from '@/components/area/customPage.vue'

@Component({
  components: {
    CustomPage
  }
})
export default class DesignAreaMain extends Vue {
  @Getter('pageInfo') pageInfo: any
  png = png

  @Watch('pageInfo.currentComponent.config.props.value')
  handleChange (val: boolean|null): void {
    if (val === false) this.pageInfo.setCurrentComponent(null)
  }

  get popupComponent (): Array<any> {
    if (!this.pageInfo) return []
    return Object.keys(this.pageInfo.components).filter((id: string) => {
      return this.pageInfo.components[id].isPopup
    })
  }

  setPopup (id: string): void {
    if (this.pageInfo.currentComponent && this.pageInfo.currentComponent.id === id) {
      this.pageInfo.components[id].config.props.value = false
      this.pageInfo.setCurrentComponent(null)
    } else {
      this.pageInfo.setCurrentComponent(id)
      this.pageInfo.currentComponent.config.props.value = true
    }
  }

  mounted (): void {}
}
</script>

<style scoped lang="scss">
.popup-helper{
  position: absolute;
  width: 150px;
  right: 30px;
  top: 20px;
  display: flex;
  flex-direction: column;
  .popup-item{
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .select-item {
    background: #007aff;
    color: white
  }
}
</style>
