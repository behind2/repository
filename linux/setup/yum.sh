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

# 升级
yum -y update 包名
  update 升级
  -y 自动回答yes

# 卸载
yum -y remove 包名
  remove 卸载
  -y 自动回答yes

# yum 软件组管理命令
yum grouplist
# 列出所有可用的软件组列表

yum groupinstall 软件组名
# 安装指定软件组，组名可以由grouplist查询出来

yum groupremove 软件组名
# 卸载指定软件组