# 单分支if条件语句
if [ condition ]; then
	#statements
fi

# condition 里面的值, 用双引号包起来, 否则有可能无法识别

# 双分支if条件语句
if [ condition ]; then
	# statements
	else
	# statements
fi

# 多分支if条件语句
if [ condition1 ]; then
	#statements
elif [ condition2 ]; then
	#statements
	.
	.
	.
else
	当所有条件都不成立时, 最后执行此程序
fi

#shell还提供了 与(-a) 或(-o) 非(!) 三个逻辑操作符用于将测试条件连接起来
#优先级："!"最高 "-a"次之 "-o"最低