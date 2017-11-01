# awk一次处理一行内容
# awk对每行可以切片处理

# 命令行格式
# $ awk [options] 'command' files
#                  command: pattern {awk操作命令}
#                           pattern: 正则表达式; 逻辑判断式
#   awk操作命令: 内置函数: print(), printf(), getline...
#                控制指令: if () {...} else {...}, while () {...}

# awk内置参数应用
# 内置变量
#   $0: 表示整个当前行
#   $1: 每行第一个字段
#   $2: 每行第二个字段
# 分隔符
# options: -F field-separator(默认为空格)
# ex: $ awk -F ':' '{print $3}' /etc/passwd

# 脚本格式
# $ awk -f awk-script-file files