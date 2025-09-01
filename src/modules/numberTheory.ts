import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 最大公约数工具
const gcdTool: ToolRegistration = {
  name: "gcd",
  definition: {
    title: "最大公约数",
    description: "计算两个或多个整数的最大公约数",
    inputSchema: {
      numbers: z.array(z.number().int()).min(2).describe("整数数组（至少2个数）")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a);
      b = Math.abs(b);
      while (b !== 0) {
        [a, b] = [b, a % b];
      }
      return a;
    };

    let result = Math.abs(numbers[0]);
    for (let i = 1; i < numbers.length; i++) {
      result = gcd(result, numbers[i]);
      if (result === 1) break; // 优化：如果已经是1，不需要继续计算
    }

    return createSuccessResponse(`最大公约数：gcd(${numbers.join(', ')}) = ${result}`);
  }
};

// 最小公倍数工具
const lcmTool: ToolRegistration = {
  name: "lcm",
  definition: {
    title: "最小公倍数",
    description: "计算两个或多个整数的最小公倍数",
    inputSchema: {
      numbers: z.array(z.number().int()).min(2).describe("整数数组（至少2个数）")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a);
      b = Math.abs(b);
      while (b !== 0) {
        [a, b] = [b, a % b];
      }
      return a;
    };

    const lcm = (a: number, b: number): number => {
      if (a === 0 || b === 0) return 0;
      return Math.abs(a * b) / gcd(a, b);
    };

    let result = Math.abs(numbers[0]);
    for (let i = 1; i < numbers.length; i++) {
      result = lcm(result, numbers[i]);
      if (result > Number.MAX_SAFE_INTEGER) {
        return createErrorResponse("结果过大，超出安全整数范围！");
      }
    }

    return createSuccessResponse(`最小公倍数：lcm(${numbers.join(', ')}) = ${result}`);
  }
};

// 素数判断工具
const isPrimeTool: ToolRegistration = {
  name: "isPrime",
  definition: {
    title: "素数判断",
    description: "判断一个正整数是否为素数",
    inputSchema: {
      n: z.number().int().min(1).describe("正整数")
    }
  },
  handler: async ({ n }: { n: number }) => {
    if (n === 1) {
      return createSuccessResponse(`${n} 不是素数（1既不是素数也不是合数）`);
    }
    if (n === 2) {
      return createSuccessResponse(`${n} 是素数`);
    }
    if (n % 2 === 0) {
      return createSuccessResponse(`${n} 不是素数（偶数）`);
    }

    // 检查奇数因子到√n
    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
      if (n % i === 0) {
        return createSuccessResponse(`${n} 不是素数（能被 ${i} 整除）`);
      }
    }

    return createSuccessResponse(`${n} 是素数`);
  }
};

// 素因数分解工具
const primeFactorizationTool: ToolRegistration = {
  name: "primeFactorization",
  definition: {
    title: "素因数分解",
    description: "将正整数分解为素因数的乘积",
    inputSchema: {
      n: z.number().int().min(2).describe("大于1的正整数")
    }
  },
  handler: async ({ n }: { n: number }) => {
    if (n > Number.MAX_SAFE_INTEGER) {
      return createErrorResponse("数字过大，超出安全整数范围！");
    }

    const factors: number[] = [];
    let num = n;

    // 检查2的因子
    while (num % 2 === 0) {
      factors.push(2);
      num /= 2;
    }

    // 检查奇数因子
    for (let i = 3; i * i <= num; i += 2) {
      while (num % i === 0) {
        factors.push(i);
        num /= i;
      }
    }

    // 如果num > 2，那么它是一个素数
    if (num > 2) {
      factors.push(num);
    }

    // 统计因子出现次数
    const factorCount = new Map<number, number>();
    factors.forEach(factor => {
      factorCount.set(factor, (factorCount.get(factor) || 0) + 1);
    });

    // 格式化输出
    const factorStrings = Array.from(factorCount.entries())
      .map(([factor, count]) => count === 1 ? `${factor}` : `${factor}^${count}`);

    return createSuccessResponse(`素因数分解：${n} = ${factorStrings.join(' × ')}`);
  }
};

// 欧拉函数工具
const eulerPhiTool: ToolRegistration = {
  name: "eulerPhi",
  definition: {
    title: "欧拉函数",
    description: "计算欧拉函数φ(n)，即小于等于n且与n互质的正整数个数",
    inputSchema: {
      n: z.number().int().min(1).describe("正整数")
    }
  },
  handler: async ({ n }: { n: number }) => {
    if (n === 1) {
      return createSuccessResponse(`φ(${n}) = 1`);
    }

    let result = n;
    let num = n;

    // 对每个素因子p，φ(n) = φ(n) * (1 - 1/p)
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        // i是一个素因子
        while (num % i === 0) {
          num /= i;
        }
        result -= result / i;
      }
    }

    // 如果num > 1，那么它是一个素因子
    if (num > 1) {
      result -= result / num;
    }

    return createSuccessResponse(`欧拉函数：φ(${n}) = ${Math.round(result)}`);
  }
};

// 完全数判断工具
const isPerfectNumberTool: ToolRegistration = {
  name: "isPerfectNumber",
  definition: {
    title: "完全数判断",
    description: "判断一个正整数是否为完全数（等于其所有真因子之和）",
    inputSchema: {
      n: z.number().int().min(1).describe("正整数")
    }
  },
  handler: async ({ n }: { n: number }) => {
    if (n === 1) {
      return createSuccessResponse(`${n} 不是完全数`);
    }

    let sum = 1; // 1总是一个真因子（除了n=1的情况）

    // 找到所有真因子并求和
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) {
        sum += i;
        if (i !== n / i) { // 避免重复计算平方根
          sum += n / i;
        }
      }
    }

    const isPerfect = sum === n;
    return createSuccessResponse(`${n} ${isPerfect ? '是' : '不是'}完全数${isPerfect ? '' : `（真因子之和为 ${sum}）`}`);
  }
};

// 因子个数工具
const divisorCountTool: ToolRegistration = {
  name: "divisorCount",
  definition: {
    title: "因子个数",
    description: "计算正整数的因子个数",
    inputSchema: {
      n: z.number().int().min(1).describe("正整数")
    }
  },
  handler: async ({ n }: { n: number }) => {
    let count = 0;

    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        count++; // 计算i
        if (i !== n / i) {
          count++; // 计算n/i（如果不同于i）
        }
      }
    }

    return createSuccessResponse(`${n} 的因子个数：${count}`);
  }
};

// 因子列表工具
const divisorListTool: ToolRegistration = {
  name: "divisorList",
  definition: {
    title: "因子列表",
    description: "列出正整数的所有因子",
    inputSchema: {
      n: z.number().int().min(1).max(10000).describe("正整数（1-10000）")
    }
  },
  handler: async ({ n }: { n: number }) => {
    const divisors: number[] = [];

    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        divisors.push(i);
        if (i !== n / i) {
          divisors.push(n / i);
        }
      }
    }

    divisors.sort((a, b) => a - b);

    return createSuccessResponse(`${n} 的所有因子：[${divisors.join(', ')}]`);
  }
};

export const numberTheoryTools: ToolRegistration[] = [
  gcdTool,
  lcmTool,
  isPrimeTool,
  primeFactorizationTool,
  eulerPhiTool,
  isPerfectNumberTool,
  divisorCountTool,
  divisorListTool
];