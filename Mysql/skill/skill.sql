select count(*), count(column) from table;
-- count(*) 所有列值组成
-- count(column) 单一列值组成, 并且null是不计数的


join
-- join的时候有可能会出现重复值(存在一对多的关系)


limit
-- 翻页, 可以记下来上次翻页主键的值, 根据范围大小提取内容