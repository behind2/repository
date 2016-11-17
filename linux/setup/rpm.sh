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


# 查询包中文件安装位置
rpm -ql	包名
	-l (list, location) 列表
	-p (package) 查询未安装包信息

# rpm包默认安装路径
/etc/ 						配置文件安装目录
/usr/bin/					可执行命令安装目录
/usr/lib/					程序所使用的函数库保存位置
/usr/share/doc/		基本软件使用手册保存位置
/usr/share/man/		帮助文件保存位置

# 查询系统文件属于哪个rpm包
rpm -qf	系统文件名
	-f (file) 查询系统文件属于哪个软件包(file)

# 查询软件包的依赖性
rpm -qR 包名
	-R (requires) 查询软件包的依赖性
	-p (package) 查询未安装包信息

# rpm包校验
rpm -V 已安装的包名
	-V (verify) 校验指定rpm包中的文件

# rpm包中文件提取
rpm2cpio 包全名 | cpio -idv .文件绝对路径
	-rpm2cpio 将rpm包转换为cpio格式的命令
	-cpio 是一个标准工具，它用于创建软件【档案文件】和从【档案文件】中提取文件

# cpio格式
cpio 选项 < [文件|设备]
# 选项 	提取文件的标准选项
	-i copy-in模式, 还原
	-d 还原时自动新建目录
	-v 显示还原过程
