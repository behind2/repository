-- 存储过程与自定义函数

CREATE
    [DEFINER = { user | CURRENT_USER }]
    PROCEDURE sp_name ([proc_parameter[,...]])
    [characteristic ...] routine_body

CREATE
    [DEFINER = { user | CURRENT_USER }]
    FUNCTION sp_name ([func_parameter[,...]])
    RETURNS type
    [characteristic ...] routine_body

proc_parameter:
    [ IN | OUT | INOUT ] param_name type

func_parameter:
    param_name type

type:
    Any valid MySQL data type

characteristic:
    COMMENT 'string' -- 注释
  | LANGUAGE SQL
  | [NOT] DETERMINISTIC
  | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA } -- 包含sql语句，但不包含读或写数据的语句 | 不包含sql语句 | 包含读数据的语句 | 包含写数据的语句
  | SQL SECURITY { DEFINER | INVOKER } -- 指明谁有权限来执行

routine_body:
    Valid SQL routine statement


-- 存储过程与自定义函数比较相似
-- 过程体由合法的SQL语句构成
-- 过程体可以是任意SQL语句
-- 过程体如果为复合结构则使用BEGIN...END语句
-- 复合结构可以包含声明，循环，控制结构

-- demo
create procedure sp1() select version();

-- 调用存储过程
call sp_name([parameter[,...]])
call sp_name[()]

-- demo
call sp1;
call sp1();


-- 创建带有IN类型参数的存储过程
-- demo
delimiter //
create procedure removeUserById(in p_id int unsigned)
begin
delete from users where id = p_id;
end
//
delimiter ;
-- ps: 1.此处注意形参不能与数据表的field/column 重复产生歧义
--     2.不能删除过程体. 只有先删除存储过程, 然后新建

drop procedure [if exists] sp_name;

-- demo 调用
call removeUserById(3);


-- 创建带有IN和OUT类型参数的存储过程
delimiter //
create procedure removeUserAndReturnUserNums(in p_id int unsigned, out userNums int unsigned)
begin
delete from users where id = p_id;
select count(id) from users into userNums;
end
//
delimiter ;

call removeUserAndReturnUserNums(27, @nums);

select @nums;
-- 查看返回值
set @i = 7;
-- 设置用户变量

-- 内置函数row_count()
-- demo
select row_count();

-- 创建带有多个OUT类型参数的存储过程
delimiter //
create procedure removeUserByAgeAndReturnInfos(in p_age smallint unsigned, out deleteUsers smallint unsigned, out userCounts smallint unsigned)
begin
delete from users where age = p_age;
select row_count() into deleteUsers;
select count(id) from users into userCounts;
end
//
delimiter ;

call removeUserByAgeAndReturnInfos(23, @a, @b);

select @a, @b;

-- 句法
SELECT col_name[,...] INTO var_name[,...] table_expr

-- 存储过程与自定义函数的区别
-- 存储过程实现的功能要复杂些，而函数的针对性更强
-- 存储过程可以返回多个值，函数只能有一个返回值
-- 存储过程一般独立的来执行，而函数可以作为其他SQL语句的组成部分来出现


-- 修改存储过程
alter procedure sp_name [characteristic ...]
comment `string`
| {CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA}
| SQL SECURITY {DEFINER | INVOKER}

-- 删除存储过程
drop procedure [if exists] sp_name
