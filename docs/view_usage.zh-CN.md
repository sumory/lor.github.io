---
title: 使用HTML模板
type: 高级
order: 202
---

<div class="placeholder"></div>

lor框架默认不开启HTML模板渲染功能，lor内部是通过lua-resty-template这个库来支持模板渲染的，开启方式如下。


```lua
local lor = require("lor.index")
local app = lor()

-- 模板配置
app:conf("view enable", true) -- 开启模板
app:conf("view engine", "tmpl") -- 模板引擎，lor目前只支持lua-resty-template，这个值暂时固定为"tmpl"
app:conf("view ext", "html") -- 模板文件后缀，可自定义
app:conf("views", "./app/views") -- 模板文件所在目录，可自定义，可为相对路径也可为绝对路径
```

之后就可以通过以下方式来渲染模板, 模板语法请参考lua-resty-template这个库:

```lua
app:get("/render_page", function(req, res, next)
    -- 渲染页面, 该模板文件应位于./app/views/example/page.html
    res:render("example/page", {
        name = "lor",
        desc = "a web framework"
    })
end)
```
