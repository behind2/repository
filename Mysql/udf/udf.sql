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

-- demo 不带参数的函数
create function f1() returns varchar(30)
return date_format(now(), '%Y年%m月%d日 %H点:%i分:%s秒');

-- demo 带参数的函数
create function f2(num1 smallint unsigned, num2 smallint unsigned)
returns float(10, 2) unsigned
return (num1 + num2) / 2;

-- 删除函数
drop function f2;