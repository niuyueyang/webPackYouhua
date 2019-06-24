const path=require('path');
const webpack=require('webpack');
const happyPack=require('happypack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const webpackparalleluglifyplugin=require('webpack-parallel-uglify-plugin');
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js',
    },
    module:{
        rules:[
            {
                test:/\.jsx$/,
                use:'happypack/loader?id=babel',
                include:path.resolve(__dirname,'src'),//只转化src目录下文件
                exclude:/node_modules/              //对于node_modules下面文件不转化
            },
            {
                test:/\.css$/,
                use:'happypack/loader?id=css',
                include:path.resolve(__dirname,'src'),//只转化src目录下文件
                exclude:/node_modules/              //对于node_modules下面文件不转化
            }
        ]
    },
    resolve:{
        extensions:['.js','.json'],
        mainFields:['main','browser','node'],
        modules:['node_modules',path.resolve(__dirname,'src/lib')]
    },
    plugins:[
/*        new CleanWebpackPlugin({
            root:path.join(__dirname,'./')
        }),*/
        new HtmlWebpackPlugin({
            template: './src/index.html',//指定产的html模板
            filename:'index.html',//产出的html文件名
            hash:true,//会在引入的js里面加入查询字符串避免缓存
            minify:{
                removeAttributeQuotes:true,//去掉html中引号
            }
        }),
        new webpack.DllReferencePlugin({
            manifest:path.join(__dirname,'dist','manifest.json')
        }),
        new happyPack({
            id:'babel',
            loaders:['babel-loader']
        }),
        new happyPack({
            id:'css',
            loaders:['style-loader','css-loader']
        }),
        new webpackparalleluglifyplugin({
            workerCount:3,//电脑核数减一
            uglifyJS:{
                output:{
                    beautify:false,//不进行格式化
                    comments:false //不保留注释
                },
                compress:{
                    drop_console:true,//删除所有console语句
                    collapse_vars:true,//内嵌定义了只用到一次的代码
                    reduce_vars:true //提取出出现多次但是没有去定义或者变量去引用的静态值
                }
            }
        })
    ]
}
