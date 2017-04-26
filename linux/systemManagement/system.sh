# 系统管理

# 进程管理
# 判断服务器健康状态
# 查看系统中所有进程
# 杀死进程


# 进程的查看PS命令
ps -aux
# 查看系统中所有进程, 使用BSD操作系统格式
ps -le
# 查看系统中所有进程, 使用linux标准命令格式
# 选项
# -a 显示一个终端的所有进程, 除了会话引线
# -u 显示进程的归属用户及内存的使用情况
# -x 显示没有控制终端的进程
# -l 长格式显示. 显示更加详细的信息
# -e 显示所有进程, 和-A作用一致


# 进程的查看top命令
# top [选项]
# -d 秒数:指定top命令每隔几秒更新. 默认是3秒
# -b: 使用批处理模式输出. 一般和"-n" 选项合用.
# -n次数: 指定top命令执行的次数. 一般和"-b" 选项合用.

# 在top命令的交互模式当中可以执行的命令:
# ?/h: 显示交互模式的帮助
# P: 以CPU使用率排序, 默认此项
# M: 以内存的使用率排序
# N: 以PID排序
# q: 退出top

# 杀死进程
kill -l <pid>
# 查看可用的进程信号

# killall [选项][信号] 进程名
# 按照进程名杀死进程
# 选项
# -i: 交互式, 询问是否要杀死某个进程
# -I: 忽略进程名的大小写

# pkill [选项][信号] 进程名
# 按照进程名终止进程
# 选项
# -t 终端号: 按照终端号踢出用户


# 修改进程优先级
# nice [选项] 命令
# nice命令可以给新执行的命令直接赋予NI值, 但是不能修改已经存在进程的NI值
# 选项
# -n NI值: 给命令赋予NI值
# 例如
nice -n -5 service httpd start

# renice [优先级] PID
# renice命令是修改已经存在进程的NI值的命令
# 例如
# renice -10 2125


# [linux]工作管理简介
jobs



# 把进程放入后台
# 加入&, 并在后台执行
# 按下ctrl+z快捷键, 放在后台暂停
jobs [-l]
# 选项
# -l: 显示工作的PID(进程号)
# 注：
# "+" 号代表最近一个放入后台的工作, 也是工作恢复时, 默认恢复的工作.
# "-" 号代表倒数第二个放入后台的工作.

# 恢复到前台执行
fg %工作号
# 参数
# -%工作号： %号可以省略, 但是注意工作号和PID的区别
#
# 把后台暂停的工作恢复到后台执行
bg %工作号
# 注:后台恢复执行的命令, 是不能和前台有交互的, 否则不能恢复到后台执行


# 后台命令脱离终端
nohup [命令] &


# 系统资源查看
vmstat [刷新延时 刷新次数]
# demo
vmstat 1 3


# 内核自检信息
dmesg


# 查看内存使用状态
free [-b|-k|-m|-g]


# 查看cpu信息
cat /proc/cpuinfo


# 显示系统的启动时间和平均负载
uptime


# 查看系统与内核相关信息
uname [选项]
# -a: 查看系统所有相关信息
# -r: 查看内核版本
# -s: 查看内核名称


# linux发行版
lsb_release -a



# 查看进程打开或使用的文件信息
lsof [选项]



# 系统定时任务
# at一次执行
# at服务是否安装
chkconfig --list | grep atd

# at服务的启动
service atd restart

# at [选项] 时间
#
# 查询当前服务器上的at工作
# atq
#
# 删除指定的at任务
# atrm [工作号]


# crontab循环定时任务
service crond restart
chkconfig crond on

# crontab [选项]
# 选项
# -e: 编辑crontab定时任务
# -l: 查询crontab任务
# -r: 删除当前用户所有的crontab任务



# 系统的crontab设置


# anacron配置总结