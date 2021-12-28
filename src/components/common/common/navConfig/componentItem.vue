<template>
  <div class="item-container">
    <el-image :src="info.url || png" class="item-img" fit="contain"></el-image>
    <div class="item-dec">{{info.label}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import png from '@/assets/logo.png'

@Component({})
export default class ComponentItem extends Vue {
  @Prop() info!: any
  png = png
}
</script>

<style scoped lang="scss">
.item-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  .item-img {
    width: 80%;
    overflow: hidden;
  }
  .item-dec {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
