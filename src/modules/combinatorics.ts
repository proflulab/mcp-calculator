import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 阶乘工具
const factorialTool: ToolRegistration = {
  name: "factorial",
  definition: {
    title: "阶乘",
    description: "计算非负整数的阶乘",
    inputSchema: {
      n: z.number().int().min(0).describe("非负整数")
    }
  },
  handler: async ({ n }: { n: number }) => {
    if (n > 170) {
      return createErrorResponse("数字过大，会导致溢出！请输入小于等于170的数字。");
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }

    return createSuccessResponse(`阶乘结果：${n}! = ${result}`);
  }
};

// 排列工具
const permutationTool: ToolRegistration = {
  name: "permutation",
  definition: {
    title: "排列",
    description: "计算从n个元素中选择r个元素的排列数 P(n,r)",
    inputSchema: {
      n: z.number().int().min(0).describe("总元素数"),
      r: z.number().int().min(0).describe("选择元素数")
    }
  },
  handler: async ({ n, r }: { n: number; r: number }) => {
    if (r > n) {
      return createErrorResponse("选择元素数不能大于总元素数！");
    }
    if (n > 170) {
      return createErrorResponse("数字过大，会导致溢出！请输入小于等于170的数字。");
    }

    let result = 1;
    for (let i = n; i > n - r; i--) {
      result *= i;
    }

    return createSuccessResponse(`排列结果：P(${n},${r}) = ${result}`);
  }
};

// 组合工具
const combinationTool: ToolRegistration = {
  name: "combination",
  definition: {
    title: "组合",
    description: "计算从n个元素中选择r个元素的组合数 C(n,r)",
    inputSchema: {
      n: z.number().int().min(0).describe("总元素数"),
      r: z.number().int().min(0).describe("选择元素数")
    }
  },
  handler: async ({ n, r }: { n: number; r: number }) => {
    if (r > n) {
      return createErrorResponse("选择元素数不能大于总元素数！");
    }
    if (n > 170) {
      return createErrorResponse("数字过大，会导致溢出！请输入小于等于170的数字。");
    }

    // 优化：C(n,r) = C(n,n-r)，选择较小的r来计算
    r = Math.min(r, n - r);

    let result = 1;
    for (let i = 0; i < r; i++) {
      result = result * (n - i) / (i + 1);
    }

    return createSuccessResponse(`组合结果：C(${n},${r}) = ${Math.round(result)}`);
  }
};

// 斐波那契数列工具
const fibonacciTool: ToolRegistration = {
  name: "fibonacci",
  definition: {
    title: "斐波那契数列",
    description: "计算斐波那契数列的第n项",
    inputSchema: {
      n: z.number().int().min(0).describe("项数（从0开始）")
    }
  },
  handler: async ({ n }: { n: number }) => {
    if (n > 1476) {
      return createErrorResponse("数字过大，会导致溢出！请输入小于等于1476的数字。");
    }

    if (n === 0) return createSuccessResponse(`斐波那契数列第${n}项：0`);
    if (n === 1) return createSuccessResponse(`斐波那契数列第${n}项：1`);

    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }

    return createSuccessResponse(`斐波那契数列第${n}项：${b}`);
  }
};

// 斐波那契数列序列工具
const fibonacciSequenceTool: ToolRegistration = {
  name: "fibonacciSequence",
  definition: {
    title: "斐波那契数列序列",
    description: "生成斐波那契数列的前n项",
    inputSchema: {
      n: z.number().int().min(1).max(100).describe("生成项数（1-100）")
    }
  },
  handler: async ({ n }: { n: number }) => {
    const sequence: number[] = [];

    if (n >= 1) sequence.push(0);
    if (n >= 2) sequence.push(1);

    for (let i = 2; i < n; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    return createSuccessResponse(`斐波那契数列前${n}项：[${sequence.join(', ')}]`);
  }
};

// 卡塔兰数工具
const catalanTool: ToolRegistration = {
  name: "catalan",
  definition: {
    title: "卡塔兰数",
    description: "计算第n个卡塔兰数",
    inputSchema: {
      n: z.number().int().min(0).max(35).describe("项数（0-35）")
    }
  },
  handler: async ({ n }: { n: number }) => {
    if (n === 0) return createSuccessResponse(`第${n}个卡塔兰数：1`);

    // 使用递推公式：C(n) = C(2n,n) / (n+1)
    let result = 1;
    for (let i = 0; i < n; i++) {
      result = result * (2 * n - i) / (i + 1);
    }
    result = Math.round(result / (n + 1));

    return createSuccessResponse(`第${n}个卡塔兰数：${result}`);
  }
};

// 贝尔数工具（前几项）
const bellNumberTool: ToolRegistration = {
  name: "bellNumber",
  definition: {
    title: "贝尔数",
    description: "计算第n个贝尔数（集合划分数）",
    inputSchema: {
      n: z.number().int().min(0).max(15).describe("项数（0-15）")
    }
  },
  handler: async ({ n }: { n: number }) => {
    // 预计算的贝尔数（避免复杂计算）
    const bellNumbers = [
      1, 1, 2, 5, 15, 52, 203, 877, 4140, 21147,
      115975, 678570, 4213597, 27644437, 190899322, 1382958545
    ];

    if (n < bellNumbers.length) {
      return createSuccessResponse(`第${n}个贝尔数：${bellNumbers[n]}`);
    }

    return createErrorResponse("超出预计算范围！");
  }
};

// 二项式系数工具（与组合相同，但提供不同的描述）
const binomialCoefficientTool: ToolRegistration = {
  name: "binomialCoefficient",
  definition: {
    title: "二项式系数",
    description: "计算二项式系数 (n choose k)",
    inputSchema: {
      n: z.number().int().min(0).describe("上标"),
      k: z.number().int().min(0).describe("下标")
    }
  },
  handler: async ({ n, k }: { n: number; k: number }) => {
    if (k > n) {
      return createErrorResponse("下标不能大于上标！");
    }
    if (n > 170) {
      return createErrorResponse("数字过大，会导致溢出！请输入小于等于170的数字。");
    }

    // 优化：C(n,k) = C(n,n-k)
    k = Math.min(k, n - k);

    let result = 1;
    for (let i = 0; i < k; i++) {
      result = result * (n - i) / (i + 1);
    }

    return createSuccessResponse(`二项式系数：(${n} choose ${k}) = ${Math.round(result)}`);
  }
};

export const combinatoricsTools: ToolRegistration[] = [
  factorialTool,
  permutationTool,
  combinationTool,
  fibonacciTool,
  fibonacciSequenceTool,
  catalanTool,
  bellNumberTool,
  binomialCoefficientTool
];