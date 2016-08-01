-- 查看数据表列表
show tables [from db_name] -- db_name: database name
[like `pattern` | where expr]

-- 查看数据表结构
show columns from tbl_name

-- 查看数据表结构
desc tbl_name

-- 自动编号 与主键组合使用
-- 默认情况下, 起始值为1, 每次的增量为1
auto_increment

-- 主键(primary key)
-- 1.主键约束
-- 2.每张数据表只能存在一个主键
-- 3.主键保证记录的唯一性
-- 4.主键自动为 not null
-- 5.主键不一定与auto_increment使用