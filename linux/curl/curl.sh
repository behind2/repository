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

# HTTP动词  默认为GET    使用`-X`参数可以支持其他动词
curl -X POST www.example.com
curl -X DELETE www.example.com

# 文件上传
# html表单
# <form method="POST" enctype='multipart/form-data' action="upload.cgi">
#   <input type=file name=upload>
# 　<input type=submit name=press value="OK">
# </form>

curl --form upload=@localfilename --form press=OK [URL]

# User Agent字段 用来表示客户端的设备信息.
# iPhone4的ua
# 　　Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7
　　
curl --user-agent "[User Agent]" [URL]

# cookie
curl --cookie "name=xxx" www.example.com

# -c cookie-file 可以保存服务器返回的cookie到文件
# -b cookie-file 可以使用这个文件作为cookie信息
curl -c cookies http://example.com
curl -b cookies http://example.com

# 增加头信息
curl --header "Content-Type:application/json" http://example.com

# HTTP认证
curl --user name:password example.com　　