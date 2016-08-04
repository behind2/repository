ALTER [IGNORE] TABLE tbl_name
    [alter_specification [, alter_specification] ...]
    [partition_options]

alter_specification:
    table_options
  ##############################################################
  | ADD [COLUMN] col_name column_definition
        [FIRST | AFTER col_name ]
  # 增加字段
  # ADD       col_name 字段 column_definition 字段类型
  # [FIRST | AFTER col_name ]
  # 用于调整字段的前后顺序. FIRST最前方. AFTER表示在某一列(col_name)的后面
  # 
  # 批量增加字段
  | ADD [COLUMN] (col_name column_definition,...)
  ##############################################################
  | ADD {INDEX|KEY} [index_name]
        [index_type] (index_col_name,...) [index_option] ...
  | ADD [CONSTRAINT [symbol]] PRIMARY KEY
        [index_type] (index_col_name,...) [index_option] ...
  | ADD [CONSTRAINT [symbol]]
        UNIQUE [INDEX|KEY] [index_name]
        # 创建unique key
        [index_type] (index_col_name,...) [index_option] ...
  | ADD FULLTEXT [INDEX|KEY] [index_name]
        (index_col_name,...) [index_option] ...
  | ADD SPATIAL [INDEX|KEY] [index_name]
        (index_col_name,...) [index_option] ...
  | ADD [CONSTRAINT [symbol]]
        FOREIGN KEY [index_name] (index_col_name,...)
        reference_definition
  | ALGORITHM [=] {DEFAULT|INPLACE|COPY}
  ##############################################################
  | ALTER [COLUMN] col_name {SET DEFAULT literal | DROP DEFAULT}
  # 修改字段默认值/删除字段默认值
  # ALTER col_name 字段  SET DEFAULT literal 给指定字段设置默认值
  #                      DROP DEFAULT        删除指定字段设置默认值
  ##############################################################
  | CHANGE [COLUMN] old_col_name new_col_name column_definition
        [FIRST|AFTER col_name]
  # 改变新旧字段, 设置新旧字段类型
  # CHANGE          old_col_name 旧字段 new_col_name 新字段 column_definition 字段类型  [NOT NULL] AUTO_INCREMENT = 1
  # alter table table_name表名 auto_increment = 1初始值;
  ##############################################################
  | LOCK [=] {DEFAULT|NONE|SHARED|EXCLUSIVE}
  ##############################################################
  | MODIFY [COLUMN] col_name column_definition
        [FIRST | AFTER col_name]
  # 修改现有字段类型
  # MODIFY          col_name 字段     column_definition 字段类型    [NOT NULL] DEFAULT VALUE
  ##############################################################
  | DROP [COLUMN] col_name
  ##############################################################
  | DROP PRIMARY KEY
  # 删除表的主键
  ##############################################################
  | DROP {INDEX|KEY} index_name
  # 删除 索引或键 字段名分
  ##############################################################
  | DROP FOREIGN KEY fk_symbol
  | DISABLE KEYS
  | ENABLE KEYS
  | RENAME [TO|AS] new_tbl_name
  | RENAME {INDEX|KEY} old_index_name TO new_index_name
  | ORDER BY col_name [, col_name] ...
  | CONVERT TO CHARACTER SET charset_name [COLLATE collation_name]
  | [DEFAULT] CHARACTER SET [=] charset_name [COLLATE [=] collation_name]
  | DISCARD TABLESPACE
  | IMPORT TABLESPACE
  | FORCE
  | {WITHOUT|WITH} VALIDATION
  | ADD PARTITION (partition_definition)
  | DROP PARTITION partition_names
  | DISCARD PARTITION {partition_names | ALL} TABLESPACE
  | IMPORT PARTITION {partition_names | ALL} TABLESPACE
  | TRUNCATE PARTITION {partition_names | ALL}
  | COALESCE PARTITION number
  | REORGANIZE PARTITION partition_names INTO (partition_definitions)
  | EXCHANGE PARTITION partition_name WITH TABLE tbl_name [{WITH|WITHOUT} VALIDATION]
  | ANALYZE PARTITION {partition_names | ALL}
  | CHECK PARTITION {partition_names | ALL}
  | OPTIMIZE PARTITION {partition_names | ALL}
  | REBUILD PARTITION {partition_names | ALL}
  | REPAIR PARTITION {partition_names | ALL}
  | REMOVE PARTITIONING
  | UPGRADE PARTITIONING

index_col_name:
    col_name [(length)] [ASC | DESC]

index_type:
    USING {BTREE | HASH}

index_option:
    KEY_BLOCK_SIZE [=] value
  | index_type
  | WITH PARSER parser_name
  | COMMENT 'string'

table_options:
    table_option [[,] table_option] ...  (see CREATE TABLE options)

partition_options:
    (see CREATE TABLE options)
