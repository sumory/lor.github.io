---
title: 命令行工具lord
---
# {{ $frontmatter.title }}

<hr/>

lor提供了一个命令行工具`lord`来构建基于lor的项目骨架，此后开发者可以根据需要自行调整目录结构和代码.


在安装`lor`之后, 在终端输入`lord -h`即可查看有哪些命令可以使用:

```bash
$ lord -h
lor v0.3.4, a Lua web framework based on OpenResty.

Usage: lord COMMAND [OPTIONS]

Commands:
 new [name]             Create a new application
 start                  Start the server
 stop                   Stop the server
 restart                Restart the server
 version                Show version of lor
 help                   Show help tips
 path                   Show install path
```

## 创建项目

`lord new`命令创建一个项目骨架:

```bash
lord new lor_demo
```

进入lor_demo查看，一个lor项目就被创建好了，它的结构如下：

```bash
$ tree .
├── app
│   ├── main.lua
│   ├── middleware
│   │   ├── README.md
│   │   └── inject_app_info.lua
│   ├── router.lua
│   ├── routes
│   │   └── user.lua
│   ├── server.lua
│   ├── static
│   │   └── README.md
│   └── views
│       ├── index.html
│       └── user
│           └── info.html
├── conf
│   ├── README.md
│   ├── mime.types
│   └── nginx-dev.conf
├── reload.sh
├── start.sh
└── stop.sh
```


<p class="tip">生成的示例项目中包含了绝大部分API的使用方法。
请先阅读以上示例的代码， 在对`lor`框架熟悉之前，请不要随意删除文件或者修改代码位置，以免示例无法运行。
一旦熟悉了如何使用lor的路由和插件，你可以任意调整目录结构和模块引用方式，lor对此几乎没有任何限制。
</p>


## 启动项目

进入刚才创建的项目目录lor_demo, 然后执行`lord start`(或者执行sh start.sh)来启动项目:

```bash
$ cd lor_demo
$ lord start
```

现在打开浏览器，访问[http://localhost:8888](http://localhost:8888)来查看你的第一个lor项目吧.


