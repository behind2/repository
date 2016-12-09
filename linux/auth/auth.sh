# 权限管理
# 文件基本权限
# 基本权限的修改
# -rw-r--r--
# - 文件类型(-文件  d目录  l软连接文件)
#   u所有者    g所属组    o其他人
#   r 读       w 写       x 执行
#
# 修改权限chmod [选项] 模式 文件名
#     选项
#         -R 递归
#     模式
#         [ugoa][+-=][rwx]
#         [mode=421]
#     权限的数字表示
#         r ---- 4
#         w ---- 2
#         x ---- 1
#
# 权限对目录的作用
#
# 修改文件的所有者
# chown 用户名 文件名
#
# 修改文件的所属组
# chgrp 组名 文件名
#
# 文件默认权限