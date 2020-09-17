---
title: 查询函数LOCATE、POSITION、INSTR、FIND_IN_SET、IN、LIKE
date: 2020-09-017
categories:
 - 数据库
tags:
- mysql
---

# LOCATE()

 返回要查询的字符串在被查询字符串里第一次出现的位置
注：当在 MySQL 4.0 中时,如有任一参数是一个二进制字符串，它才是字母大小写敏感的

## LOCATE(substr,str)

返回substr字符串在str[**demo.com.cn**]里第一次出现的位置，没有返回0

```sql
SELECT LOCATE('.',t.str)FROM table t;
>5
```

## LOCATE(substr,str,pos)

返回substr字符串在str里pos（起始位置）出现的位置，没有返回0
注：pos必须大于第一次出现的位置，才能显示第二次出现的位置

```sql
SELECT LOCATE('.',t.str,6)FROM table t;
>9//当小于等于第一次出现的位置（5）时，返回的还是第一次出现的位置
```



# POSITION()


返回要查询的字符串在被查询字符串里第一次出现的位置（和locate用法一样,查了很多资料position是locate的别名）

## POSITION(substr IN str)

返回substr字符串在str出现的位置，没有返回0

```sql
SELECT POSITION('cn' IN t.str)FROM `table` t;
>10
```



# INSTR()


返回要查询的字符串在被查询字符串里第一次出现的位置。这和LOCATE()的双参数形式相同，只是参数的顺序被颠倒。

## INSTR(str,substr)

返回substr字符串在str出现的位置，没有返回0

```sql
SELECT INSTR(t.str,'com')FROM table t;
>6
```



# FIND_IN_SET()


返回在集合中的索引位置（竖向发展）

## FIND_IN_SET(str,strlist)

返回str1在strlist集合中的索引位置

```sql
SELECT FIND_IN_SET('demo.com.cn',t.str) FROM `table` t;
>1//返回索引
```




# IN()


返回在集合中的索引位置（同FIND_IN_SET）

## str IN (strlist)

返回str1在strlist集合中的索引位置

```sql
SELECT 'demo.com.cn' IN(t.str)  FROM `table` t;
>1//返回索引
```




# LIKE


返回类似(模糊)字符的集合


## LIKE %str%


返回以str类似的集合



