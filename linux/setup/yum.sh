# yum在线安装(网络来源)
# 光盘本地搭建yum源
#
# yum命令
# 查询
yum list
# 查询所有可用软件包列表

yum search 关键字
# 搜索服务器上所有和关键字相关的包

# 安装
yum -y install 包名
  install 安装
  -y 自动回答yes
# eg
# yum -y install gcc  # C语言编译器