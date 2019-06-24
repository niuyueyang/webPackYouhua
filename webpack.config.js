const path=require('path');
const webpack=require('webpack');
const base=require('./webpack.base.config');
const merge=require('webpack-merge');//合并文件
const NODE_ENV=process.env.NODE_ENV;
var other;
if(NODE_ENV=='development'){
    other=require('./webpack.dev.config');
}
else{
    other=require('./webpack.prod.config');
}
module.exports=merge(base,other);
