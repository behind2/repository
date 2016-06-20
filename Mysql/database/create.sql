-- 创建数据库
create {database | schema} [if not exists] db_name
[default] character set [=] charset_name


-- std

CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
    [create_specification] ...

create_specification:
    [DEFAULT] CHARACTER SET [=] charset_name
  | [DEFAULT] COLLATE [=] collation_name