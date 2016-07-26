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