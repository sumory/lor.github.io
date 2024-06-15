---
title: 基本用法
---

# {{ $frontmatter.title }}


## 路由风格

lor支持Sinatra风格的路由。

## 支持的HTTP Method

lor框架支持常见的各种HTTP请求方式， 包括但不限于get/post/put/delete/patch等等。

## 使用方式

挂载到app对象上的路由示例：

```lua
local lor = require("lor.index")
local app = lor()

app:get("/", function(req, res, next)
    res:send("hello world!")
end)

app:get("/user/find", function(req, res, next)
    res:send("this is sumory.")
end)

app:post("/user", function(req, res, next)
    -- ...
end)

app:delete("/user/:id", function(req, res, next)
    -- ...
end)

app:run()
```

挂载到group router(组路由)上的路由示例：

```lua
local lor = require("lor.index")
local app = lor()
local user_router = lor:Router()

user_router:get("/query", function(req, res, next)
end)

user_router:put("/create", function(req, res, next)
end)

app:use("/user", user_router())

app:run()
```


