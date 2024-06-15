---
title: 安装
---

# {{ $frontmatter.title }}

<hr/>

Lor框架运行在OpenResty之上， 需要先安装OpenResty， 在安装OpenResty之后， 需要将`nginx`和`resty`命令添加到环境变量中。

## 安装说明

建议使用`Makefile`来安装lor， 安装成功后， 命令行工具`lord`和运行时包将被放到指定目录：

- `lord`命令行工具可用于生成项目骨架， 也可用于辅助开发(启动、关闭lor项目)，生产环境建议使用shell脚本或者其他方式来管理OpenResty上的lor程序
- `运行时包`指的是lor框架本身的代码，用户可以把lor框架理解为一个普通的第三方库，比如lua-resty-mysql、lua-resty-http等等

## 安装步骤

有3种方式来安装lor框架， 第一种方式为官方推荐使用的安装方式。

### 1）使用脚本安装(推荐)

使用Makefile安装lor框架:

```bash
git clone https://github.com/sumory/lor
cd lor
make install
```

默认`lor`的运行时lua文件会被安装到`/usr/local/lor`下， 命令行工具`lord`被安装在`/usr/local/bin`下。

如果希望自定义安装目录， 可参考如下命令自定义路径：

```bash
make install LOR_HOME=/path/to/lor LORD_BIN=/path/to/lord
```

执行**默认安装**后, lor的命令行工具`lord`就被安装在了`/usr/local/bin`下, 通过`which lord`查看:

```bash
$ which lord
/usr/local/bin/lord
```

`lor`的运行时包安装在了指定目录下, 可通过`lord path`命令查看。


### 2）使用opm安装

`opm`是OpenResty的官方包管理器，通过opm安装lor：

```bash
opm install sumory/lor
```

注意： 目前opm不支持安装命令行工具，所以此种方式安装后不能使用`lord`命令。


### 3）使用homebrew安装(社区贡献)

除使用以上方式安装外, Mac用户还可使用homebrew来安装lor, 该方式由[@syhily](https://github.com/syhily)提供， 更详尽的使用方法请参见[这里](https://github.com/syhily/homebrew-lor)。

```bash
$ brew tap syhily/lor
$ brew install lor
```



至此，lor已成功安装到您的系统中。
