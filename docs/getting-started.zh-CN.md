---
title: 介绍
type: 基础
order: 0
---

## Lor 是什么



**Lor**是一个运行在[OpenResty](http://openresty.org)上的使用Lua编写的Web框架。 它兼顾开发效率和运行时性能， 可用于快速开发API Server和传统Web页面应用。

## 特性

- 路由采用[Sinatra](http://www.sinatrarb.com/)风格，结构清晰，易于编码和维护.
- API借鉴了[Express](http://expressjs.com)的思路和设计，Node.js跨界开发者可以很快上手.
- 支持多种路由，路由可分组，路由匹配支持正则模式.
- 支持middleware机制，可在任意路由上挂载中间件.
- 可作为HTTP API Server，也可用于构建传统的Web应用.


## 最简示例

让我们来看一下最简单的lor程序如何写。


``` lua
local lor = require("lor.index")
local app = lor()

app:get("/", function(req, res, next)
    res:send("hello world!")
end)

app:run()
```

就是如此简单！


## 示例项目

- [TODO示例](https://github.com/lorlabs/lor-example)， 快速入门基于lor的开发
- [OpenResty中国社区](https://github.com/sumory/openresty-china), 基于lor构建的完整web项目示例
- [Orange Gateway](https://github.com/sumory/orange)， OpenResty API网关
- [Lor Labs](https://github.com/lorlabs)， lor插件和实例项目


