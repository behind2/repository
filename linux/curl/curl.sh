# curl 的使用方法总结

# 查看网页源代码
curl www.sina.com

# 见url的网页内容保存为filename
curl -o [filename] url

# 自动跳转
curl -L www.sina.com

# 显示头信息
curl -i www.sina.com

# 显示通信过程
curl -v www.sina.com

curl --trace output.txt www.sina.com
curl --trace-ascii output.txt www.sina.com

# 发送表单信息
# method get
curl example.com/form.cgi?data=xxx
# post
curl -X POST --data "data=xxx" example.com/form.cgi
# 补充编码
curl -X POST--data-urlencode "data=April 1" example.com/form.cgi

# HTTP动词