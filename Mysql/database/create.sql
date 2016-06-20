-- 创建数据库
create {database | schema} [if not exists] db_name
[default] character set [=] charset_name

CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
    [create_specification] ...

create_specification:
    [DEFAULT] CHARACTER SET [=] charset_name
  | [DEFAULT] COLLATE [=] collation_name


-- 查看数据库列表
show {databases | schemas}
[like 'pattern' | where expr]

-- 查看警告信息
show warnings

-- 查看创建数据库时的相关设置
show create {database | schema} [if not exists] db_name

-- 修改数据库
alter {database | schema} [db_name]
[default] character set [=] charset_name


-- std
ALTER {DATABASE | SCHEMA} [db_name]
    alter_specification ...
ALTER {DATABASE | SCHEMA} db_name
    UPGRADE DATA DIRECTORY NAME

alter_specification:
    [DEFAULT] CHARACTER SET [=] charset_name
  | [DEFAULT] COLLATE [=] collation_name


-- 删除数据库
drop {database | schema} [if exists] db_name