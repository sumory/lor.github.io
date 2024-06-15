---
title: 多级处理函数
---

# {{ $frontmatter.title }}


>此文档适配于lor v0.3.0+版本

从v0.3.1版本开始`多级处理函数`即可挂载在`app`对象上，也可以挂载到`组路由`上。

## 函数格式

lor的路由支持多个处理函数， 凡是符合以下格式的函数都可作为lor的路由处理函数：

```lua
function(req, res, next)
    -- ...
end
```

## 使用方式

使用时只要将各个处理函数按顺序串联起来即可， 注意只有在调用`next（）`函数时， 这个执行链才会往后执行。

### 数组方式

```lua
local lor = require("lor.index")
local app = lor()

local func1 = function(req, res, next)
    -- do something
    next()
end

local func2 = function(req, res, next)
    -- do something
    next()
end

local last_func = function(req, res, next)
    res:send("end.")
end

app:get("/",  {func1, func2, last_func})

app:run()
```

### 变长参数方式

```lua
local lor = require("lor.index")
local app = lor()

local func1 = function(req, res, next)
    req.params.count = 0
    req.params.count = req.params.count + 1
    -- do something
    next()
end

local func2 = function(req, res, next)
    req.params.count = req.params.count + 1
    -- do something
    next()
end

local last_func = function(req, res, next)
    res:send("the `count` param is:" .. req.params.count)
end

app:get("/", func1, func2, last_func)

app:run()
```

### 混合格式参数

```lua
local lor = require("lor.index")
local app = lor()

local func1 = function(req, res, next)
    req.params.count = 0
    req.params.count = req.params.count + 1
    -- do something
    next()
end

local func2 = function(req, res, next)
    req.params.count = req.params.count + 1
    -- do something
    next()
end

local last_func = function(req, res, next)
    res:send("the `count` param is:" .. req.params.count)
end

app:get("/", {func1, func2}, last_func)
-- app:get("/", func1, {func2}, last_func) --支持function数组格式和普通function混合
-- app:get("/", func1, {func2, last_func})

app:run()
```

## 用途、场景

当需要在某个路由处理前进行一些通用的逻辑处理， 如编解码、参数检查、登录状态检查等， 但又不想通过`app:use`编写单独的中间件处理， 这时就可在前面添加这些处理函数, 示例如下：

```lua
local lor = require("lor.index")
local app = lor()

local check_name = function(req, res, next) --①
    if not req.query.name or req.query.name == "" then
        res:send("error param: name")
    else
        next()
    end
end

local check_age = function(req, res, next) --②
    local age = req.query.age
    if age and tonumber(age) > 0 then
        next()
    else
        res:send("error param: age should be larger than 0")
    end
end

local save_user = function(req, res, next) --③
    res:send("save user:" .. req.query.name .. " " .. req.query.age)
end

app:get("/user/save", check_name, check_age, save_user)

app:run()
```

访问以下url时对应的处理分别是：

- "user/save": 不满足check_name,所以返回`error param: name`
- "/user/save?name=sumory": 满足check_name但不满足check_age，所以返回`error param: age should be larger than 0`
- "/user/save?name=sumory&age=10": 满足所有多级中间件函数， 故经过①②③处理后返回`save user:sumory 10`

