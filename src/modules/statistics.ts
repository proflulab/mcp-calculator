import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 平均值工具
const meanTool: ToolRegistration = {
  name: "mean",
  definition: {
    title: "平均值",
    description: "计算数组的算术平均值",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    if (numbers.length === 0) {
      return createErrorResponse("数组不能为空！");
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / numbers.length;
    return createSuccessResponse(`平均值结果：${mean}`);
  }
};

// 中位数工具
const medianTool: ToolRegistration = {
  name: "median",
  definition: {
    title: "中位数",
    description: "计算数组的中位数",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    if (numbers.length === 0) {
      return createErrorResponse("数组不能为空！");
    }
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
    return createSuccessResponse(`中位数结果：${median}`);
  }
};

// 众数工具
const modeTool: ToolRegistration = {
  name: "mode",
  definition: {
    title: "众数",
    description: "计算数组的众数（出现频率最高的数）",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    if (numbers.length === 0) {
      return createErrorResponse("数组不能为空！");
    }
    const frequency = new Map<number, number>();
    numbers.forEach(num => {
      frequency.set(num, (frequency.get(num) || 0) + 1);
    });

    let maxFreq = 0;
    let modes: number[] = [];
    frequency.forEach((freq, num) => {
      if (freq > maxFreq) {
        maxFreq = freq;
        modes = [num];
      } else if (freq === maxFreq) {
        modes.push(num);
      }
    });

    return createSuccessResponse(`众数结果：${modes.join(', ')} (出现次数：${maxFreq})`);
  }
};

// 标准差工具
const stdDevTool: ToolRegistration = {
  name: "stdDev",
  definition: {
    title: "标准差",
    description: "计算数组的标准差",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组"),
      sample: z.boolean().optional().describe("是否为样本标准差（默认为总体标准差）")
    }
  },
  handler: async ({ numbers, sample = false }: { numbers: number[]; sample?: boolean }) => {
    if (numbers.length === 0) {
      return createErrorResponse("数组不能为空！");
    }
    if (sample && numbers.length === 1) {
      return createErrorResponse("样本标准差需要至少2个数据点！");
    }

    const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
    const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / (sample ? numbers.length - 1 : numbers.length);
    const stdDev = Math.sqrt(variance);

    return createSuccessResponse(`${sample ? '样本' : '总体'}标准差结果：${stdDev}`);
  }
};

// 方差工具
const varianceTool: ToolRegistration = {
  name: "variance",
  definition: {
    title: "方差",
    description: "计算数组的方差",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组"),
      sample: z.boolean().optional().describe("是否为样本方差（默认为总体方差）")
    }
  },
  handler: async ({ numbers, sample = false }: { numbers: number[]; sample?: boolean }) => {
    if (numbers.length === 0) {
      return createErrorResponse("数组不能为空！");
    }
    if (sample && numbers.length === 1) {
      return createErrorResponse("样本方差需要至少2个数据点！");
    }

    const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
    const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / (sample ? numbers.length - 1 : numbers.length);

    return createSuccessResponse(`${sample ? '样本' : '总体'}方差结果：${variance}`);
  }
};

// 最大值工具
const maxTool: ToolRegistration = {
  name: "max",
  definition: {
    title: "最大值",
    description: "找出数组中的最大值",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    if (numbers.length === 0) {
      return createErrorResponse("数组不能为空！");
    }
    const max = Math.max(...numbers);
    return createSuccessResponse(`最大值结果：${max}`);
  }
};

// 最小值工具
const minTool: ToolRegistration = {
  name: "min",
  definition: {
    title: "最小值",
    description: "找出数组中的最小值",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    if (numbers.length === 0) {
      return createErrorResponse("数组不能为空！");
    }
    const min = Math.min(...numbers);
    return createSuccessResponse(`最小值结果：${min}`);
  }
};

// 求和工具
const sumTool: ToolRegistration = {
  name: "sum",
  definition: {
    title: "求和",
    description: "计算数组所有元素的和",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return createSuccessResponse(`求和结果：${sum}`);
  }
};

// 乘积工具
const productTool: ToolRegistration = {
  name: "product",
  definition: {
    title: "乘积",
    description: "计算数组所有元素的乘积",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    if (numbers.length === 0) {
      return createSuccessResponse("乘积结果：1（空数组的乘积为1）");
    }
    const product = numbers.reduce((acc, num) => acc * num, 1);
    return createSuccessResponse(`乘积结果：${product}`);
  }
};

// 范围工具
const rangeTool: ToolRegistration = {
  name: "range",
  definition: {
    title: "范围",
    description: "计算数组的范围（最大值-最小值）",
    inputSchema: {
      numbers: z.array(z.number()).describe("数字数组")
    }
  },
  handler: async ({ numbers }: { numbers: number[] }) => {
    if (numbers.length === 0) {
      return createErrorResponse("数组不能为空！");
    }
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    const range = max - min;
    return createSuccessResponse(`范围结果：${range} (最大值：${max}, 最小值：${min})`);
  }
};

export const statisticsTools: ToolRegistration[] = [
  meanTool,
  medianTool,
  modeTool,
  stdDevTool,
  varianceTool,
  maxTool,
  minTool,
  sumTool,
  productTool,
  rangeTool
];