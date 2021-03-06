-- 使用mysql慢查日志对有效率问题的sql进行监控

-- 设置慢查询存储文件日志位置
set global show_query_log_file = '/home/mysql/sql_log/mysql-show.log';
-- 设置没有索引的记录到慢查询日志
set global log_queries_not_using_indexes=on;
-- 超过指定秒数的慢查询记录到慢查询日志中
set global long_query_time=1


---- 查看mysql是否开启慢查询日志
-- @quote http://www.cnblogs.com/stevendes/p/4332344.html
show variables like 'slow_query_log';


-- mysql慢查日志分析工具mysqldumpslow(与mysql一起被安装)
-- mysql慢查日志分析工具pt-query-digest
-- 1. 查询次数多且每次查询占用时间长的sql
--    通常为pt-query-digest分析的前几个查询
-- 2. IO大的sql
--    注意pt-query-digest分析中的Rows examine项
-- 3. 未命中索引的sql
--    注意pt-query-digest分析中的Rows examine 和 Rows Send的对比

