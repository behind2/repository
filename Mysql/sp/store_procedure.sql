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