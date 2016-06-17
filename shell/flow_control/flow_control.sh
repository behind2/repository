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