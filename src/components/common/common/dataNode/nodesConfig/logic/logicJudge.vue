<template>
 <div>
   <div>每个判断节点 '如果' 可以通过添加关联符 增加判断条件 （括号关联符内部判断优先级更高）</div>
   <div>判断条件  如果</div>
   <el-row :gutter="10" v-for="(item, index) in info.eCfg.judge" :key="index">
     <el-col :gutter="10" style="text-align: center">{{getSign(item.leftSign)}}</el-col>
     <el-row :gutter="10">
       <el-col :span="8">
         <el-input v-model="item.left"></el-input>
       </el-col>
       <el-col :span="8">
         <el-select v-model="item.compare">
           <el-option
               v-for="item in compareList"
               :key="item.value"
               :label="item.label"
               :value="item.value"
           ></el-option>
         </el-select>
       </el-col>
       <el-col :span="8">
         <el-input v-model="item.right"></el-input>
       </el-col>
     </el-row>
     <el-row :gutter="10" v-show="item.rightSign" style="text-align: center">{{getSign(item.rightSign)}}</el-row>
   </el-row>
   <el-row :gutter="10">
     <el-col :span="6">关联符</el-col>
     <el-col :span="14">
       <el-select v-model="connection">
         <el-option
             v-for="item in connectList"
             :key="item.value"
             :label="item.label"
             :value="item.value"
         ></el-option>
       </el-select>
     </el-col>
     <el-col :span="4"><el-icon name="plus" @click.native="addConnection"></el-icon></el-col>
   </el-row>
   <el-divider></el-divider>
   <div>
     <el-row :gutter="10">
       <el-col :span="8">通过返回</el-col>
       <el-col :span="16"><el-input v-model="info.eCfg.s"></el-input></el-col>
     </el-row>
     <el-row :gutter="10">
       <el-col :span="8">不通过返回</el-col>
       <el-col :span="16"><el-input v-model="info.eCfg.f"></el-input></el-col>
     </el-row>
   </div>
 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class LogicJudge extends Vue {
  @Prop() info!: any
  connection = ''
  data: any = [
    {
      id: '1-if',
      label: '如果',
      cfg: {},
      children: []
    },
    {
      id: '1-else',
      label: '否则',
      cfg: {},
      children: []
    }
  ]

  compareList = [
    {
      label: '小于',
      value: '<'
    },
    {
      label: '小于等于',
      value: '<='
    },
    {
      label: '大于',
      value: '>'
    },
    {
      label: '大于等于',
      value: '>='
    },
    {
      label: '等于',
      value: '=='
    },
    {
      label: '不等于',
      value: '!='
    }
  ]

  connectList = [
    {
      label: '或者',
      value: '||'
    },
    {
      label: '并且',
      value: '&&'
    },
    {
      label: '或者 (',
      value: '|| ('
    },
    {
      label: '并且 (',
      value: '&& ('
    },
    {
      label: ') 或者',
      value: ') ||'
    },
    {
      label: ') 并且',
      value: ') &&'
    },
    {
      label: ')',
      value: ')'
    },
  ]

  getSign (val: string) {
    return (this.connectList.find((item: any) => {
      return item.value === val
    }) || {}).label
  }

  addConnection () {
    if (this.connection === ')') {
      this.info.eCfg.judge[this.info.eCfg.judge.lenght -1].rightSign = ')'
      this.info.eCfg.judge = [...this.info.eCfg.judge]
      return
    }
    this.info.eCfg.judge.push({
      left: '',
      right: '',
      compare: '',
      leftSign: this.connection,
      rightSign: ''
    })
  }
}
</script>

<style scoped lang="scss">
.my-tree /deep/ .el-tree-node__content{
  height: auto;
}
.operation{
  padding: 0;
  float: right;
}
</style>

