# rpm 安装
rpm -ivh 包全名
-options
	-i (install) 安装
	-v (verbose) 显示详细信息
	-h (hash) 显示进度
	--nodeps 不检测依赖性


# rpm 包升级
rpm -Uvh 包全名
-options
	-U (upgrade) 升级


# rpm 卸载
rpm -e 包名
-options
	-e (erase) 卸载
	--nodeps 不检测依赖性


# rpm 查询命令
rpm -q 包名
# 查询包是否安装
	-q (query) 查询
	-a (all) 所有


# rpm 查询软件包详细信息
rpm -qi 包名
	-i (information) 查询软件信息
	-p (package) 查询未安装包信息


#
