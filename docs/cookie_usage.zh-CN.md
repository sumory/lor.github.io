---
title: 使用cookie
type: 高级
order: 203
---

<div class="placeholder"></div>

lor提供了一个内置的[cookie插件](https://github.com/sumory/lor/blob/master/lor/lib/middleware/cookie.lua)，只要像require其它模块一样加载就可使用。

**注意**:

- 在使用这个插件时，用户应该先了解[lua-resty-cookie](https://github.com/cloudflare/lua-resty-cookie)的API使用方式
- 生产项目中如有其它cookie需求，用户应**自行创建**一个插件或是库来管理cookie， 建议参考[lua-resty-cookie](https://github.com/cloudflare/lua-resty-cookie)的实现


lor提供的默认cookie插件使用方式如下:

```lua
local lor = require("lor.index")
local app = lor()

-- 加载cookie插件
local middleware_cookie = require("lor.lib.middleware.cookie")

-- 加载cookie插件后，`cookie`被注入到了`req`这个对象里
app:use(middleware_cookie())

-- 模拟cookie的写入
app:get("/set_cookie", function(req, res, next)
    -- 使用res.cookie.set这个API来写cookie
    req.cookie.set("test_cookie", "12345")
    res:send("cookie was set.")
end)

-- 模拟cookie的读取, 返回`12345`
app:get("/set_cookie", function(req, res, next)
    local test_cookie = req.cookie.get("test_cookie")
    res:send("cookie is:".. test_cookie)
end)

app:run()
```

关于此插件的使用还可参看Github上的两个issues： [#issues37](https://github.com/sumory/lor/issues/37) & [#issues35](https://github.com/sumory/lor/issues/35)
