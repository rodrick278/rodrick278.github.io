---
title: Leetcode题解-贪心思想
date: 2021-01-19
categories:
 - CS基础
tags:
 - 算法思想
---

# 贪心算法

[贪心算法](https://zh.wikipedia.org/wiki/%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95) （英语：greedy algorithm），又称**贪婪算法**，是一种在每一步选择中都采取在当前状态下最好或最优（即最有利）的选择，从而希望导致结果是最好或最优的[算法](https://zh.wikipedia.org/wiki/算法)。

## [455. 分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 `i`，都有一个胃口值 `g[i]`，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 `j`，都有一个尺寸 `s[j]` 。如果 `s[j] >= g[i]`，我们可以将这个饼干 `j` 分配给孩子 `i` ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

**示例 1:**

```
输入: g = [1,2,3], s = [1,1]
输出: 1
解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
```

**示例 2:**

```
输入: g = [1,2], s = [1,2,3]
输出: 2
解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)

  let count = 0
  let j = 0
  for (let i in g) {
    while (j < s.length) {
      if (g[i] <= s[j]) {
        count++
        j++
        break;
      }
      j++
    }
  }
  return count
};
```

## [435. 无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

**注意:**

1. 可以认为区间的终点总是大于它的起点。
2. 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

**示例 1:**

```
输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。
```

**示例 2:**

```
输入: [ [1,2], [1,2], [1,2] ]

输出: 2

解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
```

**题解：**

思路：按照头排序后，依次比较当前屁股和下一组的头，如果屁股比头大，我们需要跳过当前这个屁股大的【因为他如果无穷大，那么他的区间就会影响后面所有数组】，否则忽略后面那组，自己保留屁股，直到遇到不重叠的数组交出屁股。

```js
/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {

  if (intervals.length == 0) return 0

  let count = 0
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })

  let ass = intervals[0][1]//初始化第一个屁股
  let i = 0//下标
  let len = intervals.length
  while (++i < len) {
    if (intervals[i][0] < ass) {
      // 如果下一个的头比当前屁股小，那么一定要删除一个
      count++
      if (intervals[i][1] < ass) {
        // 去掉屁股大的那个
        ass = intervals[i][1]
      }
    } else {
      // 正常情况下要把屁股给最新的正常数组
      ass = intervals[i][1]
    }
  }

  return count
};
```

## [452. 用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)

在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以纵坐标并不重要，因此只要知道开始和结束的横坐标就足够了。开始坐标总是小于结束坐标。

一支弓箭可以沿着 x 轴从不同点完全垂直地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 `x``start`，`x``end`， 且满足  `xstart ≤ x ≤ x``end`，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

给你一个数组 `points` ，其中 `points [i] = [xstart,xend]` ，返回引爆所有气球所必须射出的最小弓箭数。

 

**示例 1：**

```
输入：points = [[10,16],[2,8],[1,6],[7,12]]
输出：2
解释：对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  if (points.length == 0) return 0
  points.sort((a, b) => a[0] - b[0])
  let count = 1
  let i = 0
  let ass = points[0][1]
  while (++i < points.length) {
    if (points[i][0] > ass) {
      // 头大于屁股 必须多一箭
      count++
      ass = points[i][1]
    } else if (points[i][0] < ass && points[i][1] < ass) {
      // 头小于屁股 且后者屁股小 
      ass = points[i][1]
    }
  }
  return count
};
```

## [406. 根据身高重建队列⭐](https://leetcode-cn.com/problems/queue-reconstruction-by-height/)

假设有打乱顺序的一群人站成一个队列，数组 `people` 表示队列中一些人的属性（不一定按顺序）。每个 `people[i] = [hi, ki]` 表示第 `i` 个人的身高为 `hi` ，前面 **正好** 有 `ki` 个身高大于或等于 `hi` 的人。

请你重新构造并返回输入数组 `people` 所表示的队列。返回的队列应该格式化为数组 `queue` ，其中 `queue[j] = [hj, kj]` 是队列中第 `j` 个人的属性（`queue[0]` 是排在队列前面的人）。

**示例 1：**

```
输入：people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
输出：[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
解释：
编号为 0 的人身高为 5 ，没有身高更高或者相同的人排在他前面。
编号为 1 的人身高为 7 ，没有身高更高或者相同的人排在他前面。
编号为 2 的人身高为 5 ，有 2 个身高更高或者相同的人排在他前面，即编号为 0 和 1 的人。
编号为 3 的人身高为 6 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
编号为 4 的人身高为 4 ，有 4 个身高更高或者相同的人排在他前面，即编号为 0、1、2、3 的人。
编号为 5 的人身高为 7 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
因此 [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] 是重新构造后的队列。
```

**示例 2：**

```
输入：people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
输出：[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
```

**题解：**

思路：按照身高降序排列，循环按照下标插入，个子矮的永远看不到个子高的！

```js
/*
 * @lc app=leetcode.cn id=406 lang=javascript
 *
 * [406] 根据身高重建队列
 */

// @lc code=start
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  people.sort((a, b) => a[0] == b[0] ? a[1] - b[1] : b[0] - a[0])

  let queue = []
  for (let item of people) {
    queue.splice(item[1], 0, item)
  }
  return queue
};
```

## [121. 买卖股票的最佳时机⭐](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

注意：你不能在买入股票前卖出股票。

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (!prices || !prices.length) return 0
  
  let minPrice = Number.MAX_VALUE // 最小购入股价
  let max = 0// 最大收益

  for (let price of prices) {
    minPrice = Math.min(minPrice, price)
    max = Math.max(max, price - minPrice)// 负数的话就是 0 
  }

  return max
};
```

## [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

**注意：** 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

**示例 1:**

```
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

**题解：**

思路：假设 `[1,3,5]` ，1 买入 5 卖出，和 1 买入 3 卖出，3 再买入 5再卖出，结果是一样的，所以只需要一步步遍历即可，如果后面比前面的值大相当于这步不买入，即为 0。

```js
/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (!prices || !prices.length) return 0

  let max = 0
  let i = 0
  while (++i < prices.length) {
    max += Math.max(0, prices[i] - prices[i - 1])
  }
  return max
};
```

## [605. 种花问题](https://leetcode-cn.com/problems/can-place-flowers/)

假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给你一个整数数组 `flowerbed` 表示花坛，由若干 `0` 和 `1` 组成，其中 `0` 表示没种植花，`1` 表示种植了花。另有一个数 `n` ，能否在不打破种植规则的情况下种入 `n` 朵花？能则返回 `true` ，不能则返回 `false`。

**示例 1：**

```
输入：flowerbed = [1,0,0,0,1], n = 1
输出：true
```

**示例 2：**

```
输入：flowerbed = [1,0,0,0,1], n = 2
输出：false
```

**题解：**

思路：可以种花的条件：①当前为 0 ；② 左右都不为 1（0 或者 undefined【头尾时】都可以）

```js
/*
 * @lc app=leetcode.cn id=605 lang=javascript
 *
 * [605] 种花问题
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  let count = 0

  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] == 0 && flowerbed[i - 1] != 1 && flowerbed[i + 1] != 1) {
      if (++count >= n) return true
      flowerbed[i] = 1
    }
  }
  return count >= n
};
```

## [392. 判断子序列](https://leetcode-cn.com/problems/is-subsequence/)

给定字符串 **s** 和 **t** ，判断 **s** 是否为 **t** 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，`"ace"`是`"abcde"`的一个子序列，而`"aec"`不是）。

**示例 1：**

```
输入：s = "abc", t = "ahbgdc"
输出：true
```

**示例 2：**

```
输入：s = "axc", t = "ahbgdc"
输出：false
```

**题解：**

双指针

```js
/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  if (s.length > t.length) return false
  if (s === "") return true

  let sindex = 0
  let tindex = 0
  while (tindex < t.length) {
    if (s[sindex] == t[tindex]) {
      if (++sindex >= s.length) return true
    }
    tindex++
  }
  return false
};
```

## [665. 非递减数列⭐](https://leetcode-cn.com/problems/non-decreasing-array/)

给你一个长度为 `n` 的整数数组，请你判断在 **最多** 改变 `1` 个元素的情况下，该数组能否变成一个非递减数列。

我们是这样定义一个非递减数列的： 对于数组中所有的 `i` `(0 <= i <= n-2)`，总满足 `nums[i] <= nums[i + 1]`。

**示例 1:**

```
输入: nums = [4,2,3]
输出: true
解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
```

**示例 2:**

```
输入: nums = [4,2,1]
输出: false
解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
```

**题解**

关键在于当 `nums[i]>nums[i+1]` 时，肯定需要改一个值，但是具体改哪个值需要根据 `nums[i-1]` 和 `nums[i+1]` 的值来比较。

比如👉：`[5,7,1,8]` ，在 7 的位置，需要把 1 改为 7 。`[1,4,2,3]` 在 4 的位置，需要把 4 改为 1 。

```js
/*
 * @lc app=leetcode.cn id=665 lang=javascript
 *
 * [665] 非递减数列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function (nums) {
  let haschange = false
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      if (haschange) return false

      haschange = true
      if (nums[i - 1] > nums[i + 1]) {
        nums[i + 1] = nums[i]
      } else {
        nums[i] = nums[i - 1]
      }
    }
  }
  return true
};
```

## [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**示例:**

```
输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let max = nums[0]
  let presum = 0 // 存储上一轮的总和，并不是上一轮的实际最大值

  for (let num of nums) {
    if (presum > 0) {
      presum += num
    } else {
      presum = num
    }
    max = Math.max(presum, max)
  }
  return max
};
```

## [763. 划分字母区间⭐](https://leetcode-cn.com/problems/partition-labels/)

字符串 `S` 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。

**示例：**

```
输入：S = "ababcbacadefegdehijhklij"
输出：[9,7,8]
解释：
划分结果为 "ababcbaca", "defegde", "hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
```

**题解：**

思路：遍历字符串时，需要更新最远切割点。

```js
/*
 * @lc app=leetcode.cn id=763 lang=javascript
 *
 * [763] 划分字母区间
 */

// @lc code=start
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function (S) {
  let start = 0 // 记录当前开始切割点
  let end = 0 // 记录循环中当前结束切割点
  let result = [] // 记录结果
  let map = {} // 存放 字母：字母的最远距离
  let set = new Set(S.split(''))// 去重一下数组
  for (let char of set) {
    map[char] = S.lastIndexOf(char)
  }

  for (let i in S) {
    let charMax = map[S[i]]// 获取当前字母最远距离
    // 结束切割点取最远的值，如果当前最远距离更大就更新结束点
    end = Math.max(end, charMax)
    // 如果一路走到了切割结束点的位置结束点都没更新，就切割
    if (+i === end) {
      result.push(i - start + 1)
      start = +i + 1
    }
  }
  return result
};
```

