---
title: Leetcode题解-二分查找
date: 2021-01-16
categories:
 - CS基础
tags:
 - 算法思想
---

## 常用方法和变量

- 二分值：`l+(r-l)/2` 
- 二分直接取整： `~~(l+(r-l)/2)`    5.5 => 5   -5.5=>-5
- 二分向下取证：`x >> 1`  相当于 `Math.floor(x/2)`

**常用套路模板：**

```js
let left = start
let right = end
let mid
while(left <= right){
  mid = Math.floor(left+(right-left)/2)
  if(arr[mid] == target){
    return 目标值
  }
  if(arr[mid] < target){
    left = mid + 1
  }else{
    right = mid -1
  }
}
```

## [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

实现 `int sqrt(int x)` 函数。

计算并返回 *x* 的平方根，其中 *x* 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

**示例 1:**

```
输入: 4
输出: 2
```

**示例 2:**

```
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x < 2) return x
  let l = 1
  let r = ~~(x / 2)

  while (l <= r) {
    let mid = l + ((r - l) >> 1)
    if (mid ** 2 > x) {
      r = mid - 1
    } else if (mid ** 2 < x) {
      l = mid + 1
    } else {
      return mid
    }
  }
  return r
};
```

## [744. 寻找比目标字母大的最小字母⭐](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/)

给你一个排序后的字符列表 `letters` ，列表中只包含小写英文字母。另给出一个目标字母 `target`，请你寻找在这一有序列表里比目标字母大的最小字母。

在比较时，字母是依序循环出现的。举个例子：

- 如果目标字母 `target = 'z'` 并且字符列表为 `letters = ['a', 'b']`，则答案返回 `'a'`

**示例：**

```
输入:
letters = ["c", "f", "j"]
target = "a"
输出: "c"

输入:
letters = ["c", "f", "j"]
target = "c"
输出: "f"
```

**题解：**

思路：① 去重防止相等时下一位还是 `target` ② 如果 `target` 比任何字母都大，那么 l 会越界到 r 后面，因为 r 一直在结尾没动。

```js
/*
 * @lc app=leetcode.cn id=744 lang=javascript
 *
 * [744] 寻找比目标字母大的最小字母
 */

// @lc code=start
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  letters = [...new Set(letters)]

  let l = 0
  let r = letters.length - 1
  let mid

  while (l <= r) {
    mid = Math.floor(l + (r - l) / 2)
    // 相同的时候，如果下一位有值就取下一位，因为去重了所以一定比target大，如果没有拿[0]
    if (letters[mid] === target) return letters[mid + 1] ? letters[mid + 1] : letters[0]

    if (letters[mid] < target) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  // 如果letters[mid]一直比target小，那么l会大过最后一位【因为r一直在最后一位没动】，l越界就拿[0]
  return letters[l] ? letters[l] : letters[0]
};
```

## [540. 有序数组中的单一元素](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/)

给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。

**示例 1:**

```
输入: [1,1,2,3,3,4,4,8,8]
输出: 2
```

**示例 2:**

```
输入: [3,3,7,7,10,11,11]
输出: 10
```

**题解：**

思路：推一推示例中的值，会发现需要根据奇偶情况进行判断，剩下的套公式就行

```js
/*
* @lc app=leetcode.cn id=540 lang=javascript
*
* [540] 有序数组中的单一元素
*/

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  let l = 0
  let r = nums.length - 1
  let mid
  while (l <= r) {
    mid = Math.floor(l + (r - l) / 2)

    if (nums[mid] === nums[mid + 1]) {
      if (mid % 2 == 1) {
        r = mid - 1
      } else {
        l = mid + 1
      }
    } else if (nums[mid] === nums[mid - 1]) {
      if (mid % 2 == 1) {
        l = mid + 1
      } else {
        r = mid - 1
      }
    } else {
      return nums[mid]
    }
  }
};
```

## [278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

假设你有 `n` 个版本 `[1, 2, ..., n]`，你想找出导致之后所有版本出错的第一个错误的版本。

你可以通过调用 `bool isBadVersion(version)` 接口来判断版本号 `version` 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。

**示例:**

```
给定 n = 5，并且 version = 4 是第一个错误的版本。

调用 isBadVersion(3) -> false
调用 isBadVersion(5) -> true
调用 isBadVersion(4) -> true

所以，4 是第一个错误的版本
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=278 lang=javascript
 *
 * [278] 第一个错误的版本
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    if (isBadVersion(1)) return 1

    let l = 1
    let r = n
    let mid
    while (l <= r) {
      mid = Math.floor(l + (r - l) / 2)
      if (isBadVersion(mid)) {
        r = mid - 1
      } else {
        l = mid + 1
      }
    }
    return l

  };
};
```

## [153. 寻找旋转排序数组中的最小值⭐](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

假设按照升序排序的数组在预先未知的某个点上进行了旋转。例如，数组 `[0,1,2,4,5,6,7]` 可能变为 `[4,5,6,7,0,1,2]` 。

请找出其中最小的元素。

**示例 1：**

```
输入：nums = [3,4,5,1,2]
输出：1
```

**示例 2：**

```
输入：nums = [1]
输出：1
```

**题解：**

这题的注意点有几个：

1. `nums[mid]` 和 `nums[r]` 比较的话，如果 `nums[mid] < nums[r]` ，可能这个时候已经到了最小值，所以不能 `r=mid-1`，必须要 `r=mid` 
2. 判断条件是 `while(l<r)` ，因为类似 `[1]` 的时候可能会导致永远走 `else` ，r 就一直等于 mid，用 `while(l<=r)` 会死循环

所以说不能死套公式。

```js
/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let l = 0
  let r = nums.length - 1
  let mid

  while (l < r) {
    // 如果小于等于没反转就直接 return 了
    if (nums[l] <= nums[r]) return nums[l]
    mid = Math.floor(l + (r - l) / 2)
    if (nums[mid] > nums[r]) {
      // mid 在左段
      l = mid + 1
    } else {
      r = mid
    }
  }
  return nums[l]
};
```

## [34. 在排序数组中查找元素的第一个和最后一个位置⭐](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

给定一个按照**升序排列**的整数数组 `nums`，和一个目标值 `target`。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 `target`，返回 `[-1, -1]`。

**示例 1：**

```
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
```

**示例 2：**

```
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
```

**示例 3：**

```
输入：nums = [], target = 0
输出：[-1,-1]
```

**题解1：**

步骤就两个：

1. 正常二分
2. 当mid命中target的时候，可能是多种情况(target=2)：
   1. 最左侧 [1,\*2,2]
   2. 最右侧 [2,\*2,3]
   3. 中间某个位置[2,\*2,2]
   4. 左右都没 [\*2]

所以不管左右有没有，我们分别向左右辐射，只要下一个不是 target 就说明到边界了

```js
/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let start = 0
  let end = nums.length - 1
  let mid
  while (start <= end) {
    // 正常二分
    mid = Math.floor(start + (end - start) / 2)

    if (nums[mid] > target) {
      end = mid - 1
    }
    if (nums[mid] < target) {
      start = mid + 1
    }
    // 当mid命中target的时候，可能是多种情况：
    // 1. 最左侧 [1,*2,2]
    // 2. 最右侧 [2,*2,3]
    // 3. 中间某个位置[2,*2,2]
    // 4. 左右都没 [*2]
    // 所以不管左右有没有，我们分别向左右辐射，只要下一个不是 target 就说明到边界了
    if (nums[mid] == target) {
      let max = mid
      let min = mid
      while (nums[max + 1] == target) {
        max++
      }
      while (nums[min - 1] == target) {
        min--
      }
      return [min, max]
    }
  }
  return [-1, -1]
};
```

**官方题解：**

思路：

1. 用两次二分分别去拿左边的下标 `leftIdx` 和右边的下标 `rightIdx`
2. 这两次的区别在于用 `lower`  决定命中的时候，即 `nums[mid]==target` ，让 left 向右还是 right 向左。 `lower==true` 时为了取 `leftIdx` 所以向左
3. 取出来之后再对这两个值做一堆边界处理，过滤出越界不存在等情况

```js
const binarySearch = (nums, target, lower) => { 
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

var searchRange = function(nums, target) {
    let ans = [-1, -1];
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = [leftIdx, rightIdx];
    } 
    return ans;
};
```

