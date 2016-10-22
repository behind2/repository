# 查看 dns 的相关命令
#
# 查看dns SOA对应的记录
host -t SOA baidu.com
host -t NS baidu.com
host -t A baidu.com

# nslookup
nslookup www.baidu.com
# nslookup 交互模式
nslookup
server 127.0.0.1
# soa 记录
set q=soa
baidu.com
# a 记录
set q=a
baidu.com

# dig 命令
dig @name server domain
dig @127.0.0.1 www.baidu.com
# 反向解析
dig -x ip @name server
# a 记录
dig -t a baidu.com