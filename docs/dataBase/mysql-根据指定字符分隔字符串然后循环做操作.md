---
title: mysql指定字符串分割
date: 2020-09-06
categories:
 - 数据库
tags:
- mysql
---

> func_get_split_string_total

```mysql
CREATE DEFINER=`root`@`%` FUNCTION `dep_zhipinzhizao`.`func_get_split_string_total`(
f_string varchar(1000),f_delimiter varchar(5)
) RETURNS int
BEGIN
	-- 获得所有以“某个符号“分割的字符串的个数
	return (length(f_string) - length(replace(f_string,f_delimiter,'')))/length(f_delimiter)+1;
END
```

> func_get_split_string

```mysql
CREATE DEFINER=`root`@`%` FUNCTION `dep_zhipinzhizao`.`func_get_split_string`(
f_string varchar(1000),f_delimiter varchar(5),f_order int) RETURNS varchar(255) CHARSET utf8
BEGIN
	-- 按分割取出字符串
  declare result varchar(255) default '';
  set result = reverse(substring_index(reverse(substring_index(f_string,f_delimiter,f_order)),f_delimiter,1));
  return result;
END
```

> 存储过程进行组合使用这两个函数，输入需要分割的字符串 ，和分隔符，输出 按某某符号分割后的数组

```mysql
DELIMITER $$

CREATE PROCEDURE `sp_print_result`(
 IN f_string varchar(1000),IN f_delimiter varchar(5)
)
BEGIN
  -- Get the separated string.
  declare cnt int default 0;
  declare i int default 0;
  set cnt = func_get_split_string_total(f_string,f_delimiter);
  drop table if exists tmp_print;
  create temporary table tmp_print (num int not null);
  while i < cnt
  do
    set i = i + 1;
    insert into tmp_print(num) values (func_get_split_string(f_string,f_delimiter,i));
  end while;
  select * from tmp_print;

END$$

DELIMITER ;
```

