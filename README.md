# Generator-clam

![](http://img04.taobaocdn.com/tps/i4/T1C5hpXwXeXXbkQf6j-210-45.jpg)

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## clam 命令

安装

	npm install -g yo generator-clam generator-kissy-gallery

打印帮助

	yo clam:h

初始化Project

	yo clam

初始化一个模块

	yo clam:mod

初始化一个标准kissy组件，首先创建组件空目录

	yo clam:widget

生成一个标准kissy组件的版本，进入到组件跟目录

	yo clam:widget x.y

其中x.y是版本号

启动web服务

	yo clam:on

> 服务支持SSI

## Grunt 内嵌命令

执行构建

	grunt

执行预发

	grunt prepub

执行发布

	grunt publish

查看当前库git地址

	grunt info

创建新分支

	grunt newbranch

监听文件修改，实时编译

	grunt listen

