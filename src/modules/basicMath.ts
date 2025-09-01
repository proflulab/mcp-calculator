import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 加法工具
const addTool: ToolRegistration = {
  name: "add",
  definition: {
    title: "加法运算",
    description: "执行两个数字的加法运算",
    inputSchema: {
      a: z.number().describe("第一个数字"),
      b: z.number().describe("第二个数字")
    }
  },
  handler: async ({ a, b }: { a: number; b: number }) => {
    return createSuccessResponse(`加法运算结果：${a} + ${b} = ${a + b}`);
  }
};

// 减法工具
const subtractTool: ToolRegistration = {
  name: "subtract",
  definition: {
    title: "减法运算",
    description: "执行两个数字的减法运算",
    inputSchema: {
      a: z.number().describe("被减数"),
      b: z.number().describe("减数")
    }
  },
  handler: async ({ a, b }: { a: number; b: number }) => {
    return createSuccessResponse(`减法运算结果：${a} - ${b} = ${a - b}`);
  }
};

// 乘法工具
const multiplyTool: ToolRegistration = {
  name: "multiply",
  definition: {
    title: "乘法运算",
    description: "执行两个数字的乘法运算",
    inputSchema: {
      a: z.number().describe("第一个数字"),
      b: z.number().describe("第二个数字")
    }
  },
  handler: async ({ a, b }: { a: number; b: number }) => {
    return createSuccessResponse(`乘法运算结果：${a} × ${b} = ${a * b}`);
  }
};

// 除法工具
const divideTool: ToolRegistration = {
  name: "divide",
  definition: {
    title: "除法运算",
    description: "执行两个数字的除法运算",
    inputSchema: {
      a: z.number().describe("被除数"),
      b: z.number().describe("除数")
    }
  },
  handler: async ({ a, b }: { a: number; b: number }) => {
    if (b === 0) {
      return createErrorResponse("除数不能为零！");
    }
    return createSuccessResponse(`除法运算结果：${a} ÷ ${b} = ${a / b}`);
  }
};

// 求余工具
const moduloTool: ToolRegistration = {
  name: "modulo",
  definition: {
    title: "求余运算",
    description: "计算两个数的余数",
    inputSchema: {
      a: z.number().describe("被除数"),
      b: z.number().describe("除数")
    }
  },
  handler: async ({ a, b }: { a: number; b: number }) => {
    if (b === 0) {
      return createErrorResponse("除数不能为零！");
    }
    return createSuccessResponse(`求余运算结果：${a} % ${b} = ${a % b}`);
  }
};

// 幂运算工具
const powerTool: ToolRegistration = {
  name: "power",
  definition: {
    title: "幂运算",
    description: "计算a的b次方",
    inputSchema: {
      a: z.number().describe("底数"),
      b: z.number().describe("指数")
    }
  },
  handler: async ({ a, b }: { a: number; b: number }) => {
    return createSuccessResponse(`幂运算结果：${a}^${b} = ${Math.pow(a, b)}`);
  }
};

// 导出所有基础数学运算工具
export const basicMathTools: ToolRegistration[] = [
  addTool,
  subtractTool,
  multiplyTool,
  divideTool,
  moduloTool,
  powerTool
];