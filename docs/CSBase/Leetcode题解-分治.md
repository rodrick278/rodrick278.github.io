---
title: Leetcode题解-分治
date: 2021-01-23
categories:
 - CS基础
tags:
 - 算法思想
---

## [241. 为运算表达式设计优先级⭐](https://leetcode-cn.com/problems/different-ways-to-add-parentheses/)

给定一个含有数字和运算符的字符串，为表达式添加括号，改变其运算优先级以求出不同的结果。你需要给出所有可能的组合的结果。有效的运算符号包含 `+`, `-` 以及 `*` 。

**示例 1:**

```
输入: "2-1-1"
输出: [0, 2]
解释: 
((2-1)-1) = 0 
(2-(1-1)) = 2
```

**示例 2:**

```
输入: "2*3-4*5"
输出: [-34, -14, -10, -10, 10]
解释: 
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
```

**题解：**

利用递归从最小情况【两个数字一个运算符】解决，分别逐层向上计算，不要去想着括号该怎么插入

```js
/*
 * @lc app=leetcode.cn id=241 lang=javascript
 *
 * [241] 为运算表达式设计优先级
 */

// @lc code=start
/**
 * @param {string} input
 * @return {number[]}
 */
var diffWaysToCompute = function (input) {
  let op = ["+", "-", "*"]
  let res = []

  for (let i = 0; i <= input.length - 1; i++) {
    let charop = input[i] // 记录符号
    if (op.includes(charop)) {// 是符号，左右分隔
      // 左右分开递归，递归到最小层：例：4*5  left:[4] right:[5]
      let leftarr = diffWaysToCompute(input.slice(0, i))
      let rightarr = diffWaysToCompute(input.slice(i + 1))
      // 交叉处理取结果
      for (let l in leftarr) {
        for (let r in rightarr) {
          // 符号在上面保存 charop
          switch (charop) {
            case "+":
              res.push(leftarr[l] + rightarr[r])
              break;
            case "-":
              res.push(leftarr[l] - rightarr[r])
              break;
            case "*":
              res.push(leftarr[l] * rightarr[r])
              break;
          }
        }
      }
    }
  }
  // 如果全部跑完结果为空，说明没有运算符
  return res.length === 0 ? [+input] : res
};
```

## [95. 不同的二叉搜索树 II⭐⭐](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)

给定一个整数 *n*，生成所有由 1 ... *n* 为节点所组成的 **二叉搜索树** 。

**二叉搜索树关键的性质是根节点的值大于左子树所有节点的值，小于右子树所有节点的值，且左子树和右子树也同样为二叉搜索树。**

**示例：**

```
输入：3
输出：
[
  [1,null,3,2],
  [3,2,null,1],
  [3,1,null,null,2],
  [2,1,3],
  [1,null,2,null,3]
]
解释：
以上的输出对应以下 5 种不同结构的二叉搜索树：

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```

**题解：**

这题麻烦在必须搞清这颗树的定义，和 `TreeNode` 到底起到什么作用，其他其实没什么特别困难的

分治到最深层的条件是 `start > end` 且返回的是数组 `[null]`

```js
/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  if (n === 0) return []// 排除特殊
  let res = getsubarr(1, n)

  return res
};

function getsubarr(start, end) {
  let res = []
  // 这里代表达到最深层
  if (start > end) {
    return [null]
  }
  for (let i = start; i <= end; i++) {
    // 左边的比他小，右边的比他大
    let l = getsubarr(start, i - 1)
    let r = getsubarr(i + 1, end)
    // 拼接
    for (let left of l) {
      for (let right of r) {
        // 这里注意，最深层次时 left == right == [null]
        // 此时node会生成为 [i的值]，node是个数组！所以res和l和r都是二维数组
        // 当循环中，i=3 left = [1,null,2] right = [null]时，TreeNode会自动拼成 [3,1,null,null,2]的形态
        // 他是按照top, left.top, right.top, left.left, left.right, right.left, right.right 这样的形式拼出树
        let node = new TreeNode(i, left, right)
        res.push(node)
      }
    }
  }
  return res
}
```

