# sudo权限
# 把本来只能超级用户执行的命令赋予普通用户执行
# sudo的操作对象是系统命令

# visudo 实际修改的是 /etc/sudoers文件

# demo
# root  ALL=(ALL)   ALL
# 用户名（可以使用sudo的用户）   被管理主机的地址=（可使用的身份）授权命令（绝对路径）
# user1   ALL=(ALL)   /sbin/shutdown
#
#
# %wheel  ALL=(ALL)   ALL
# %组名    被管理主机的地址=（可使用的身份）授权命令（绝对路径）

# su - user1  切换用户
# sudo -l 查看可用的sudo命令
#