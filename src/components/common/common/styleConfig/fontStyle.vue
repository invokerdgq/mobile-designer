<template>
  <div>
    <el-collapse>
      <el-collapse-item :title="title">
        <el-form ref="form" size="mini" label-width="80px">
          <el-form-item label="字体大小">
            <el-input-number
              v-model="fontStyle.fontSize"
              class="my-style-number"
              placeholder="字号大小"
              controls-position="right"
              style="width: 160px;"
              :step="0.5"
              :min="10"
              :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="字体" v-if="!removeFamily">
            <el-select v-model="fontStyle.fontFamily"
                       clearable
                       style="width: 160px;"
                       placeholder="请选择字体">
              <el-option
                v-for="item in getOptions('fontFamily')"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字体颜色" v-if="!removeColor">
            <el-row>
              <el-col :span="18">
                <el-input placeholder="选择颜色"
                          v-model="fontStyle.color">
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-color-picker
                  v-model="fontStyle.color"
                  style="margin-left: 5px;"
                  show-alpha
                  >
                </el-color-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="字体样式" v-if="!(removeFontWeight && removeFontStyle && removeTextDecoration)">
            <el-checkbox-button
              v-if="!removeFontWeight"
              v-model="fontStyle.fontWeight"
              true-label="bolder"
              false-label="normal">
              <i class="iconfont bi_bold"></i>
            </el-checkbox-button>
            <el-checkbox-button
              v-if="!removeFontStyle"
              v-model="fontStyle.fontStyle"
              true-label="italic"
              false-label="normal">
              <i class="iconfont bi_italic"></i>
            </el-checkbox-button>
            <el-checkbox-button
              v-if="!removeTextDecoration"
              v-model="fontStyle.textDecoration"
              true-label="underline"
              false-label="none">
              <i class="iconfont bi_underline"></i>
            </el-checkbox-button>
          </el-form-item>

          <el-form-item label="水平对齐" v-if="!removeHorizontalAlignment">
            <el-select
              v-model="fontStyle.horizontalAlignment"
              clearable
              style="width: 160px;"
              placeholder="请选择对齐方式">
              <el-option
                v-for="item in getOptions('horizontalAlignment')"
                :key="item.value"
                :label="item.label"
                v-model="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import withOptions from '@/utils/editor/options/selectOptions'

@Component({})
@withOptions
export default class FontStyle extends Vue {
  @Prop({ default: '字体' }) title!: string
  @Prop({ default: { fontFamily: '' } }) fontStyle!: any
  @Prop({ default: false }) removeColor!: boolean
  @Prop({ default: false }) removeFamily!: boolean
  @Prop({ default: false }) removeFontWeight!: boolean
  @Prop({ default: false }) removeFontStyle!: boolean
  @Prop({ default: false }) removeTextDecoration!: boolean
  @Prop({ default: true }) removeHorizontalAlignment!: boolean
}
</script>

<style scoped>

</style>
