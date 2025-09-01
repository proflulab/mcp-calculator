import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 平方根工具
const sqrtTool: ToolRegistration = {
  name: "sqrt",
  definition: {
    title: "平方根",
    description: "计算数字的平方根",
    inputSchema: {
      a: z.number().describe("被开方数")
    }
  },
  handler: async ({ a }: { a: number }) => {
    if (a < 0) {
      return createErrorResponse("负数不能开平方根！");
    }
    return createSuccessResponse(`平方根结果：√${a} = ${Math.sqrt(a)}`);
  }
};

// 立方根工具
const cbrtTool: ToolRegistration = {
  name: "cbrt",
  definition: {
    title: "立方根",
    description: "计算数字的立方根",
    inputSchema: {
      a: z.number().describe("被开方数")
    }
  },
  handler: async ({ a }: { a: number }) => {
    return createSuccessResponse(`立方根结果：∛${a} = ${Math.cbrt(a)}`);
  }
};

// n次方根工具
const nthRootTool: ToolRegistration = {
  name: "nthRoot",
  definition: {
    title: "开多次方",
    description: "计算数字的n次方根",
    inputSchema: {
      a: z.number().describe("被开方数"),
      n: z.number().describe("开方次数")
    }
  },
  handler: async ({ a, n }: { a: number; n: number }) => {
    if (n === 0) {
      return createErrorResponse("开方次数不能为零！");
    }
    if (a < 0 && n % 2 === 0) {
      return createErrorResponse("负数不能开偶次方根！");
    }

    // 处理负数的奇次方根
    let result;
    if (a < 0 && n % 2 === 1) {
      // 负数的奇次方根 = -(|a|^(1/n))
      result = -Math.pow(-a, 1 / n);
    } else {
      result = Math.pow(a, 1 / n);
    }

    return createSuccessResponse(`${n}次方根结果：${n}√${a} = ${result}`);
  }
};

// 绝对值工具
const absTool: ToolRegistration = {
  name: "abs",
  definition: {
    title: "绝对值",
    description: "计算数字的绝对值",
    inputSchema: {
      a: z.number().describe("数字")
    }
  },
  handler: async ({ a }: { a: number }) => {
    return createSuccessResponse(`绝对值结果：|${a}| = ${Math.abs(a)}`);
  }
};

// 导出所有根运算工具
export const rootOperationTools: ToolRegistration[] = [
  sqrtTool,
  cbrtTool,
  nthRootTool,
  absTool
];