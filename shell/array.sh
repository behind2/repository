#声明数组
#支持一维数组（不支持多维数组） 数组元素用"空格"符号分割开
array_name=(value0 value1 value2 value3)
#or
array_name=(
value0
value1
value2
value3
)
or
array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
#可以不使用连续的下标，而且下标的范围没有限制。


#读取数组
#
${数组名[下标]}
valuen=${array_name[n]}  #使用@符号可以获取数组中的所有元素


#获取数组的长度
#获取数组长度的方法与获取字符串长度的方法相同
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}