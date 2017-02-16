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






# 文件特殊权限
# SetUID
# 详见
# ll /etc/shadow
# ll /usr/bin/passwd 拥有s权限, s = S + x, (s权限等于大S权限加执行权限)
#
# 设定SetUID的方法
# 4代表SUID
#   chmod 4755 文件名
#   chmod u + s 文件名
# 取消SetUID的方法
#   chmod 0755 文件名
#   chmod u - s 文件名
#
# SetGID
# 2代表SGID
#   chmod 2755 文件名
#   chmod g + s 文件名
# 取消SetGID
#   chmod 0755 文件名
#   chmod g - s 文件名
#
# Sticky BIT(针对目录生效)
# 设置取消粘着位
# 设置粘着位
#   chmod 1757 目录名
#   chmod o + t 目录名
#
# 取消粘着位
#   chmod 0777 目录名
#   chmod o - t 目录名
#