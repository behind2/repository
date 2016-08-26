-- 打开数据库
use <database_name>

-- 检测/查看当前打开的数据库
select database();

-- 设置客户端的显示编码, 并不影响数据表的编码
set names <[gbk | utf8]>