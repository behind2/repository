-- 设置字符集
-- 修改mysql my.ini文件配置
-- default-character-set=utf8
-- character-set-server=utf8

-- mysql登陆
mysql -u <用户名> -h <服务器IP地址>  -P <端口号> -p<密码> -D <数据库名>

-- 没写密码的话, 就是在client时候在输入



-- mysql退出连接
exit;
quit;
\q;