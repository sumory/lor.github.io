---
title: 将lor当做一个库使用
type: 高级
order: 205
---

<div class="placeholder"></div>

lor是一个框架， 也是一个library，可以像其他`库`或`工具包`一样使用。不用安装，直接使用它来构建一个基于OpenResty的项目，步骤如下：


- 新建一个空白文件夹作为项目目录，如mkdir /tmp/myproject
- 下载lor，git clone https://github.com/sumory/lor, 将`lib/lor`文件夹拷贝在/tmp/myproject下，并取名为`lor`
- 新建一个app文件夹，作为代码目录， 新建conf文件夹和nginx.conf作为配置文件，新建logs文件夹用于存放日志，当前目录结构如下：

    ```
    myproject
    ├── app
    ├── conf
    │   └── nginx.conf
    ├── logs
    └── lor
        ├── index.lua
        ├── version.lua
        └── lib
    ```

- 在app文件夹下新建一文件server.lua用于配置lor和加载各个路由，代码如下：

    ```lua
    local lor = require("lor.index")
    local app = lor()

    -- 模板配置
    app:conf("view enable", true)
    app:conf("view engine", "tmpl")
    app:conf("view ext", "html")
    app:conf("view layout", "")
    app:conf("views", "./app/views")

    -- hello world
    app:get("/index", function(req, res, next)
        res:send("hello world!")
    end)

    -- 错误处理中间件
    app:erroruse(function(err, req, res, next)
        ngx.log(ngx.ERR, err)

        if req:is_found() ~= true then
            res:status(404):send("404! sorry, not found. ")
        else
            res:status(500):send("internal error")
        end
    end)

    return app
    ```

- 在app文件夹下新建一文件main.lua作为项目入口，代码如下：

    ```lua
    local app = require("app.server")
    app:run()
    ```

- 新建nginx配置文件nginx.conf，加入以下配置。 即在`lua_package_path`中指定lor目录`lor`和我们自己编写的代码所在目录`app`,并在`content_by_lua_file`阶段指定我们刚才编写的项目入口文件。

    ```sh
    # 注意这里只是为了演示的最简配置，实际项目中要根据项目需要自行配置
    pid logs/nginx.pid;
    worker_processes 4;
    events {
        worker_connections 4096;
    }

    http {
        lua_package_path "./app/?.lua;./lor/?.lua;;";

        server {
            listen 8888;

            access_log logs/access.log combined buffer=16k;
            error_log logs/error.log;

            location / {
                content_by_lua_file ./app/main.lua;
            }
        }
    }
    ```

- 至此，所有准备工作已经完成，目录结构如下

    ```
    myproject
    ├── app
    │   └── main.lua
    ├── conf
    │   └── nginx.conf
    ├── logs
    └── lor
        ├── index.lua
        ├── version.lua
        └── lib
    ```

- 使用以下命令启动本项目

    ```
    nginx -c ./conf/nginx.conf -p `pwd`
    ```

启动后，访问http://localhost:8888/index, 就会出现我们熟悉的`Hello World!`
