-- 创建自定义函数
create function function_name
returns
{string|integer|real|decimal}
routine_body

-- routine_body
1. 函数体由合法的sql语句构成.
2. 函数体可以是简单的select或insert语句.
3. 函数体如果为复合结构则使用begin...end语句.
4. 复合结构可以包含声明, 循环, 控制结构.

--