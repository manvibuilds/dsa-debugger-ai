/* Test Cases for AI DSA Debugger Frontend */

// Test Case 1: Python Two Sum Problem
const testCase1 = {
  language: "python",
  code: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
  error:
    "Test case fails: two_sum([2,7,11,15], 9) returns [] instead of [0,1]. The function should return indices of the two numbers that add up to the target.",
};

// Test Case 2: JavaScript Binary Search
const testCase2 = {
  language: "javascript",
  code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return -1;
}`,
  error:
    "Function returns -1 for binarySearch([1,3,5,7,9], 7) but should return 3. The binary search seems to miss the target value.",
};

// Test Case 3: Java Linked List Reversal
const testCase3 = {
  language: "java",
  code: `public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;
    
    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        current = next;
        prev = current;
    }
    
    return prev;
}`,
  error:
    "Getting null pointer exception when trying to reverse list [1->2->3->null]. The function crashes instead of returning [3->2->1->null].",
};

// Test Case 4: C++ Array Maximum
const testCase4 = {
  language: "cpp",
  code: `#include <vector>
#include <algorithm>
using namespace std;

int findMax(vector<int>& nums) {
    int maxVal = nums[0];
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] > maxVal) {
            maxVal = nums[i];
        }
    }
    return maxVal;
}`,
  error:
    "Segmentation fault when calling findMax() with an empty vector. Expected to handle edge case gracefully or throw appropriate error.",
};

/* 
How to test:
1. Copy one of the test cases above
2. Select the matching language in the dropdown
3. Paste the code in the "Your Code" section
4. Paste the error in the "Error / Failing Test Case" section  
5. Click "Debug My Code"
6. Wait for the AI analysis
7. Use the copy button to save the response
*/
