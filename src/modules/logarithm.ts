import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 自然对数工具
const lnTool: ToolRegistration = {
  name: "ln",
  definition: {
    title: "自然对数",
    description: "计算自然对数（以e为底）",
    inputSchema: {
      value: z.number().describe("输入值（必须大于0）")
    }
  },
  handler: async ({ value }: { value: number }) => {
    if (value <= 0) {
      return createErrorResponse("对数函数的输入值必须大于0！");
    }
    return createSuccessResponse(`自然对数结果：ln(${value}) = ${Math.log(value)}`);
  }
};

// 常用对数工具
const log10Tool: ToolRegistration = {
  name: "log10",
  definition: {
    title: "常用对数",
    description: "计算以10为底的对数",
    inputSchema: {
      value: z.number().describe("输入值（必须大于0）")
    }
  },
  handler: async ({ value }: { value: number }) => {
    if (value <= 0) {
      return createErrorResponse("对数函数的输入值必须大于0！");
    }
    return createSuccessResponse(`常用对数结果：log10(${value}) = ${Math.log10(value)}`);
  }
};

// 任意底数对数工具
const logTool: ToolRegistration = {
  name: "log",
  definition: {
    title: "任意底数对数",
    description: "计算以指定底数的对数",
    inputSchema: {
      value: z.number().describe("输入值（必须大于0）"),
      base: z.number().describe("底数（必须大于0且不等于1）")
    }
  },
  handler: async ({ value, base }: { value: number; base: number }) => {
    if (value <= 0) {
      return createErrorResponse("对数函数的输入值必须大于0！");
    }
    if (base <= 0 || base === 1) {
      return createErrorResponse("对数函数的底数必须大于0且不等于1！");
    }
    const result = Math.log(value) / Math.log(base);
    return createSuccessResponse(`任意底数对数结果：log${base}(${value}) = ${result}`);
  }
};

// 导出所有对数函数工具
export const logarithmTools: ToolRegistration[] = [
  lnTool,
  log10Tool,
  logTool
];