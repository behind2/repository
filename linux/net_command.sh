# 查看与配置网络状态命令
ifconfig

# ps
# windows 上可以使用 ipconfig


# 禁用该网卡设备
ifdown <网卡设备名>

# 启用该网卡设备
ifup <网卡设备名>


# 网络状态查询命令
netstat [-options]
		-t: 列出tcp协议端口
		-u: 列出udp协议端口
		-n: 不使用域名与服务名, 而使用IP地址和端口号
		-l: 仅列出在监听状态的网络服务
		-a: 列出所有的网络连接

# 登入
login
# 登出
logout