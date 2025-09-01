import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 正弦函数工具
const sinTool: ToolRegistration = {
  name: "sin",
  definition: {
    title: "正弦函数",
    description: "计算角度的正弦值（输入为弧度）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  handler: async ({ angle }: { angle: number }) => {
    return createSuccessResponse(`正弦函数结果：sin(${angle}) = ${Math.sin(angle)}`);
  }
};

// 余弦函数工具
const cosTool: ToolRegistration = {
  name: "cos",
  definition: {
    title: "余弦函数",
    description: "计算角度的余弦值（输入为弧度）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  handler: async ({ angle }: { angle: number }) => {
    return createSuccessResponse(`余弦函数结果：cos(${angle}) = ${Math.cos(angle)}`);
  }
};

// 正切函数工具
const tanTool: ToolRegistration = {
  name: "tan",
  definition: {
    title: "正切函数",
    description: "计算角度的正切值（输入为弧度）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  handler: async ({ angle }: { angle: number }) => {
    return createSuccessResponse(`正切函数结果：tan(${angle}) = ${Math.tan(angle)}`);
  }
};

// 反正弦函数工具
const asinTool: ToolRegistration = {
  name: "asin",
  definition: {
    title: "反正弦函数",
    description: "计算反正弦值（返回弧度）",
    inputSchema: {
      value: z.number().describe("输入值（-1到1之间）")
    }
  },
  handler: async ({ value }: { value: number }) => {
    if (value < -1 || value > 1) {
      return createErrorResponse("反正弦函数的输入值必须在-1到1之间！");
    }
    return createSuccessResponse(`反正弦函数结果：asin(${value}) = ${Math.asin(value)} 弧度`);
  }
};

// 反余弦函数工具
const acosTool: ToolRegistration = {
  name: "acos",
  definition: {
    title: "反余弦函数",
    description: "计算反余弦值（返回弧度）",
    inputSchema: {
      value: z.number().describe("输入值（-1到1之间）")
    }
  },
  handler: async ({ value }: { value: number }) => {
    if (value < -1 || value > 1) {
      return createErrorResponse("反余弦函数的输入值必须在-1到1之间！");
    }
    return createSuccessResponse(`反余弦函数结果：acos(${value}) = ${Math.acos(value)} 弧度`);
  }
};

// 反正切函数工具
const atanTool: ToolRegistration = {
  name: "atan",
  definition: {
    title: "反正切函数",
    description: "计算反正切值（返回弧度）",
    inputSchema: {
      value: z.number().describe("输入值")
    }
  },
  handler: async ({ value }: { value: number }) => {
    return createSuccessResponse(`反正切函数结果：atan(${value}) = ${Math.atan(value)} 弧度`);
  }
};

// 双参数反正切函数工具
const atan2Tool: ToolRegistration = {
  name: "atan2",
  definition: {
    title: "双参数反正切函数",
    description: "计算从x轴到点(x,y)的角度（返回弧度）",
    inputSchema: {
      y: z.number().describe("y坐标"),
      x: z.number().describe("x坐标")
    }
  },
  handler: async ({ y, x }: { y: number; x: number }) => {
    return createSuccessResponse(`双参数反正切函数结果：atan2(${y}, ${x}) = ${Math.atan2(y, x)} 弧度`);
  }
};

// 双曲正弦函数工具
const sinhTool: ToolRegistration = {
  name: "sinh",
  definition: {
    title: "双曲正弦函数",
    description: "计算双曲正弦值",
    inputSchema: {
      value: z.number().describe("输入值")
    }
  },
  handler: async ({ value }: { value: number }) => {
    return createSuccessResponse(`双曲正弦函数结果：sinh(${value}) = ${Math.sinh(value)}`);
  }
};

// 双曲余弦函数工具
const coshTool: ToolRegistration = {
  name: "cosh",
  definition: {
    title: "双曲余弦函数",
    description: "计算双曲余弦值",
    inputSchema: {
      value: z.number().describe("输入值")
    }
  },
  handler: async ({ value }: { value: number }) => {
    return createSuccessResponse(`双曲余弦函数结果：cosh(${value}) = ${Math.cosh(value)}`);
  }
};

// 双曲正切函数工具
const tanhTool: ToolRegistration = {
  name: "tanh",
  definition: {
    title: "双曲正切函数",
    description: "计算双曲正切值",
    inputSchema: {
      value: z.number().describe("输入值")
    }
  },
  handler: async ({ value }: { value: number }) => {
    return createSuccessResponse(`双曲正切函数结果：tanh(${value}) = ${Math.tanh(value)}`);
  }
};

// 反双曲正弦函数工具
const asinhTool: ToolRegistration = {
  name: "asinh",
  definition: {
    title: "反双曲正弦函数",
    description: "计算反双曲正弦值",
    inputSchema: {
      value: z.number().describe("输入值")
    }
  },
  handler: async ({ value }: { value: number }) => {
    return createSuccessResponse(`反双曲正弦函数结果：asinh(${value}) = ${Math.asinh(value)}`);
  }
};

// 反双曲余弦函数工具
const acoshTool: ToolRegistration = {
  name: "acosh",
  definition: {
    title: "反双曲余弦函数",
    description: "计算反双曲余弦值（输入值必须≥1）",
    inputSchema: {
      value: z.number().describe("输入值（≥1）")
    }
  },
  handler: async ({ value }: { value: number }) => {
    if (value < 1) {
      return createErrorResponse("反双曲余弦函数的输入值必须大于等于1！");
    }
    return createSuccessResponse(`反双曲余弦函数结果：acosh(${value}) = ${Math.acosh(value)}`);
  }
};

// 反双曲正切函数工具
const atanhTool: ToolRegistration = {
  name: "atanh",
  definition: {
    title: "反双曲正切函数",
    description: "计算反双曲正切值（输入值必须在-1到1之间）",
    inputSchema: {
      value: z.number().describe("输入值（-1到1之间）")
    }
  },
  handler: async ({ value }: { value: number }) => {
    if (value <= -1 || value >= 1) {
      return createErrorResponse("反双曲正切函数的输入值必须在-1到1之间（不包括-1和1）！");
    }
    return createSuccessResponse(`反双曲正切函数结果：atanh(${value}) = ${Math.atanh(value)}`);
  }
};

// 正割函数工具
const secTool: ToolRegistration = {
  name: "sec",
  definition: {
    title: "正割函数",
    description: "计算正割值（1/cos）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  handler: async ({ angle }: { angle: number }) => {
    const cosValue = Math.cos(angle);
    if (Math.abs(cosValue) < 1e-15) {
      return createErrorResponse("正割函数在此角度处未定义（cos值为0）！");
    }
    const secValue = 1 / cosValue;
    return createSuccessResponse(`正割函数结果：sec(${angle}) = ${secValue}`);
  }
};

// 余割函数工具
const cscTool: ToolRegistration = {
  name: "csc",
  definition: {
    title: "余割函数",
    description: "计算余割值（1/sin）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  handler: async ({ angle }: { angle: number }) => {
    const sinValue = Math.sin(angle);
    if (Math.abs(sinValue) < 1e-15) {
      return createErrorResponse("余割函数在此角度处未定义（sin值为0）！");
    }
    const cscValue = 1 / sinValue;
    return createSuccessResponse(`余割函数结果：csc(${angle}) = ${cscValue}`);
  }
};

// 余切函数工具
const cotTool: ToolRegistration = {
  name: "cot",
  definition: {
    title: "余切函数",
    description: "计算余切值（1/tan）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  handler: async ({ angle }: { angle: number }) => {
    const tanValue = Math.tan(angle);
    if (Math.abs(tanValue) < 1e-15) {
      return createErrorResponse("余切函数在此角度处未定义（tan值为0）！");
    }
    const cotValue = 1 / tanValue;
    return createSuccessResponse(`余切函数结果：cot(${angle}) = ${cotValue}`);
  }
};

// 角度转弧度工具
const degToRadTool: ToolRegistration = {
  name: "degToRad",
  definition: {
    title: "角度转弧度",
    description: "将角度转换为弧度",
    inputSchema: {
      degrees: z.number().describe("角度值")
    }
  },
  handler: async ({ degrees }: { degrees: number }) => {
    const radians = degrees * (Math.PI / 180);
    return createSuccessResponse(`角度转弧度结果：${degrees}° = ${radians} 弧度`);
  }
};

// 弧度转角度工具
const radToDegTool: ToolRegistration = {
  name: "radToDeg",
  definition: {
    title: "弧度转角度",
    description: "将弧度转换为角度",
    inputSchema: {
      radians: z.number().describe("弧度值")
    }
  },
  handler: async ({ radians }: { radians: number }) => {
    const degrees = radians * (180 / Math.PI);
    return createSuccessResponse(`弧度转角度结果：${radians} 弧度 = ${degrees}°`);
  }
};

// 导出所有三角函数工具
export const trigonometryTools: ToolRegistration[] = [
  sinTool,
  cosTool,
  tanTool,
  asinTool,
  acosTool,
  atanTool,
  atan2Tool,
  sinhTool,
  coshTool,
  tanhTool,
  asinhTool,
  acoshTool,
  atanhTool,
  secTool,
  cscTool,
  cotTool,
  degToRadTool,
  radToDegTool
];