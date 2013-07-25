# KISSY 项目构建工具，Generator-clam

![](http://img04.taobaocdn.com/tps/i4/T1C5hpXwXeXXbkQf6j-210-45.jpg)

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

## 再多了解一点CLAM

掌握上面这些命令，你可以完成前端开发/构建/发布的全流程，你需要多了解一点Clam。

### Clam 对项目的定义

根据适用范围，代码被分割为三层进行管理

- 项目（代码集合最大单位）
- 模块（业务功能单元，部分业务之间可共用）
- 组件（可全局共用）

最初Clam独立出了Page，Page本身也是一个模块，统一用模块来管理。

### Clam 格式的项目构建方式

*创建新项目*

`yo clam`会生成项目的Gruntfile.js，用来执行grunt构建，项目代码的合并、抽取、解析、压缩等操作都在Grunt中执行。所以，涉及到工具操作的场景里，*你将会有80%的时间花费在修改Gruntfile.js上*。所以，刚开始应当多花精力学通Grunt。

*接手项目*

如果你要接手一个项目，代码检出后即可进行调试，若要打包，则需要运行npm install。 

*标准格式的KISSY组件*

KISSY标准组件的构建使用`yo kissy-gallery x.y`，已经被映射为`yo clam:widget`，KISSY标准组件是可以直接构建为可发布到淘宝CDN的代码，并提交至`kissy gallery`中。因此，你的项目中所有widgets都应当和KISSY标准组件格式保持一致，可以：

- 被build在当前项目中
- 提交至[KISSY官方](http://gallery.kissyui.com)

### Demo的运行

clam提供一个轻服务（只提供静态文件服务器、[Flex-Combo](http://npmjs.org/flex-combo) 和SSI支持），比如，启动服务后你可以这样访问

	http://localhost:8888/src/pages/detail.html?ks-debug

这里的SSI兼容apache，但这个Server还是功能很弱，且不支持脚本，我们强烈建议您使用更成熟的apache+php来作为本地demo服务，Clam只作为构建工具使用。

### 预发和发布

为了限制在daily分支上发布，我们将grunt构建也加了限制，非daily分支上禁止构建，（你当然可以随意修改Gruntfile.js去掉限制），只有build目录中的文件会被发布，所发布的项目中build目录中的文件地址为，前缀自选

	http://a.tbcdn.cn/g/group-name/project-name/x.y.z/mods.js

对应到`g.tbcdn.cn`的地址：

	http://g.tbcdn.cn/group-name/project-name/x.y.z/mods.js

### 这个clam和陶清维护的clam有啥区别

- 相同点：理论基础一致
- 不同点：`yo clam` 需要配合Grunt来使用，实质是将你引路到Grunt领域；`clam`想自己成为另一个Grunt。

何时选择何种方案：

- generator-clam 适用于大多数项目，特别是在反复调试/测试/预发/发布的场景中，当你的项目可以比较多的抽离出组件，你又想将这些组件push到kissy gallery中，只能用他。
- clam 适用于页面结构较为固定且页面数量不多的场景。

## TODO

- include JS和CSS文件的提取合并
- JSON接口模拟和映射
- JS2PHP的解析