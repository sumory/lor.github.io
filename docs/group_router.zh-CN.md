---
title: 组路由
type: 路由
order: 102
---


## 用途

Group Router即组路由，用于收纳一组相关的路由，比如同一业务对象的增删改查。


## 使用方式

我们声明一个group router叫user_router，在这个router完成用户的增删改查，示例代码如下

```lua
local lor = require("lor.index")
local app = lor()

-- 声明一个group router
local user_router = lor:Router()

user_router:get("/query", function(req, res, next)
end)

user_router:put("/create", function(req, res, next)
end)

user_router:post("/update", function(req, res, next)
end)

user_router:delete("/delete", function(req, res, next)
end)

-- 以middleware的形式将该group router加载进来
app:use("/user", user_router())

app:run()
```

之后就可以通过类似于`/user/query`, `/user/create`, `/user/update`, `/user/delete`来访问该router对应的业务了。
