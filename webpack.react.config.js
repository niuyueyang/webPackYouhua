const path=require('path');
const webpack=require('webpack');
module.exports={
    entry:{
        react:['react','react-dom']
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name]_dll.js',
        library: '_dll_[name]'//全局变量名字，其他会从变量上获取到里面的模块
    },
    plugins:[
        //manifest表示一个描述文件
        new webpack.DllPlugin({
            name:'_dll_[name]',//与上面的target保持一致
            path:path.join(__dirname,'dist','manifest.json')
        })
    ]
}
