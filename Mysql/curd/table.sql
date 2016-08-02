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

-- 唯一约束(unique key)
-- 1.唯一约束
-- 2.唯一约束可以保证记录的唯一性
-- 3.唯一约束的字段可以为空值(null)
-- 4.每张数据表可以存在多个唯一约束

-- 默认值
-- 当插入记录时, 如果没有明确为字段赋值, 则自动赋予默认值


-- 约束
-- 1.约束保证数据的完整性和一致性
-- 2.约束分为表级约束(针对多个字段)和列级约束(针对某个字段)
-- 3.约束类型包括
-- 	not null (非空约束)
-- 	primary key (主键约束)
-- 	unique key (唯一约束)
-- 	default key (默认约束)
-- 	foreign key (外键约束)


-- foreign key (外键)
-- 保持数据一致性，完整性
-- 实现一对一或一对多关系
-- 1.父表和子表必须使用相同存储引擎, 而且禁止使用临时表
-- 2.数据表的存储引擎只能是InnoDB
-- 3.外键列和参照列必须具有相似的数据类型. 其中数字的长度或是否有符号位必须相同; 而字符的长度则可以不同
-- 4.外键列和参照列必须创建索引. 如果外键列不存在索引的话, mysql将自动创建索引

-- mysql 配置文件 my.ini
default-storage-engine=INNODB