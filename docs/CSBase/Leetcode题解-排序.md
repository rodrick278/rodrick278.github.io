---
title: Leetcode题解-排序
date: 2021-01-16
categories:
 - CS基础
tags:
 - 算法思想
---

## 冒泡排序

两层循环，内层每次循环一次就能把一个最大值扔到数组最后面，外层控制内层需要循环的数组长度。

**一轮中如果没有产生交换数据，则证明已经不需要排序了。**

```js
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let mark = true;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        mark = false
      }
    }
    if (mark) break;
  }
  return arr
}
```

## 选择排序

内层循环每轮获取最小值放到最左边，然后向右缩小需要搜索的数组范围。

```js
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
```

## 插入排序

从 index = 1 开始，先保存当前 arr[i] 的值，然后比较前面一位和当前的大小，如果前面的大，把前面这个值往后移一位，覆盖掉后面，直到没有比 arr[i] 大的了，然后把 arr[i] 塞到那个位置

```js
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let pre = i - 1
    let cur = arr[i] // 这个值在这里就要取出来，因为后面 arr[i] 的值会变
    while (pre >= 0 && arr[pre] > cur) {
      arr[pre + 1] = arr[pre]
      pre--
    }
    arr[pre + 1] = cur
  }
  return arr
}
```

## 希尔排序

通过某个增量 gap，将整个序列分给若干组，从后往前进行组内成员的比较和交换，随后逐步缩小增量至 1。希尔排序类似于插入排序，只是一开始向前移动的步数从 1 变成了 gap。

```js
function shellSort(arr) {
  let len = arr.length;
  // 初始步数
  let gap = parseInt(len / 2);
  // 逐渐缩小步数
  while (gap) {
    // 从第gap个元素开始遍历
    for (let i = gap; i < len; i++) {
      // 逐步其和前面其他的组成员进行比较和交换
      for (let j = i - gap; j >= 0; j -= gap) {
        if (arr[j] > arr[j + gap]) {
          [arr[j], arr[j + gap]] = [arr[j + gap], arr[j]];
        } else {
          break;
        }
      }
    }
    gap = parseInt(gap / 2);
  }
  return arr
}
```

## 归并排序⭐

归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。该算法是采用**分治法**（Divide and Conquer）的一个非常典型的应用。

将数组反复递归切分，切分到有一边一个元素，然后从最小组开始比对，最小组排序后对第二大组排，如图所示：

![img](https://www.runoob.com/wp-content/uploads/2019/03/mergeSort.gif)

```js
function mergeSort(arr) {
  debugger
  if (arr.length < 2) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }
  return result
}
```



## 快速排序⭐⭐

用于求解 **Kth Element** 问题，也就是第 K 个元素的问题。

可以使用快速排序的 partition() 进行实现。需要先打乱数组，否则最坏情况下时间复杂度为 O(N2)。

参考文章：https://blog.csdn.net/qq_40941722/article/details/94396010

**基本写法**

```js
function quickSort(arr, begin, end) {
  if (begin >= end) return arr;

  let keyVal = arr[begin] // 基准值
  let i = begin // 起点游标
  let j = end   // 结束游标

  while (i != j) {
    while (i < j && arr[j] >= keyVal) {
      j--
    }
    while (i < j && arr[i] <= keyVal) {
      i++
    }
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  [arr[i], arr[begin]] = [arr[begin], arr[i]]

  // 分治
  quickSort(arr, begin, i - 1)
  quickSort(arr, i + 1, end)
  return arr
}
quickSort([6,1,2,7,9,3,4,5,10,8],0,9)
```



## 堆排序⭐⭐

用于求解 **TopK Elements** 问题，也就是 K 个最小元素的问题。

堆排序的思路是：

1. 从最后一个非叶子节点 `arr[Math.floor(arr.length/2)-1]` 开始，从顶向下堆化

2. 堆化是分别判断每一个非叶子节点 `i` ，和它的左右子节点 `i*2+1` & `i*2+2` 进行大小比较，将这个“三角堆”中的最大或者最小值放到三角的顶端

3. 大顶堆：`arr[i]>=arr[i*2+1] && arr[i]>=arr[i*2+2]`

   小顶堆：`arr[i]<=arr[i*2+1] && arr[i]<=arr[i*2+2]`

4. 形成顶堆之后**只能保证最上面的是最大值或者最小值**，最终形成排序需要反复将堆顶和当前堆底互换再堆化：

   ```js
   // 循环n-1次，每次循环后交换堆顶元素和堆底元素并重新调整堆结构
   for (let i = nums.length - 1; i > 0; i--) {
     [nums[i], nums[0]] = [nums[0], nums[i]];
     this.heapify(nums, 0, i);// 参数：数组、堆顶index、需要堆化的size
     console.log(`${nums[i]}作为堆顶元素：`, nums);
   }
   ```

   

堆排序参考文章 ：

- https://www.cnblogs.com/chengxiao/p/6129630.html

- https://juejin.cn/post/6844904039566540808#heading-33

  

快速选择也可以求解 TopK Elements 问题，因为找到 Kth Element 之后，再遍历一次数组，所有小于等于 Kth Element 的元素都是 TopK Elements。

可以看到，快速选择和堆排序都可以求解 Kth Element 和 TopK Elements 问题

### 1. 数组中的第K个最大元素⭐

[215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

**题目：**

在未排序的数组中找到第 **k** 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

**说明:**

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

**示例 1:**

```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

**示例 2:**

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

**题解：**

**排序**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  return nums.sort((a,b)=>a-b)[nums.length-k]
};
```

**堆排序**

思路：取一个长度为 k 的数组，这个数组用来存前 k 个最大值，因为前 k 个最大值作出小顶堆之后，第一个值就是目标值。

1. 先将 nums 前 k 个数做成数组 arr，然后小顶堆化。

2. 从 nums[k] 开始向后遍历，如果值比 arr[0] 大，就说明 arr 里存的不是最大的 k 个值，

3. 执行 `arr[0]=nums[k]` ，然后再小顶堆化。

4. 结果产生

```js
/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let findKthLargest = function (nums, k) {
  let arr = []
  // 先构建一个有 k 个数的数组
  arr.push(...nums.slice(0, k))
  // 为了取前k个数最小值，所以我们先要造小顶堆
  buildHeap(arr, k)

  for (let i = k; i < nums.length; i++) {
    if (nums[i] > arr[0]) {
      arr[0] = nums[i]
      heapify(arr, 0, arr.length)
    }
  }
  return arr[0]
};

/**
 * @description: 构建堆
 * @Author: rodrick
 * @Date: 2021-01-14 22:16:03
 * @param {*} arr 数组
 * @param {*} size 需要堆化的长度
 * @return {*}
 */
function buildHeap(arr, size) {
  // 从最后一个非叶子节点开始
  let start = Math.floor(size / 2) - 1
  for (let i = start; i >= 0; i--) {
    heapify(arr, i, size)
  }
}
/**
 * @description: 从上向下堆化
 * @Author: rodrick
 * @Date: 2021-01-14 22:14:58
 * @param {*} arr 数组
 * @param {*} index 堆顶index
 * @param {*} size 需要堆化的长度
 * @return {*}
 */
function heapify(arr, index, size) {
  while (true) {
    // 我们需要不断提取出最大值到堆三角的上面，所以需要 min
    let min = index
    let left = index * 2 + 1 // 左节点
    let right = index * 2 + 2 // 右节点
    // 先判断和 size 对比，因为目标 size 不一定等于 arr 长度，不是一直都整个数组需要堆化
    // 然后找到这个堆三角中的最大值，替换【注意这里是和 arr[min] 比较，min 的值是会变的】
    if (left < size && arr[left] < arr[min]) {
      min = left
    }
    if (right < size && arr[right] < arr[min]) {
      min = right
    }
    // 注意这里很重要！先把最大的值拿到三角堆顶，这次交换可能已经破坏了堆结构！
    // 所以把 index 放到 min 的位置【min 可能是三角底的某个角】
    // 然后我们再循环，确认当前 min 作为顶的三角是不是被破坏了，如果破坏了再堆化，再往下层确认，直到没有发生破坏为止
    if (min != index) {
      [arr[min], arr[index]] = [arr[index], arr[min]]
      index = min
    } else {
      break;
    }
  }
}
```

**快速排序**

思路：在正常的快排基础上，加一个 `l` 和 `arr.length - k` 的比较，如果 `l` 大，说明基准值位置向目标位置 `arr.length - k` 右侧偏移了，此时在他右侧的值一定比第 k 个值大，我们就不用再排右侧的了，反之亦然。可以节约递归。

```js
/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  quickSort(nums, 0, nums.length - 1, k)
  return nums[nums.length - k]
};
function quickSort(arr, begin, end, k) {
  debugger
  if (begin >= end) return arr;

  let keyVal = arr[begin]
  let l = begin
  let r = end

  while (l != r) {
    while (l < r && arr[r] >= keyVal) {
      r--
    }
    while (l < r && arr[l] <= keyVal) {
      l++
    }
    if (l < r) {
      [arr[l], arr[r]] = [arr[r], arr[l]]
    }
  }

  [arr[begin], arr[l]] = [arr[l], arr[begin]]

  if (l > arr.length - k) {
    quickSort(arr, begin, l - 1, k)
  } else if (l < arr.length - k) {
    quickSort(arr, l + 1, end, k)
  } else {
    return arr
  }
  return arr
}
```

### 2. 最小K个数

[面试题 17.14. 最小K个数](https://leetcode-cn.com/problems/smallest-k-lcci/)

**题目：**

设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

**说明:**

- `0 <= len(arr) <= 100000`
- `0 <= k <= min(100000, len(arr))`

**示例：**

```
输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]
```

**题解：**

快速排序思路和上面一样就不写了，这里用堆排序

```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function (arr, k) {
  let karr = []
  karr.push(...arr.slice(0, k))
  buildHeap(karr)

  for (let i = k; i <= arr.length - 1; i++) {
    if (arr[i] < karr[0]) {
      karr[0] = arr[i]
      heap(karr, 0, k)
    }
  }
  return karr
};

function buildHeap(arr) {
  let start = Math.floor(arr.length / 2) - 1
  for (let i = start; i >= 0; i--) {
    heap(arr, i, arr.length)
  }
}

function heap(arr, top, size) {
  while (true) {
    let max = top
    let l = max * 2 + 1
    let r = max * 2 + 2

    if (l < size && arr[l] > arr[max]) {
      max = l
    }
    if (r < size && arr[r] > arr[max]) {
      max = r
    }
    if (max !== top) {
      [arr[max], arr[top]] = [arr[top], arr[max]]
      top = max
    } else {
      break;
    }
  }
}
```

## 桶排序

### 3. 前 K 个高频元素⭐

[347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

给定一个非空的整数数组，返回其中出现频率前 **k** 高的元素。

**示例 1:**

```
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```

**示例 2:**

```
输入: nums = [1], k = 1
输出: [1]
```

**提示：**

- 你可以假设给定的 *k* 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
- 你的算法的时间复杂度**必须**优于 O(*n* log *n*) , *n* 是数组的大小。
- 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
- 你可以按任意顺序返回答案。

**题解：**

**Map + sort**

```js
/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  debugger
  let result = []
  // 存放 数字：次数
  let already = new Map()
  for (let item of nums) {
    if (already.has(item)) {
      already.set(item, already.get(item) + 1)
    } else {
      already.set(item, 1)
    }
  }
	// 排序、截取、扔进结果
  Array.from(already).sort((a, b) => b[1] - a[1]).slice(0, k).forEach((val, index) => {
    result.push(val[0])
  })

  return result
};
```

**桶排序**

思路：桶是按照频次来分，频次用现成的数组下标表示，数组是个二维数组，第二层数组是同频率数字的集合数组。

```js
/*
 * @lc app=leetcode.cn id=347 lang=javascript
 *
 * [347] 前 K 个高频元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  let result = []
  let map = new Map()
  nums.forEach(val => {
    if (map.has(val)) {
      map.set(val, map.get(val) + 1)
    } else {
      map.set(val, 1)
    }
  })

  let arr = [] //二维数组，下标代表频次，下标的值是[这个频次的所有数]
  // map 的 val 是次数，key 是数字
  map.forEach((val, key) => {
    if (arr[val]) {
      arr[val].push(key)
    } else {
      arr[val] = [key]
    }
  })

  // 倒序拿值
  for (let i = arr.length - 1; i >= 0; i--) {
    if (result.length >= k) break;

    if (arr[i]) {
      result.push(...arr[i])
    }
  }
  // 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。所以不用 slice
  return result
};
```

### 4. 根据字符出现频率排序

[451. 根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency/)

给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

**示例 1:**

```
输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
```

**示例 2:**

```
输入:
"cccaaa"

输出:
"cccaaa"

解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
```

**示例 3:**

```
输入:
"Aabb"

输出:
"bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```

**题解：**

原理和上面一样，Map 存储 字符和频率 => 扔进数组用下标作为频率 => 倒序输出拼接字符串用 `.repeat(n)`

```js
/*
 * @lc app=leetcode.cn id=451 lang=javascript
 *
 * [451] 根据字符出现频率排序
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  let result = []
  let map = new Map()
  s.split('').forEach(val => {
    if (map.has(val)) {
      map.set(val, map.get(val) + 1)
    } else {
      map.set(val, 1)
    }
  })

  let arr = [] // 存桶，下标代表频率
  map.forEach((freq, char) => {
    if (arr[freq]) {
      arr[freq].push(char)
    } else {
      arr[freq] = [char]
    }
  })

  // 倒序输出
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i]) {
      arr[i].map(char => {
        result.push(char.repeat(i))
      })
    }
  }
  return result.join('')
};
```

## 5. 荷兰国旗问题⭐

[75. 颜色分类](https://leetcode-cn.com/problems/sort-colors/)

给定一个包含红色、白色和蓝色，一共 `n` 个元素的数组，**[原地](https://baike.baidu.com/item/原地算法)**对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 `0`、 `1` 和 `2` 分别表示红色、白色和蓝色。

**注意：** 请不要使用代码库中的排序函数来解决这道题。

**示例 1：**

```
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
```

**提示：**

- `n == nums.length`
- `1 <= n <= 300`
- `nums[i]` 为 `0`、`1` 或 `2`

**题解：**

**0 往左，2 往右，不管1**

```js
/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  for (let i = 0, count = 0; count <= nums.length - 1; count++) {
    if (nums[i] == 0) {
      nums.splice(i, 1)
      nums.unshift(0)
      i++
    } else if (nums[i] == 2) {
      nums.splice(i, 1)
      nums.push(2)
    } else {
      i++
    }
  }
};
```

**三指针处理**

思路：参考[官方题解](https://leetcode-cn.com/problems/sort-colors/solution/yan-se-fen-lei-by-leetcode-solution/)，zero 指针用来存 cur遇到的 0，two 指针用来存 cur 遇到的 2，但是注意，遇到 2 交换之后，我们没有立刻 `cur++` ，因为你知不知道交换到 cur 的值是不是还是一个 2，所以我们仅仅 `two--` 直到交换来的不是 2 才继续 `cur++`

```js
/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let zero = 0
  let two = nums.length - 1
  let cur = 0
  while (cur <= two) {
    if (nums[cur] == 0) {
      [nums[cur], nums[zero]] = [nums[zero], nums[cur]]
      cur++
      zero++
    } else if (nums[cur] == 1) {
      cur++
    } else {
      [nums[cur], nums[two]] = [nums[two], nums[cur]]
      two--
    }
  }
};
```

