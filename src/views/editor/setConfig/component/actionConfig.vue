<template>
  <div>
    <el-card>
      <div slot="header">组件原生DOM事件</div>
      <el-collapse>
        <el-collapse-item
          v-for="item in nativeOnList"
          :key="item"
          :title="`原生 ${pageInfo.currentComponent.config.nativeOnDec[item].label}`"
        >
          <el-collapse-item
            v-for="(event, index) in pageInfo.currentComponent.config.nativeOn[item]"
            :key="index"
            :title="`原生 ${pageInfo.currentComponent.config.nativeOnDec[item].label}-${index}`"
          >
            <add-event @delete-event="deleteEvent(index, 'nativeOn', item)" :info="event"></add-event>
          </el-collapse-item>
          <add-event @add-event="addEvent($event, 'nativeOn', item)"></add-event>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card>
      <div slot="header">组件封装事件</div>
      <el-collapse>
        <el-collapse-item
          v-for="item in onList"
          :key="item"
          :title="`${pageInfo.currentComponent.config.onDec[item].label}`"
        >

          <el-collapse-item
            v-for="(event, index) in pageInfo.currentComponent.config.on[item]"
            :key="index"
            style="margin-left: 15px"
            :title="`${pageInfo.currentComponent.config.onDec[item].label}-${index}`"
          >

            <add-event @delete-event="deleteEvent(index, 'on', item)" :info="event" :eventName="item" :eventType="'on'" style="margin-left: 15px"></add-event>
          </el-collapse-item>
          <add-event @add-event="addEvent($event, 'on', item)" style="margin-left: 15px" :eventName="item" :eventType="'on'"></add-event>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card>
      <div slot="header">回调事件配置</div>
      <el-collapse>
        <el-collapse-item
          v-for="(item, index) in pageInfo.currentComponent.cb"
          :key="item"
          :title="`回调事件--${index}`"
        >
            <add-event @delete-event="deleteEvent(index, 'on', item)" :info="item" eventName="回调事件" :eventType="'cb'" style="margin-left: 15px"></add-event>
        </el-collapse-item>
        <el-collapse-item title="事件配置">
          <add-event @add-event="addEvent($event, 'cb', null)" style="margin-left: 15px" eventName="回调事件" :eventType="'cb'"></add-event>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import withOptions from '@/utils/editor/options/selectOptions.ts'
import AddEvent from '@/components/common/common/actionConfig/addEvent.vue'

@Component({
  components: {
    AddEvent
  }
})
@withOptions
export default class ComponentActionConfig extends Vue {
  @Getter('pageInfo') pageInfo: any

  get nativeOnList (): Array<any> {
    return Object.keys(this.pageInfo.currentComponent.config.nativeOn)
  }

  get onList (): Array<any> {
    return Object.keys(this.pageInfo.currentComponent.config.on)
  }

  addEvent (data: any, type: string, eventName: string): void {
    if (type === 'cb') {
      this.pageInfo.currentComponent.cb.push(JSON.parse(JSON.stringify(data)))
      this.pageInfo.currentComponent.cb = [...this.pageInfo.currentComponent.cb]
      return
    }
    this.pageInfo.currentComponent.config[type][eventName].push(JSON.parse(JSON.stringify(data)))
    this.pageInfo.currentComponent.config[type][eventName] = [...this.pageInfo.currentComponent.config[type][eventName]]
  }

  deleteEvent (index: number, type: string, eventName: string): void {
    if (type === 'cb') {
      this.pageInfo.currentComponent.cb.splice(index, 1)
      this.pageInfo.currentComponent.cb = [...this.pageInfo.currentComponent.cb]
      return
    }
    this.pageInfo.currentComponent.config[type][eventName].splice(index, 1)
    this.pageInfo.currentComponent.config[type][eventName] = [...this.pageInfo.currentComponent.config[type][eventName]]
  }
}
</script>

<style scoped lang="scss">

</style>
