---
title: RESTful 示例
type: 基础
order: 4
---

> lor对构建RESTful风格应用提供了良好支持。

```lua
local lor = require("lor.index")
local app = lor()
local userRouter = lor:Router()

userRouter:get("/find/:id", function(req, res, next)
    local query_id = tonumber(req.params.id)
    res:render("user/info", {
        id = query_id,
        name = "user" .. query_id,
    })
end)

userRouter:delete("/delete", function(req, res, next)
    local id = req.query.id
    res:html("<span>succeed to delete user</span>")
end)

userRouter:put("/modify/:id", function(req, res, next)
    local id = req.params.id
    local new_name = req.query.new_name

    res:send("succeed to modify user[" .. id .. "]")
end)

userRouter:post("/create", function(req, res, next)
    local id = req.body.id
    local name = req.body.name

    return res:json({
        success = true,
        msg = "succeed to create new user."
    })
end)

app:use("user", userRouter())

app:get("/", function(req, res, next)
    res:send("Hello world!")
end)

app:erroruse(function(err, req, res, next)
    if req:is_found() ~= true then
        res:status(404):send("404! page not found!")
    else
        ngx.log(ngx.ERR, err)
        res:status(500):send("unknown error")
    end
end)

app:run()
```
