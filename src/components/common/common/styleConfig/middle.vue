<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ArrayMulti from '@/components/common/common/specialProps/arrayMulti.vue'
import ArrayObject from '@/components/common/common/specialProps/arrayObject.vue'
import ArraySimple from '@/components/common/common/specialProps/arraySimple.vue'
import ArrayTree from '@/components/common/common/specialProps/arrayTree.vue'

@Component({
  components: {
    ArrayMulti,
    ArrayObject,
    ArraySimple,
    ArrayTree
  }
})
export default class Middle extends Vue {
  @Prop({ default: {} }) options!: any
  @Prop() comIs!: string
  @Prop() value!: any

  render (h: any): any {
    return h(this.comIs, {
      props: {
        ...this.options,
        value: this.value
      },
      on: {
        input: (val: any) => {
          this.$emit('input', val)
        },
        change: (val: any) => {
          this.$emit('change', val)
        }
      }
    }, this.$slots.default)
  }
}
</script>

<style scoped lang="scss">

</style>
