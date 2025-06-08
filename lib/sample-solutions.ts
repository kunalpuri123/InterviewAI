export const sampleSolutions = {
  1: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
};`,
    python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        return new int[0];
    }
}`,
  },
  2: {
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (map[char]) {
            // If it's an opening bracket, push to stack
            stack.push(char);
        } else {
            // If it's a closing bracket
            const lastBracket = stack.pop();
            
            // Check if the current closing bracket matches the last opening bracket
            if (map[lastBracket] !== char) {
                return false;
            }
        }
    }
    
    // If stack is empty, all brackets were matched
    return stack.length === 0;
};`,
    python: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    stack = []
    mapping = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    
    for char in s:
        if char in mapping:
            # If it's an opening bracket, push to stack
            stack.append(char)
        else:
            # If it's a closing bracket
            if not stack:
                return False
                
            last_bracket = stack.pop()
            
            # Check if the current closing bracket matches the last opening bracket
            if mapping[last_bracket] != char:
                return False
    
    # If stack is empty, all brackets were matched
    return len(stack) == 0`,
    java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> map = new HashMap<>();
        map.put('(', ')');
        map.put('[', ']');
        map.put('{', '}');
        
        for (char c : s.toCharArray()) {
            if (map.containsKey(c)) {
                // If it's an opening bracket, push to stack
                stack.push(c);
            } else {
                // If it's a closing bracket
                if (stack.isEmpty()) {
                    return false;
                }
                
                char lastBracket = stack.pop();
                
                // Check if the current closing bracket matches the last opening bracket
                if (map.get(lastBracket) != c) {
                    return false;
                }
            }
        }
        
        // If stack is empty, all brackets were matched
        return stack.isEmpty();
    }
}`,
  },
  3: {
    javascript: `/**
 * For this problem, you can work with arrays directly
 * @param {number[]} list1
 * @param {number[]} list2
 * @return {number[]}
 */
var mergeTwoLists = function(list1, list2) {
    const merged = [];
    let i = 0;
    let j = 0;
    
    // Compare elements from both lists and add the smaller one to the result
    while (i < list1.length && j < list2.length) {
        if (list1[i] <= list2[j]) {
            merged.push(list1[i]);
            i++;
        } else {
            merged.push(list2[j]);
            j++;
        }
    }
    
    // Add any remaining elements from list1
    while (i < list1.length) {
        merged.push(list1[i]);
        i++;
    }
    
    // Add any remaining elements from list2
    while (j < list2.length) {
        merged.push(list2[j]);
        j++;
    }
    
    return merged;
};`,
    python: `def mergeTwoLists(list1, list2):
    """
    :type list1: List[int]
    :type list2: List[int]
    :rtype: List[int]
    """
    merged = []
    i = j = 0
    
    # Compare elements from both lists and add the smaller one to the result
    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            merged.append(list1[i])
            i += 1
        else:
            merged.append(list2[j])
            j += 1
    
    # Add any remaining elements from list1
    while i < len(list1):
        merged.append(list1[i])
        i += 1
    
    # Add any remaining elements from list2
    while j < len(list2):
        merged.append(list2[j])
        j += 1
    
    return merged`,
    java: `class Solution {
    public int[] mergeTwoLists(int[] list1, int[] list2) {
        int[] merged = new int[list1.length + list2.length];
        int i = 0, j = 0, k = 0;
        
        // Compare elements from both lists and add the smaller one to the result
        while (i < list1.length && j < list2.length) {
            if (list1[i] <= list2[j]) {
                merged[k++] = list1[i++];
            } else {
                merged[k++] = list2[j++];
            }
        }
        
        // Add any remaining elements from list1
        while (i < list1.length) {
            merged[k++] = list1[i++];
        }
        
        // Add any remaining elements from list2
        while (j < list2.length) {
            merged[k++] = list2[j++];
        }
        
        return merged;
    }
}`,
  },
}
