<template>
  <div class="dataset-container">
    <el-form label-width="120px" size="small">
      <el-form-item label="数据集类型">
        <el-select v-model="pageInfo.currentComponent.dataset.type">
          <el-option
            v-for="item in getOptions('dataset')"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="继承组件选择" v-show="pageInfo.currentComponent.dataset.type === 'extend'">
        <el-select v-model="pageInfo.currentComponent.dataset.extend.id">
          <el-option
            v-for="com in comList"
            :value="com.value"
            :key="com.value"
            :label="com.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据集选择" v-if="pageInfo.currentComponent.dataset.type === 'dynamic'"></el-form-item>
    </el-form>
    <el-card>
      <div slot="header" style="text-align: center">数据集数据</div>
     <el-row v-show="pageInfo.currentComponent.dataset.type === 'static'" :gutter="20">
       <el-col :span="4"><el-button type="primary" size="mini" @click="addRow">添加行</el-button></el-col>
       <el-col :span="4"><el-button type="primary" size="mini" @click="addColumn">添加列</el-button></el-col>
     </el-row>
      <el-table
        :data="getData('source')"
        :height="230"
        class="my-table"
        style="width: 100%;overflow: auto"
      >
        <template  v-if="pageInfo.currentComponent.dataset.type === 'static'">
          <el-table-column
            v-for="(item, index) in getData('dimensionsAlias')"
            :fixed="index === 0"
            :key="item.name"
            :prop="String(index)"
            :label="item.alias"
          >
            <template slot="header" slot-scope="scope">
              <el-input v-model="item.alias" @change="updateStatic('dimensionsAlias')" :test="scope"></el-input>
            </template>
            <template slot-scope="{row}">
              <div>
                <el-input v-model="row[index]" @change="updateStatic('source')"></el-input>
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            v-for="(item, index) in getData('dimensionsAlias')"
            :fixed="index === 0"
            :key="item.name"
            :prop="String(index)"
            :label="item.alias"
          />
        </template>
        <template v-if="pageInfo.currentComponent.dataset.type === 'static'">
          <el-table-column lable="操作">
            <template slot="header"><span>操作</span></template>
            <template slot-scope="{row, $index}">
              <el-icon name="delete" v-show="pageInfo.currentComponent.dataset.static.source.length > 1" @click.native="deleteRow($index)"></el-icon>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-row :gutter="20" style="display: flex" v-if="pageInfo.currentComponent.dataset.type === 'static'">
        <el-col
          v-for="(item, index) in getData('dimensionsAlias')"
          :key="item.name"
          style="text-align: center"
        >
          <el-icon
            name="delete"
            @click.native="deleteColumn(index)"
            v-show="getData('dimensionsAlias').length > 1"
          ></el-icon>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import withOptions from '@/utils/editor/options/selectOptions'

@Component({})
@withOptions
export default class ComponentDataConfig extends Vue {
  @Getter('pageInfo') pageInfo: any

  get comList (): Array<any> {
    return Object.keys(this.pageInfo.components).map((id: string) => {
      return {
        value: id,
        label: this.pageInfo.components[id].desc
      }
    }).filter((item: any) => {
      return this.pageInfo.currentComponent && item.value !== this.pageInfo.currentComponent.id && this.pageInfo.components[item.value].dataset.type !== 'extend'
    })
  }

  updateStatic (type: string): void {
    this.pageInfo.currentComponent.dataset.static[type] = JSON.parse(JSON.stringify(this.pageInfo.currentComponent.dataset.static[type]))
  }

  getData (type: string): Array<any> {
    if (this.pageInfo.currentComponent.dataset.type === 'extend') {
      if (!this.pageInfo.currentComponent.dataset.extend.id) return []
      const com = this.pageInfo.components[this.pageInfo.currentComponent.dataset.extend.id]
      return com.dataset[com.dataset.type][type]
    }
    return this.pageInfo.currentComponent.dataset[this.pageInfo.currentComponent.dataset.type][type]
  }

  addRow (): void {
    this.pageInfo.currentComponent.dataset.static.source.push(this.pageInfo.currentComponent.dataset.static.source[this.pageInfo.currentComponent.dataset.static.source.length - 1])
  }

  deleteRow (index: number): void {
    this.pageInfo.currentComponent.dataset.static.source.splice(index, 1)
  }

  addColumn (): void {
    const com = this.pageInfo.currentComponent
    const key = `custom_${com.dataset.static.dimensions.length}`
    com.dataset.static.dimensions.push(key)
    com.dataset.static.columnList.push({ index: com.dataset.static.columnList.lenght, aggType: null, name: key })
    com.dataset.static.dimensionsAlias.push({ name: key, alias: '说明', type: 'VARCHAR2' })
    com.dataset.static.dimensionsAlias = JSON.parse(JSON.stringify(com.dataset.static.dimensionsAlias))
    com.dataset.static.source.forEach((item: any) => {
      item.push('')
    })
  }

  deleteColumn (index: number): void {
    const com = this.pageInfo.currentComponent
    com.dataset.static.dimensions.splice(index, 1)
    com.dataset.static.columnList.splice(index, 1)
    com.dataset.static.dimensionsAlias.splice(index, 1)
    com.dataset.static.source.forEach((item: any) => {
      item.splice(index, 1)
    })
    com.dataset.static.dimensionsAlias = JSON.parse(JSON.stringify(com.dataset.static.dimensionsAlias))
  }
}
</script>

<style scoped lang="scss">
@import "@/style/variable.scss";
.dataset-container{
  padding: $padding-default 0 $padding-default;
}
.my-table /deep/ .el-input__inner{
  padding-right: 5px;
}
</style>
