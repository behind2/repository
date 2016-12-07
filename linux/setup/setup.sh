# 软件安装
#
# 软件包分类
# 源码包 => [为了降低难度, 写的脚本安装包]
# 二进制包(RPM包[二进制包管理器]、系统默认包, win上的.exe都是二进制包)
#
# rpm包在系统光盘中
# 最令人恶心的是它的依赖性
#
# yum 对 rpm 做了升级改良
#
#
# linux中源码包与RPM包区别
# 安装位置不同
# rpm包不建议指定安装位置, 安装目录到处都是;
# 源码包建议安装目录: /usr/local/软件名, 没有卸载命令, 直接删除安装目录.
#
# make 编译
# make clean
# make install 编译安装