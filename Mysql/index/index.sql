-- 索引的相关操作与介绍
-- @quote http://thephper.com/?p=142


板子之前做过2年web开发培训（入门？），获得挺多学生好评，这是蛮有成就感的一件事，准备花点时间根据当时的一些备课内容整理出一系列文章出来，希望能给更多人带来帮助，这是系列文章的第一篇

注：科普文章一篇，大牛绕道

索引是做什么的?
索引用于快速找出在某个列中有一特定值的行。不使用索引，MySQL必须从第1条记录开始然后读完整个表直到找出相关的行。
表越大，花费的时间越多。如果表中查询的列有一个索引，MySQL能快速到达一个位置去搜寻到数据文件的中间，没有必要看所有数据。

大多数MySQL索引(PRIMARY KEY、UNIQUE、INDEX和FULLTEXT)在B树中存储。只是空间列类型的索引使用R-树，并且MEMORY表还支持hash索引。

索引好复杂，我该怎么理解索引，有没一个更形象点的例子？
有，想象一下，你面前有本词典，数据就是书的正文内容，你就是那个cpu，而索引，则是书的目录

索引越多越好？
大多数情况下索引能大幅度提高查询效率，但：

数据的变更（增删改）都需要维护索引，因此更多的索引意味着更多的维护成本
更多的索引意味着也需要更多的空间 （一本100页的书，却有50页目录？）
过小的表，建索引可能会更慢哦 ：）  （读个2页的宣传手册，你还先去找目录？）
索引的字段类型问题
text类型，也可建索引（需指定长度）
myisam存储引擎索引键长度综合不能超过1000字节
用来筛选的值尽量保持和索引列同样的数据类型
 like 不能用索引？
尽量减少like，但不是绝对不可用，”xxxx%” 是可以用到索引的，
想象一下，你在看一本成语词典，目录是按成语拼音顺序建立，查询需求是，你想找以 “一”字开头的成语（”一%“），和你想找包含一字的成语（“%一%”）

除了like，以下操作符也可用到索引：
<，<=，=，>，>=，BETWEEN，IN

<>，not in ，！=则不行

什么样的字段不适合建索引？
一般来说，列的值唯一性太小（如性别，类型什么的），不适合建索引（怎样叫太小？一半说来，同值的数据超过表的百分之15，那就没必要建索引了）
太长的列，可以选择只建立部分索引，（如：只取前十位做索引）
更新非常频繁的数据不适宜建索引（怎样叫非常？意会）
 一次查询能用多个索引吗?
不能

多列查询该如何建索引?
一次查询只能用到一个索引，所以 首先枪毙 a，b各建索引方案

a还是b？ 谁的区分度更高（同值的最少），建谁！

当然，联合索引也是个不错的方案，ab，还是ba，则同上，区分度高者，在前

联合索引的问题?
where a = “xxx” 可以使用 AB 联合索引
where b = “xxx” 则不可 （再想象一下，这是书的目录？）

所以，大多数情况下，有AB索引了，就可以不用在去建一个A索引了

哪些常见情况不能用索引?
like “%xxx”
not in ， ！=
对列进行函数运算的情况（如 where md5(password) = “xxxx”）
WHERE index=1 OR A=10
存了数值的字符串类型字段（如手机号），查询时记得不要丢掉值的引号，否则无法用到该字段相关索引，反之则没关系
也即

select * from test where mobile = 13711112222;

可是无法用到mobile字段的索引的哦（如果mobile是char 或 varchar类型的话）

btw，千万不要尝试用int来存手机号（为什么？自己想！要不自己试试）



覆盖索引(Covering Indexes)拥有更高效率
索引包含了所需的全部值的话，就只select 他们，换言之，只select 需要用到的字段，如无必要，可尽量避免select *

NULL 的问题
NULL会导致索引形同虚设，所以在设计表结构时应避免NULL 的存在（用其他方式表达你想表达的NULL，比如 -1？）

如何查看索引信息，如何分析是否正确用到索引?
show index from tablename;
explain select ……;

关于explain，改天可以找个时间专门写一篇入门帖，在此之前，可以尝试 google

了解自己的系统，不要过早优化!
过早优化，一直是个非常讨厌而又时刻存在的问题，大多数时候就是因为不了解自己的系统，不知道自己系统真正的承载能力

比如：几千条数据的新闻表，每天几百几千次的正文搜索，大多数时候我们可以放心的去like，而不要又去建一套全文搜索什么的，毕竟cpu还是比人脑厉害太多

分享个小案例：
曾经有个朋友找板子，说：大师帮看看，公司网站打不开

板子笑了笑：大师可不敢当啊，待我看看再说

板子花了10分钟分析了下：中小型企业站，量不大（两三万pv每天），独立服务器，数据量不大（100M不到），应该不至于太慢
某个外包团队做的项目，年久失修，彻底改造？不现实！

于是，板子花了20分钟给可以加索引的字段都加上了索引，于是，世界安静了

朋友说：另外一个哥们说，优化至少得2w外包费，你只用30分钟，看来，大师你是当之无愧了，选个最好的餐馆吧

板子：那就来点西餐吧，常熟路地铁站肯德基等你！

最后：永远别忘记的关键词 sql注入

-- 写的真是太好了, 顶礼膜拜