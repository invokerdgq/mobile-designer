<template>
  <el-form style="width: 100%">
    <el-button type="primary" size="small" @click="addItem">添加项</el-button>
    <el-collapse style="width: 100%">
      <el-collapse-item
          v-for="(item, index) in pageInfo.currentComponent.config.propsS[SPECIAL_KEY].key"
          :key="index"
          :title="`第${index + 1}项`"
      >
        <el-form-item
            v-for="item in Object.keys(keyDec)"
            :key="item + index"
            :value="item"
            :label="keyDec[item] + '绑定字段'"
            label-width="100px"
        >
          <el-select v-model="pageInfo.currentComponent.config.propsS[SPECIAL_KEY].key[index][item]">
            <el-option
                v-for="item in keys"
                :value="item.name"
                :key="item.name + index"
                :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class ArrayMulti extends Vue {
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

  addItem () {
    this.pageInfo.currentComponent.config.propsS[this.SPECIAL_KEY].key.push(JSON.parse(JSON.stringify(this.pageInfo.currentComponent.config.propsS[this.SPECIAL_KEY].key[0])))
  }
}
</script>

<style scoped>

</style>
