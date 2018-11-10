---
title: 从0.2.*迁移到0.3.*版本
type: 其它
order: 301
---

Lor v0.2.\* 是上个稳定版本， 之后将不再在此版本上添加新特性， 建议尽快升级到最新的0.3稳定版本。
0.3版本的API与0.2.*保持兼容，同时提供更强大易用的功能。



## 404错误中间件的变更

0.2.\*版本的404错误需要在**最后一个**`app:use`业务中间件来捕获， 而其它错误（如500错）需要通过`app:erroruse`错误中间件来捕获， 如下：

```lua
-- 业务中间件
app:use(function(req, res, next)
    -- do something
    next()
end)

-- 其它业务路由处理
-- router(app)

-- 最后一个`业务中渐渐`来处理404错误
app:use(function(req, res, next)
    if req:is_found() ~= true then
        res:status(404):send("404! sorry, not found.")
    end
end)

-- 其它错误处理， 比如500错
app:erroruse(function(err, req, res, next)
    ngx.log(ngx.ERR, err)
    res:status(500):send("500! unknown error.")
end)
```

从0.3.0版本开始， 将把**404错误**当做普通的错误情况对待，也就是统一通过`app:erroruse`错误中间件来捕获， 即应将上述代码修改为类似以下格式的写法：

``` lua
-- 业务中间件
app:use(function(req, res, next)
    -- do something
    next()
end)

-- 其它业务路由处理
-- router(app)

-- 错误处理， 如404错、 500错等等
app:erroruse(function(err, req, res, next)
    ngx.log(ngx.ERR, err)

    if req:is_found() ~= true then
        res:status(404):send("404! sorry, not found. " .. (req.path or ""))
    else
        res:status(500):send("unknown error")
    end
end)
```

## 路由加载顺序和执行顺序

0.2.*版本， 路由的`加载顺序`和`匹配顺序`是跟代码编写顺序相关的, 而0.3.0对此做了更改， 它们的差异主要表现在以下两种用例上。

### 用例1

```lua
app:use("/user", function(req, res, next) next() end)  --①
app:use("/user/foo", function(req, res, next) next() end) --②
app:use("/user/foo", function(req, res, next) --③
    res:send("this is foo")
end)
```

对于0.2.*版本来说：

- 在访问"/user/foo"时， 会依次执行①②中间件，以及最后的③业务处理代码。 若将②中间件代码写在①前面，则先执行②在执行①， 即中间件的执行顺序与其定义顺序是关联的。
- 在访问"/user/not_exist"时， 会依次执行①②中间件, 但不会执行③， 因为它不匹配业务路由"/user/foo"

然而对于0.3.0版本来说：

- 在访问"/user/foo"时， 会依次执行①②中间件，以及最后的③业务处理代码
- 在访问"/user/not_exist"时， 不会执行③， **也不会**执行①②中间件, 因为0.3.0版本对0.2.\*版本的逻辑做了更改， 如果一个请求没有匹配（发生了404错误）到任何业务路由, 则不会执行任何中间件代码，即使它的uri能匹配到某些中间件。

### 用例2

对于0.2.*版本， 错误中间件即`app:erroruse`只能定义在所有路由的后面， 但0.3.0打破了此限制， 业务中间价和错误处理中间价的定义可以放在任意地方， 不再与定义顺序强相关。


## 其它更改和改进

- 路由匹配优先级， 请参考[路由优先级](/guide/route_priority.html)
- 路由支持严格模式和非严格模式， 详细请参考[路由模式](/guide/strict_route.html)
- 增强业务路由pipeline， 请参考[多级处理函数](/guide/multi_business_middleware.html)
