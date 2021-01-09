---
title: Leetcode题解-双指针
date: 2021-01-09
categories:
 - CS基础
tags:
 - 算法思想
---

# 双指针 Two Pointers

指的是在遍历对象的过程中，不是普通的使用单个指针进行访问，而是使用两个相同方向（*快慢指针*）或者相反方向（*对撞指针*）的指针进行扫描，从而达到相应的目的。



##  1. 两数之和 输入有序数组

[167. 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

**题目：**

给定一个已按照_升序排列_ 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

**说明：**

- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

**示例：**

```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let len = numbers.length;
  if (len < 2) return []
  let left = 0
  let right = len - 1
  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1]
    } else if (numbers[left] + numbers[right] < target) {
      left++
    } else {
      right--
    }
  }
  return []
};
```

## 2. 平方数之和

 [633. 平方数之和](https://leetcode-cn.com/problems/sum-of-square-numbers/)

**题目:**

给定一个非负整数 `c` ，你要判断是否存在两个整数 `a` 和 `b`，使得 `a2 + b2 = c` 。

**说明:**

无

**示例 1：**

```
输入：c = 5
输出：true
解释：1 * 1 + 2 * 2 = 5
```

**示例 2：**

```
输入：c = 3
输出：false
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=633 lang=javascript
 *
 * [633] 平方数之和
 */

// @lc code=start
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
  let left=0
  let right = Math.floor(Math.sqrt(c))
  while(left<=right){
    if(left**2+right**2===c){
      return true
    }else if(left**2+right**2<c){
      left++
    }else{
      right--
    }
  }
  return false
};
```

## 3. 反转字符串中的元音字母

[345. 反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)

**题目:**

编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

**说明:**

- 元音字母不包含字母 "y" 。
- 题目没准确说明谁和谁转换，实际上应该是每次的最左和最右转换

**示例 1：**

```
输入："hello"
输出："holle"
```

**示例 2：**

```
输入："leetcode"
输出："leotcede"
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const arr = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  let str = s.split('')
  let left = 0
  let right = str.length - 1

  while (left < right) {
    if (arr.includes(str[left])) {
      if (arr.includes(str[right])) {
        // 左右都找到了，替换后左右分别++ --
        [str[left], str[right]] = [str[right], str[left]]
        left++
      }
      // 右边不管找没找到，都需要--，所以不用放在 else 里
      right--
    } else {
      // 左边没找到 ++
      left++
    }
  }
  return str.join('')
};
```

## 4. 回文字符串⭐

[680. 验证回文字符串 Ⅱ](https://leetcode-cn.com/problems/valid-palindrome-ii/)

**题目:**

给定一个非空字符串 `s`，**最多**删除一个字符。判断是否能成为回文字符串。

**说明:**

- 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。

**示例 1:**

```
输入: "aba"
输出: True
```

**示例 2:**

```
输入: "abca"
输出: True
解释: 你可以删除c字符。
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文字符串 Ⅱ
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let left = 0
  let right = s.length - 1

  while (left < right) {
    if (s[left] === s[right]) {// 左右相等 分别向中间靠近一位
      left++
      right--
    } else {// 左右不等，删除左边是回文或者删除右边是回文即为 true 否则为 false
      return isHW(s, left + 1, right) || isHW(s, left, right - 1)
    }
  }
  return true
};

// 验证删除后的字符串是否回文，不回文则整个算法结束false，回文则结束ture
function isHW(s, left, right) {
  while (left < right) {
    if (s[left] === s[right]) {
      left++
      right--
    } else {
      return false
    }
  }
  return true
}
```

## 5. 合并两个有序数组⭐

[88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

**题目:**

给你两个有序整数数组 *nums1* 和 *nums2*，请你将 *nums2* 合并到 *nums1* 中*，*使 *nums1* 成为一个有序数组。

**说明:**

- 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
- 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
- Do not return anything, modify nums1 in-place instead.

**示例：**

```
输入：
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出：[1,2,2,3,5,6]
```

**题解：**

- 纯 ES6 数组操作

  ```js
  /*
   * @lc app=leetcode.cn id=88 lang=javascript
   *
   * [88] 合并两个有序数组
   */
  
  // @lc code=start
  /**
   * @param {number[]} nums1
   * @param {number} m
   * @param {number[]} nums2
   * @param {number} n
   * @return {void} Do not return anything, modify nums1 in-place instead.
   */
  var merge = function (nums1, m, nums2, n) {
    let arr = [...nums1.slice(0, m), ...nums2.slice(0, n)].sort((a, b) => a > b ? 1 : -1)
    nums1.splice(0, nums1.length, ...arr)
  };
  ```

- 双指针

  ```js
  /*
   * @lc app=leetcode.cn id=88 lang=javascript
   *
   * [88] 合并两个有序数组
   */
  
  // @lc code=start
  /**
   * @param {number[]} nums1
   * @param {number} m
   * @param {number[]} nums2
   * @param {number} n
   * @return {void} Do not return anything, modify nums1 in-place instead.
   */
  var merge = function (nums1, m, nums2, n) {
    let len1 = m - 1
    let len2 = n - 1
    let len = m + n - 1
    // 分别比较实际末位 m&n，取大的值填入 nums1 然后大值数组向前退位
    // 直到 nums2 剩下的值都比 nums1 小【因为大的值都扔进 nums1 了】
    // 都是先计算 再 -1
    while (len1 >= 0 && len2 >= 0) {
      if (nums1[len1] > nums2[len2]) {
        nums1[len--] = nums1[len1--]
      } else {
        nums1[len--] = nums2[len2--]
      }
    }
    // 将 nums2 剩余的小值从前面塞进 nums1
    // 不用担心覆盖 nums1 前面的值，因为那些值都在后面了
    nums1.splice(0, len2 + 1, ...nums2.slice(0, len2 + 1))
  };
  ```
  
  上述算法步骤解释：
  
	```
  输入:
  [3,5,0,0,0] m = 2
  [1,2,6]     n = 3
  
  步骤[*代表当前指向]：
  => 
    nums1: [3,*5,0,0,0]  len1 = 1
    nums2: [1,2,*6]			 len2 = 2
  =>
    6 > 5,遵循“大值(6)塞后，向前退位”
    nums1: [3,*5,0,0,6]  len1 = 1
    nums2: [1,*2,6]			 len2 = 1
  =>
    2 < 5,遵循“大值(5)塞后，向前退位”
    nums1: [*3,5,0,5,6]  len1 = 0
    nums2: [1,*2,6]			 len2 = 1
  =>
    2 < 3,遵循“大值(3)塞后，向前退位”
    nums1: [3,5,3,5,6]   len1 = -1  (len1 不符合 while 条件，循环结束)
    nums2: [1,*2,6]			 len2 = 1
  =>
    此时 nums2，还剩有效(len2+1 即 2)位，将它覆盖塞入 num1 前部，nums1 的前部 2 位(即 [3,5])已经塞到 nums1 后面了
    nums1: [1,2,3,5,6]   
    nums2: [1,2,6]
  =>
    END.
  ```

## 6. 环形链表[快慢指针]⭐

[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/description/)

**题目:**

给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。

**说明:**

- 链表是 lc 后台代码生成的，传入的是已经生成好的链表对象
- pos 是个概念，理解就行，不必深究
- 链表结构可以参考 [这里](https://zh.javascript.info/recursion#lian-biao) 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)

```
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  // 判断有两个节点以上，否则不能成环
  if (!head || !head.next) return false;

  let slow = head
  let fast = head.next
  // 如果是非环没有 fast.next 的时候即走到终点
  // fast 本身可能已经 undefined ，因为它是每次跨两步，在 fast.next?.next 的时候已经 undefined 了
  while (fast && fast.next) {
    if (slow === fast) {// 相遇
      return true
    } else {// 慢指针每次走一步，快指针每次走两步
      slow = slow.next
      fast = fast.next?.next
    }
  }
  return false
};
```

## 7. 通过删除字母匹配到字典里最长单词

[524. 通过删除字母匹配到字典里最长单词](https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/description/)

**题目:**

给定一个字符串和一个字符串字典，找到字典里面最长的字符串，该字符串可以通过删除给定字符串的某些字符来得到。如果答案不止一个，返回长度最长且字典顺序最小的字符串。如果答案不存在，则返回空字符串。

**说明:**

1. 所有输入的字符串只包含小写字母。
2. 字典的大小不会超过 1000。
3. 所有输入的字符串长度不会超过 1000。

**示例 1:**

```
输入:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

输出: 
"apple"
```

**示例 2:**

```
输入:
s = "abpcplea", d = ["a","b","c"]

输出: 
"a"
```

**题解：**

变量 `max` 存当前最大长度，`already` 存储已经遇到过的字符串，不二次处理。

两个指针依次前推，和前面题目差不多

```js
/*
 * @lc app=leetcode.cn id=524 lang=javascript
 *
 * [524] 通过删除字母匹配到字典里最长单词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */
var findLongestWord = function (s, d) {
  let result = ""// 存储满足结果的值
  let max = 0
  let already = new Set()

  for (let dstr of d) {
    // 长度比之前的小 or 已经遇到过的，直接 pass
    if (dstr.length < max || already.has(dstr)) continue;
    
    let slen = s.length - 1
    let dlen = dstr.length - 1

    // 新值存入 Set
    already.add(dstr)
    // 按顺序比较 
    while (dlen >= 0 && slen >= 0) {
      if (s[slen] === dstr[dlen]) {// 匹配到了向前推进
        slen--
        dlen--
      } else { // 不匹配 s 向前推进
        slen--
      }
    }

    //匹配成功 => 长度更长 or 长度相等时，字典顺序最小
    if (dlen < 0
      && ((dstr.length > result.length) || (dstr.length == result.length && dstr < result))) {
      result = dstr
      max = result.length
    }
  }

  return result
};
```

