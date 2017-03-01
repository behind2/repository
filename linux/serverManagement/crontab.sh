# crontab 相当于 windows的计划任务
# 检查cron服务
# 检查crontab工具是否安装：crontab -l
# 检查crond服务是否启动：service crond status
#
# 安装cron
# yum install vixie-cron
# yum install crontabs


# crontab基本组成
# *     *     *     *     *     command
# 第1个星号表示：分钟0~59
# 第2个星号表示：小时0~23
# 第3个星号表示：日期1~31
# 第4个星号表示：月份1~12
# 第5个星号表示：星期0~7（0或者7表示星期天）
# demo
# 每晚的21:30重启apache
# 30 21 * * * service httpd restart
# 小结
# - *表示任何时候都匹配
# - 可以用"A,B,C"表示A或者B或者C时, 执行命令
# - 可以用"A-B"表示A到B之间时, 执行命令
# - 可以用"*/A"表示每A分钟(小时等)执行一次命令
#
# 查看crontab日志
# tail -f /var/log/cron
#
#
#
#
#
#
#
#
#
#
# 配置文件
# /etc/crontab
# crontab日志
# /var/log/cron文件, 保存crontab的任务执行记录