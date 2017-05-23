# 显示系统信息
uname -o
# 输出操作系统名称

# 登录linux系统前的显示信息
cat /etc/issue

# 显示计算机类型
uname -m

# 显示操作系统发行编号
uname -r

# 显示主机名
uname -n
# 或者
hostname

# 显示内网ip
hostname -I

# 显示公网ip
curl -s http://ipecho.net/plain

# DNS
cat /etc/resolv.conf | grep -E "\<nameserver[ ]+" | awk '{print $NF}'

# 是否有网络连通
ping -c 2 imooc.com

# 当前登录的用户数
who

