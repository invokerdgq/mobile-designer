<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log('App Launch')
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style lang="scss">
    /*每个页面公共css */
    @import "./index.scss";
    @import "./comExtra.scss";
    //* {
    //  //margin: 0;
    //  //padding: 0;
    //  box-sizing: content-box;
    //}
</style>
