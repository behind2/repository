# 查看系统运行级别
runlevel

# 修改系统运行级别
init <0-6>  0 关机   6 重启 【并不可靠】

# 修改系统默认运行级别
vim /etc/inittab
# 系统开机后直接进入哪个运行级别




# 服务管理
# 源码包服务 独立的服务
# RPM包安装的服务
chkconfig  --list
# 查看服务自启动状态, 可以看到所有RPM包安装的服务

# 源码包安装的服务
# 查看服务安装的位置, 一般是/usr/local/下


# 服务与端口
/etc/services

netstat -tlunp
  # -t 列出tcp数据
  # -u 列出udp数据
  # -l 列出正在监听的网络服务（不包含已经链接的网络服务）
  # -n 用端口号来显示服务, 而不是用服务名
  # -p 列出该服务的进程ID(PID)

  # 会列出系统中所有的已经启动的服务



# RPM包服务管理
# 源码包安装在指定位置, 一般是/usr/local/ 【unix system resource, 即Unix系统资源的缩写】
# RPM包安装在默认位置


# RPM包服务管理【独立的服务启动】(通过绝对路径启动)
/etc/init.d/<独立服务名>
# start | stop | status | restart

service <独立服务名>
# start | stop | status | restart


# 独立服务的自启动
chkconfig [--level 运行级别] [独立服务名] [on|off]
# 修改/etc/rc.d/rc.local文件
# 使用ntsysv命令管理自启动