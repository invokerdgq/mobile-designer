const BackgroundStyle = {
    backgroundColor: 'rgba(255,255,255,1)'
}

const BackgroundStyleDec = {
   backgroundColor: {
       label: '背景颜色',
       component: 'el-color-picker',
       options: {
           showAlpha: true
       }
   }
}

const Background = {
    label: '背景',
    value: 'Background',
    style: BackgroundStyleDec
}

export default BackgroundStyle

export { Background }
