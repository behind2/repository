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

		-rn: 列出路由列表, 功能和route命令一致

# 查看路由列表(可以看到网关)
route -n

# 临时设定网关
route add default gw <网关>
# 临时删除网关
route del default gw <网关>

# 域名与ip地址解析
nslookup [主机名或ip]

# ps linux连接数为0-255个, windows的2-4个(旧版本)。
# 登入
login
# 登出
logout