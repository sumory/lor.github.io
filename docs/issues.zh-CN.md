---
title: 常见问题
type: 高级
order: 201
---

### 静态文件无法加载

可能原因

1） nginx.conf里没有配置mime.types，在http里加入即可，注意路径

```
http {
    include /opt/server/nginx/conf/mime.types;
    ...
}
```

2） 静态文件的location配置有问题，检查nginx相关配置


### **安装结束后无法使用lord命令**

1） 请检查要安装的路径是否有权限

默认情况下，`make install`会把`lord`命令安装到/usr/local/bin，把lor的包安装到/usr/local/lor，请确认当前安装的用户是否对这两个目录有操作权限

2） 特别注意安装时的输出日志，比如执行sh install.sh时正常输出日志如下：

```bash
$ make install
install lor runtime files to /usr/local/lor
lor runtime files installed.
install lord cli to /usr/local/bin/
lord cli installed.
lor framework installed successfully.
```

3） lord命令使用到了`resty`和`nginx`两个命令

- resty和nginx都是在安装OpenResty时一同安装的两个命令行工具
- 在命令行环境中要能直接执行`nginx`和`resty`，比如`resty -v`和`nginx -v`能正常输出。
- 若不知道如何将resty、nginx命令加入到环境变量中，请自行google、百度。

### **我的lor到底安装在了哪里**

通过lord path命令查看, 如

```bash
$ lord path
/usr/local/lor
```

意思是本机器上的lor框架安装到了/usr/local/lor目录下

