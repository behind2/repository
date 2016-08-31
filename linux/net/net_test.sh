# 网络测试命令
ping [-options] <ip|域名>

		-c 次数：指定ping包的次数

# 远程管理与端口探测命令
telnet [域名或IP] [端口]
# ps telnet 192.168.0.252 80

# 路由跟踪命令
traceroute [-options] ip或域名
			-n	使用ip, 不适用域名, 速度更快

# 下载命令
wget

# linux抓包命令
tcpdump
选项：
	-i 		指定网卡接口(指定要监听的网卡)
	-nn 	将数据包中的域名与服务转为ip和端口
	-X 		以十六进制和ASCII码显示数据包内容
	port 	指定监听的端口
# ps:
# tcpdump -i eth0 -nnX port 21

