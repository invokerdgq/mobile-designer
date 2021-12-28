function resolveChartData (com: any, config: any): any {
    const data = com.dataset[com.dataset.type]
    const xAxisIndex = data.dimensions.findIndex((item: string) => {
        return item === data.encode.xAxis
    })
    const categories = data.source.map((item: Array<any>) => {
        return item[xAxisIndex]
    })
    const series = [
        {
            name: '测试',
            data: [20, 40, 100, 50]
        }
    ]
    config.config.props.chartData = {
        categories,
        series
    }
}

export default resolveChartData
