---
title: 路由模式
type: 路由
order: 106
---

>此文档适配于lor v0.3.0+版本

从lor v0.3.0开始提供一个配置项`strict_route`， 默认值为true， 用于区分匹配路由时是否按照**严格模式**来匹配。具体介绍请参看如下示例：

## 非严格匹配

### 示例一

采用非严格模式匹配， 即不严格区分'/test'和'/test/'

```lua
app:conf("strict_route", false) --

app:get("/test", function(req, res, next) --①
    res:send("test")
end)

app:get("/test/:foo", function(req, res, next) --②
    local param = req.params.foo
    res:send("named route: " .. param)
end)
```

访问以下url时对应的路由分别是：

- "/test": 由路由①处理, 返回`test`
- "/test/": 没有查找到精确路由"/test/", 但查找到了查找到named router(`app:get("/test/:foo")`), 所以由路由②处理， 但此时req.params.foo参数实际为空字符串， 所以返回`named route:`

### 示例二

采用非严格模式匹配， 即不严格区分'/test'和'/test/', 这里跟`示例一`不同的是多了一个精确路由`app:get("/test/", ...)`

```lua
app:conf("strict_route", false) --

app:get("/test", function(req, res, next) --①
    res:send("test")
end)

app:get("/test/", function(req, res, next) --②
    res:send("exact route: /test/")
end)

app:get("/test/:foo", function(req, res, next) --③
    local param = req.params.foo
    res:send("named route: " .. param)
end)
```

访问以下url时对应的路由分别是：

- "/test": 由路由①处理, 返回`test`
- "/test/": 查找到了精确路由"/test/", 所以返回`exact route: /test/`

### 示例三

采用非严格模式匹配， 这里跟`示例一`和`示例二`不同的是仅有一个路由`app:get("/test", ...)`

```lua
app:conf("strict_route", false) --

app:get("/test", function(req, res, next) --①
    res:send("test")
end)
```

访问以下url时对应的路由分别是：

- "/test": 由路由①处理, 返回`test`
- "/test/": 仍然由路由①处理, 返回`test`

## 严格匹配

### 示例一

采用严格模式匹配， 即严格区分'/test'和'/test/'

```lua
app:conf("strict_route", true) --

app:get("/test", function(req, res, next) --①
    res:send("test")
end)

app:get("/test/:foo", function(req, res, next) --②
    local param = req.params.foo
    res:send("named route: " .. param)
end)
```

访问以下url时对应的路由分别是：

- "/test": 由路由①处理, 返回`test`
- "/test/": 没有查找到精确路由"/test/", 但查找到了查找到named router(`app:get("/test/:foo")`), 所以由路由②处理， 但此时req.params.foo参数实际为空字符串， 所以返回`named route:`

### 示例二

采用严格模式匹配， 即严格区分'/test'和'/test/', 这里跟`示例一`不同的是多了一个精确路由`app:get("/test/", ...)`

```lua
app:conf("strict_route", true) --

app:get("/test", function(req, res, next) --①
    res:send("test")
end)

app:get("/test/", function(req, res, next) --②
    res:send("exact route: /test/")
end)

app:get("/test/:foo", function(req, res, next) --③
    local param = req.params.foo
    res:send("named route: " .. param)
end)
```

访问以下url时对应的路由分别是：

- "/test": 由路由①处理, 返回`test`
- "/test/": 查找到了精确路由"/test/", 所以返回`exact route: /test/`

### 示例三

采用严格模式匹配， 这里跟`示例一`和`示例二`不同的是仅有一个路由`app:get("/test", ...)`

```lua
app:conf("strict_route", true) --

app:get("/test", function(req, res, next) --①
    res:send("test")
end)
```

访问以下url时对应的路由分别是：

- "/test": 由路由①处理, 返回`test`
- "/test/": 没有找到匹配的路由, 返回`404`错误

### 示例四

采用严格模式匹配， 这里仅有一个路由`app:get("/test/", ...)`

```lua
app:conf("strict_route", true) --

app:get("/test/", function(req, res, next) --①
    res:send("test/")
end)
```

访问以下url时对应的路由分别是：

- "/test": 没有找到匹配的路由, 返回`404`错误
- "/test/": 由路由①处理, 返回`test`

