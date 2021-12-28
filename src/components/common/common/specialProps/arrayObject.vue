<template>
  <el-form>
    <el-form-item
        v-for="item in Object.keys(keyDec)"
        :key="item"
        :value="item"
        :label="keyDec[item] + '绑定字段'"
        label-width="100px"
    >
      <el-select v-model="pageInfo.currentComponent.config.propsS[SPECIAL_KEY].key[item]">
        <el-option
            v-for="item in keys"
            :value="item.name"
            :key="item.name"
            :label="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class ArrayObject extends Vue {
  @Getter('pageInfo') pageInfo!: any
  @Prop() value!: any
  @Prop() keyDec!: any
  @Prop() SPECIAL_KEY!: string

  get keys () {
    if (this.pageInfo.currentComponent.dataset.type === 'extend') {
      const com = this.pageInfo.components[this.pageInfo.currentComponent.dataset.extend.id]
      return com.dataset[com.dataset.type].dimensionsAlias
    }
    return this.pageInfo.currentComponent.dataset[this.pageInfo.currentComponent.dataset.type].dimensionsAlias
  }
}
</script>

<style scoped>

</style>
