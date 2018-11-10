---
title: 路由优先级
type: 路由
order: 104
---

>此文档适配于lor v0.3.0+版本

在匹配的时候将优先匹配精确路由，其次再匹配通配符路由（named route),如以下示例：

```lua
app:get("/test", function(req, res, next) --①
    res:send("test")
end)

app:get("/test/exact", function(req, res, next) --②
    res:send("exact")
end)

app:get("/test/:foo", function(req, res, next) --③
    local param = req.params.foo
    res:send(param)
end)
```

访问以下url时对应的路由分别是：

- "/test": 由路由①处理
- "/test/exact": 查找到`app:get("/test/exact")`, 所以由路由②处理
- "/test/other": 没有查找到精确路由，但查找到了named router(`app:get("/test/:foo")`), 所以由路由③处理
- "/test/other/bar": 没有查找到任何路由， 返回`404`错误


