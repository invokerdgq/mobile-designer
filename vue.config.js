module.exports = {
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        port: 8878
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/style/variable.scss";@import "@/style/mixins.scss";`
            }
        }
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.ts']
        }
    }

}
