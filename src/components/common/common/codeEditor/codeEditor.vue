<template>
  <codemirror
    ref="cm"
    class="code-editor"
    :value="preContent + value"
    :options="cmOptions"
    @input="inputChange"
  ></codemirror>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'
import 'codemirror/lib/codemirror.css'
// require more codemirror resource...
import 'codemirror/addon/selection/active-line'
import 'codemirror/keymap/sublime'
import 'codemirror/mode/css/css'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/javascript-lint.js'
import 'codemirror/addon/display/autorefresh'
require('codemirror/theme/blackboard.css')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/javascript-hint.js')

@Component({
  components: {
    codemirror
  }
})
export default class CodeEditor extends Vue {
  @Prop({ default: '' }) preContent!: any
  @Prop({ default: '' }) value!: string
  cmOptions = {
    // 语言及语法模式
    mode: 'text/javascript',
    theme: 'blackboard',
    smartIndent: true,
    line: true,
    lineNumbers: true,
    lineWrapping: true,
    tabSize: 4,
    matchBrackets: true,
    hintOptions: {
      completeSingle: false
    }
  }

  inputChange (val: string): void {
    this.$emit('input', val.replace(this.preContent, ''))
  }
}
</script>

<style scoped>
.code-editor{
 height: 750px;
}
.code-editor >>> .cm-s-blackboard.CodeMirror{
  height: 100%;
}
</style>
