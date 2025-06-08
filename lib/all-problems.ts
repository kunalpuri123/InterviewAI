import type { Problem } from "./problems"

export const allProblems: Problem[] = [
  // Array / String
  {
    id: 4,
    title: "Merge Sorted Array",
    difficulty: "Easy",
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.`,
    examples: [
      {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation: "The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6].",
      },
      {
        input: "nums1 = [1], m = 1, nums2 = [], n = 0",
        output: "[1]",
        explanation: "The arrays we are merging are [1] and []. The result of the merge is [1].",
      },
    ],
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "1 <= m + n <= 200",
      "-10^9 <= nums1[i], nums2[i] <= 10^9",
    ],
    testCases: [
      { input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], expected: [1, 2, 2, 3, 5, 6] },
      { input: [[1], 1, [], 0], expected: [1] },
      { input: [[0], 0, [1], 1], expected: [1] },
      { input: [[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3], expected: [1, 2, 3, 4, 5, 6] },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // Your code here
    return nums1; // For testing purposes
};`,
      python: `def merge(nums1, m, nums2, n):
    """
    :type nums1: List[int]
    :type m: int
    :type nums2: List[int]
    :type n: int
    :rtype: None Do not return anything, modify nums1 in-place instead.
    """
    # Your code here
    return nums1  # For testing purposes`,
      java: `class Solution {
    public int[] merge(int[] nums1, int m, int[] nums2, int n) {
        // Your code here
        return nums1; // For testing purposes
    }
}`,
    },
    acceptance: 92,
    tags: ["Array", "Two Pointers", "Sorting"],
  },
  {
    id: 5,
    title: "Remove Element",
    difficulty: "Easy",
    description: `Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:

- Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
- Return k.`,
    examples: [
      {
        input: "nums = [3,2,2,3], val = 3",
        output: "2, nums = [2,2,_,_]",
        explanation: "Your function should return k = 2, with the first two elements of nums being 2.",
      },
      {
        input: "nums = [0,1,2,2,3,0,4,2], val = 2",
        output: "5, nums = [0,1,4,0,3,_,_,_]",
        explanation:
          "Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.",
      },
    ],
    constraints: ["0 <= nums.length <= 100", "0 <= nums[i] <= 50", "0 <= val <= 100"],
    testCases: [
      { input: [[3, 2, 2, 3], 3], expected: 2 },
      { input: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: 5 },
      { input: [[], 1], expected: 0 },
      { input: [[1], 1], expected: 0 },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    // Your code here
};`,
      python: `def removeElement(nums, val):
    """
    :type nums: List[int]
    :type val: int
    :rtype: int
    """
    # Your code here
    pass`,
      java: `class Solution {
    public int removeElement(int[] nums, int val) {
        // Your code here
    }
}`,
    },
    acceptance: 89,
    tags: ["Array", "Two Pointers"],
  },
  {
    id: 6,
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    description: `Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

- Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
- Return k.`,
    examples: [
      {
        input: "nums = [1,1,2]",
        output: "2, nums = [1,2,_]",
        explanation:
          "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.",
      },
      {
        input: "nums = [0,0,1,1,1,2,2,3,3,4]",
        output: "5, nums = [0,1,2,3,4,_,_,_,_,_]",
        explanation:
          "Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.",
      },
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4", "-100 <= nums[i] <= 100", "nums is sorted in non-decreasing order."],
    testCases: [
      { input: [[1, 1, 2]], expected: 2 },
      { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5 },
      { input: [[1]], expected: 1 },
      { input: [[1, 2]], expected: 2 },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // Your code here
};`,
      python: `def removeDuplicates(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
      java: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Your code here
    }
}`,
    },
    acceptance: 88,
    tags: ["Array", "Two Pointers"],
  },
  {
    id: 7,
    title: "Remove Duplicates from Sorted Array II",
    difficulty: "Medium",
    description: `Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.`,
    examples: [
      {
        input: "nums = [1,1,1,2,2,3]",
        output: "5, nums = [1,1,2,2,3,_]",
        explanation:
          "Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.",
      },
      {
        input: "nums = [0,0,1,1,1,1,2,3,3]",
        output: "7, nums = [0,0,1,1,2,3,3,_,_]",
        explanation:
          "Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums is sorted in non-decreasing order.",
    ],
    testCases: [
      { input: [[1, 1, 1, 2, 2, 3]], expected: 5 },
      { input: [[0, 0, 1, 1, 1, 1, 2, 3, 3]], expected: 7 },
      { input: [[1, 1, 1, 1]], expected: 2 },
      { input: [[1, 2, 3]], expected: 3 },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // Your code here
};`,
      python: `def removeDuplicates(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
      java: `class Solution {
    public int removeDuplicates(int[] nums) {
        // Your code here
    }
}`,
    },
    acceptance: 76,
    tags: ["Array", "Two Pointers"],
  },
  {
    id: 8,
    title: "Majority Element",
    difficulty: "Easy",
    description: `Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.`,
    examples: [
      {
        input: "nums = [3,2,3]",
        output: "3",
      },
      {
        input: "nums = [2,2,1,1,1,2,2]",
        output: "2",
      },
    ],
    constraints: ["n == nums.length", "1 <= n <= 5 * 10^4", "-10^9 <= nums[i] <= 10^9"],
    testCases: [
      { input: [[3, 2, 3]], expected: 3 },
      { input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 },
      { input: [[1]], expected: 1 },
      { input: [[1, 1, 2, 2, 2]], expected: 2 },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    // Your code here
};`,
      python: `def majorityElement(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
      java: `class Solution {
    public int majorityElement(int[] nums) {
        // Your code here
    }
}`,
    },
    acceptance: 84,
    tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Counting"],
  },
  {
    id: 9,
    title: "Rotate Array",
    difficulty: "Medium",
    description: `Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.`,
    examples: [
      {
        input: "nums = [1,2,3,4,5,6,7], k = 3",
        output: "[5,6,7,1,2,3,4]",
        explanation:
          "rotate 1 steps to the right: [7,1,2,3,4,5,6]\nrotate 2 steps to the right: [6,7,1,2,3,4,5]\nrotate 3 steps to the right: [5,6,7,1,2,3,4]",
      },
      {
        input: "nums = [-1,-100,3,99], k = 2",
        output: "[3,99,-1,-100]",
        explanation: "rotate 1 steps to the right: [99,-1,-100,3]\nrotate 2 steps to the right: [3,99,-1,-100]",
      },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1", "0 <= k <= 10^5"],
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4] },
      { input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100] },
      { input: [[1, 2], 1], expected: [2, 1] },
      { input: [[1], 1], expected: [1] },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    // Your code here
    return nums; // For testing purposes
};`,
      python: `def rotate(nums, k):
    """
    :type nums: List[int]
    :type k: int
    :rtype: None Do not return anything, modify nums in-place instead.
    """
    # Your code here
    return nums  # For testing purposes`,
      java: `class Solution {
    public int[] rotate(int[] nums, int k) {
        // Your code here
        return nums; // For testing purposes
    }
}`,
    },
    acceptance: 73,
    tags: ["Array", "Math", "Two Pointers"],
  },
  {
    id: 10,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0.",
      },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 },
      { input: [[1, 2]], expected: 1 },
      { input: [[2, 4, 1]], expected: 2 },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Your code here
};`,
      python: `def maxProfit(prices):
    """
    :type prices: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Your code here
    }
}`,
    },
    acceptance: 78,
    tags: ["Array", "Dynamic Programming"],
  },
  {
    id: 11,
    title: "Best Time to Buy and Sell Stock II",
    difficulty: "Medium",
    description: `You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.`,
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "7",
        explanation:
          "Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4. Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3. Total profit is 4 + 3 = 7.",
      },
      {
        input: "prices = [1,2,3,4,5]",
        output: "4",
        explanation: "Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.",
      },
    ],
    constraints: ["1 <= prices.length <= 3 * 10^4", "0 <= prices[i] <= 10^4"],
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 7 },
      { input: [[1, 2, 3, 4, 5]], expected: 4 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 },
      { input: [[1, 2, 1, 2]], expected: 2 },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Your code here
};`,
      python: `def maxProfit(prices):
    """
    :type prices: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        // Your code here
    }
}`,
    },
    acceptance: 71,
    tags: ["Array", "Dynamic Programming", "Greedy"],
  },
  // Two Pointers
  {
    id: 12,
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
    ],
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters."],
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [" "], expected: true },
      { input: ["Madam"], expected: true },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // Your code here
};`,
      python: `def isPalindrome(s):
    """
    :type s: str
    :rtype: bool
    """
    # Your code here
    pass`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
    }
}`,
    },
    acceptance: 82,
    tags: ["Two Pointers", "String"],
  },
  {
    id: 13,
    title: "Is Subsequence",
    difficulty: "Easy",
    description: `Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).`,
    examples: [
      {
        input: 's = "abc", t = "aebdc"',
        output: "true",
      },
      {
        input: 's = "axc", t = "ahbgdc"',
        output: "false",
      },
    ],
    constraints: [
      "0 <= s.length <= 100",
      "0 <= t.length <= 10^4",
      "s and t consist only of lowercase English letters.",
    ],
    testCases: [
      { input: ["abc", "aebdc"], expected: true },
      { input: ["axc", "ahbgdc"], expected: false },
      { input: ["", "ahbgdc"], expected: true },
      { input: ["abc", ""], expected: false },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
    // Your code here
};`,
      python: `def isSubsequence(s, t):
    """
    :type s: str
    :type t: str
    :rtype: bool
    """
    # Your code here
    pass`,
      java: `class Solution {
    public boolean isSubsequence(String s, String t) {
        // Your code here
    }
}`,
    },
    acceptance: 85,
    tags: ["Two Pointers", "String", "Dynamic Programming"],
  },
  {
    id: 14,
    title: "Container With Most Water",
    difficulty: "Medium",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container that can hold the most water.

Return the maximum amount of water a container can store.`,
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    testCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { input: [[1, 1]], expected: 1 },
      { input: [[4, 3, 2, 1, 4]], expected: 16 },
      { input: [[1, 2, 1]], expected: 2 },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // Your code here
};`,
      python: `def maxArea(height):
    """
    :type height: List[int]
    :rtype: int
    """
    # Your code here
    pass`,
      java: `class Solution {
    public int maxArea(int[] height) {
        // Your code here
    }
}`,
    },
    acceptance: 76,
    tags: ["Array", "Two Pointers", "Greedy"],
  },
  // Add more problems...
  {
    id: 15,
    title: "3Sum",
    difficulty: "Medium",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation:
          "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0.",
      },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    testCases: [
      {
        input: [[-1, 0, 1, 2, -1, -4]],
        expected: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
      },
      { input: [[0, 1, 1]], expected: [] },
      { input: [[0, 0, 0]], expected: [[0, 0, 0]] },
      {
        input: [[-2, 0, 1, 1, 2]],
        expected: [
          [-2, 0, 2],
          [-2, 1, 1],
        ],
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // Your code here
};`,
      python: `def threeSum(nums):
    """
    :type nums: List[int]
    :rtype: List[List[int]]
    """
    # Your code here
    pass`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Your code here
    }
}`,
    },
    acceptance: 68,
    tags: ["Array", "Two Pointers", "Sorting"],
  },
]

// Update the main problems array to include all problems
export const updatedProblems = [...allProblems]
