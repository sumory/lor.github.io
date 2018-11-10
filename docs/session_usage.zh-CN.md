---
title: 使用session
type: 高级
order: 204
---

<div class="placeholder"></div>


lor提供了一个内置的[session插件](https://github.com/sumory/lor/blob/master/lor/lib/middleware/session.lua)，它基于[lua-resty-session](https://github.com/bungle/lua-resty-session)来实现session管理。

**注意**:

- 在使用这个插件时，用户应该先了解[lua-resty-session](https://github.com/bungle/lua-resty-session)的相关API和使用方式
- lor提供的默认session使用了基于cookie的存储方式，但在实际项目中可能需要使用redis或memcache等来实现session管理，这时用户应自行创建一个lor插件来使用


lor提供的默认session的使用方式如下:

```lua
local lor = require("lor.index")
local app = lor()

-- 加载session插件
local session_middleware = require("lor.lib.middleware.session")
app:use(session_middleware({
    secret = "G3fu98Kor0rJrembv67fnhgl95FioRpQ", -- 加密用的盐
    timeout = 3600 -- session超时时间，默认为3600秒
}))

-- 模拟session的使用
-- 加载session插件后，`session`对象被注入到了`req`对象里

-- 在session里赋值
app:get("/session/set", function(req, res, next)
    local k = req.query.k
    local v = req.query.v
    if k then
        req.session.set(k,v)
        res:send("session saved: " .. k .. "->" .. v)
    else
        res:send("null session key")
    end
end)

-- 从session里取值
app:get("/session/get/:key", function(req, res, next)
    local k = req.params.key
    if not k then
        res:send("please input session key")
    else
        res:send("session data: " .. req.session.get(k))
    end
end)

-- 销毁session
app:get("/session/destroy", function(req, res, next)
    req.session.destroy()
end)

app:run()
```

