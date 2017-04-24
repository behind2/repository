select count(*), count(column) from table;
-- count(*) 所有列值组成
-- count(column) 单一列值组成, 并且null是不计数的


join
-- join的时候有可能会出现重复值(存在一对多的关系)