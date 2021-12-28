<template>
  <div>
    <el-row
        v-if="info"
    >
     <el-input v-model="info.eCfg.key" placeholder="键"></el-input>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ObjectGetValue extends Vue {
  @Prop() info!: any
}
</script>

<style scoped>

</style>
