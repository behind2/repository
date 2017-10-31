# awk一次处理一行内容
# awk对每行可以切片处理

# 命令行格式
# $ awk [options] 'command' files
#                  command: pattern {awk 操作命令}
#                           pattern: 正则表达式; 逻辑判断式
#   awk 操作命令: 内置函数: print(), printf(), getline...
#                控制指令: if () {...} else {...}, while () {...}

# 脚本格式
# $ awk -f awk-script-file files