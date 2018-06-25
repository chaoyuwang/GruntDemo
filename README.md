* Grunt 配置
> 一个简单的Grunt配置文件 Gruntfile.js   
> 实现以下功能 
> * 合并文件 
> * 压缩js、css和html 
> * css自动添加前缀 
> * scss 编译 
> * css、js添加版本号并在html中自动引入 
> * 图片压缩 
> * 监听自动化 
> * 建立开启服务 

* 项目运行
```
git clone https://github.com/chaoyuwang/GruntDemo.git

npm install

grunt

http://localhost:8000
```

* 目录

```
...
├── src                                      // 项目静态页
├── ├── css                                  // css文件
├── ├── scss                                 // scss文件
├── ├── images                               // images文件
├── ├── js                                   // js脚本
├── ├── temp                                 // 本项目模拟数据文件
├── └── index.html                           // index
├── Gruntfile.js                             // Grunt配置文件
├── package.json                             // package
...
```