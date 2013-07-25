# Generator-clam

![](http://img04.taobaocdn.com/tps/i4/T1C5hpXwXeXXbkQf6j-210-45.jpg)

[![Build Status](https://secure.travis-ci.org/jayli/generator-clam.png?branch=master)](https://travis-ci.org/jayli/generator-clam)

A generator for Yeoman.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-clam`
- Run: `yo clam`

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## clam 命令

安装clam

	npm install -g yo generator-clam

初始化Project

	yo clam

初始化一个模块

	yo clam:mod

启动服务

	yo clam:on

## Widget 创建

组件创建使用kissy-generator工具
	
	npm install -g generator-kissy-gallery

初始化一个widget

	yo kissy-gallery 1.0

## 打印帮助

	yo clam:h

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

