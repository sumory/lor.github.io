---
title: 直接挂载到组路由
type: 路由
order: 105
---

>此文档适配于lor v0.3.1+版本


从v0.3.1版本开始， 形如`/test`可以直接在组路由里挂载， 而不必再使用`app:get("/test", function(req, res, next) ... end)`的方式挂载到app上。

使用方式如下：

```lua
local test_router = lor:Router()

local func1 = function(req, res, next)
    res:send("get /test")
end

local func2 = function(req, res, next)
    res:send("post /test")
end

test_router:get(func1) -- get方式访问/test
test_router:post(func2) -- post方式访问/test
app:use("/test", test_router())
```

