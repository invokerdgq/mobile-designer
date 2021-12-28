<template>
 <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({})
export default class DatasetResolve extends Vue {
  @Prop() info!: any
  @Getter('currentPage') currentPage: any
}
</script>

<style scoped>

</style>
