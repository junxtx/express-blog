# express-blog
一个基于node+mongo+express小博客，非常适合node初学者
最近读了朴灵《node.js实战》一书，发现里面的demo有好多地方有bug影响程序的运行，于是整理了一下自己搭了个简单的小博客，希望对大家有所帮助
## 1.准备工作
* 1）拉取项目git clone https://github.com/junxtx/express-blog.git
* 2）分别安装node，mongo，express

## 2.运行项目
* 运行npm install下载依赖
* 运行npm run start
* 打开浏览器输入http://localhost:3000/即可
 ## 3.配置数据库
* 找到settings文件
* module.exports = {
*    cookieSecret:"myApp",
*    db:"myApp",---》数据库名字配置
*    host:"localhost",---》数据库地址
*    port:27017---》数据库端口号
*}
*到此配置完成
 
 
