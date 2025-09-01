import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 复数加法工具
const complexAddTool: ToolRegistration = {
  name: "complex_add",
  definition: {
    title: "复数加法",
    description: "计算两个复数的和",
    inputSchema: {
      a_real: z.number().describe("第一个复数的实部"),
      a_imag: z.number().describe("第一个复数的虚部"),
      b_real: z.number().describe("第二个复数的实部"),
      b_imag: z.number().describe("第二个复数的虚部")
    }
  },
  handler: async ({ a_real, a_imag, b_real, b_imag }: { a_real: number; a_imag: number; b_real: number; b_imag: number }) => {
    const real = a_real + b_real;
    const imag = a_imag + b_imag;

    const formatComplex = (r: number, i: number) => {
      if (i === 0) return r.toString();
      if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
      const imagPart = i === 1 ? "i" : i === -1 ? "i" : `${Math.abs(i)}i`;
      return i >= 0 ? `${r} + ${imagPart}` : `${r} - ${imagPart}`;
    };

    return createSuccessResponse(`复数加法结果：(${formatComplex(a_real, a_imag)}) + (${formatComplex(b_real, b_imag)}) = ${formatComplex(real, imag)}`);
  }
};

// 复数减法工具
const complexSubtractTool: ToolRegistration = {
  name: "complex_subtract",
  definition: {
    title: "复数减法",
    description: "计算两个复数的差",
    inputSchema: {
      a_real: z.number().describe("第一个复数的实部"),
      a_imag: z.number().describe("第一个复数的虚部"),
      b_real: z.number().describe("第二个复数的实部"),
      b_imag: z.number().describe("第二个复数的虚部")
    }
  },
  handler: async ({ a_real, a_imag, b_real, b_imag }: { a_real: number; a_imag: number; b_real: number; b_imag: number }) => {
    const real = a_real - b_real;
    const imag = a_imag - b_imag;

    const formatComplex = (r: number, i: number) => {
      if (i === 0) return r.toString();
      if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
      const imagPart = i === 1 ? "i" : i === -1 ? "i" : `${Math.abs(i)}i`;
      return i >= 0 ? `${r} + ${imagPart}` : `${r} - ${imagPart}`;
    };

    return createSuccessResponse(`复数减法结果：(${formatComplex(a_real, a_imag)}) - (${formatComplex(b_real, b_imag)}) = ${formatComplex(real, imag)}`);
  }
};

// 复数乘法工具
const complexMultiplyTool: ToolRegistration = {
  name: "complex_multiply",
  definition: {
    title: "复数乘法",
    description: "计算两个复数的乘积",
    inputSchema: {
      a_real: z.number().describe("第一个复数的实部"),
      a_imag: z.number().describe("第一个复数的虚部"),
      b_real: z.number().describe("第二个复数的实部"),
      b_imag: z.number().describe("第二个复数的虚部")
    }
  },
  handler: async ({ a_real, a_imag, b_real, b_imag }: { a_real: number; a_imag: number; b_real: number; b_imag: number }) => {
    // (a + bi)(c + di) = (ac - bd) + (ad + bc)i
    const real = a_real * b_real - a_imag * b_imag;
    const imag = a_real * b_imag + a_imag * b_real;

    const formatComplex = (r: number, i: number) => {
      if (i === 0) return r.toString();
      if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
      const imagPart = i === 1 ? "i" : i === -1 ? "i" : `${Math.abs(i)}i`;
      return i >= 0 ? `${r} + ${imagPart}` : `${r} - ${imagPart}`;
    };

    return createSuccessResponse(`复数乘法结果：(${formatComplex(a_real, a_imag)}) × (${formatComplex(b_real, b_imag)}) = ${formatComplex(real, imag)}`);
  }
};

// 复数除法工具
const complexDivideTool: ToolRegistration = {
  name: "complex_divide",
  definition: {
    title: "复数除法",
    description: "计算两个复数的商",
    inputSchema: {
      a_real: z.number().describe("被除数的实部"),
      a_imag: z.number().describe("被除数的虚部"),
      b_real: z.number().describe("除数的实部"),
      b_imag: z.number().describe("除数的虚部")
    }
  },
  handler: async ({ a_real, a_imag, b_real, b_imag }: { a_real: number; a_imag: number; b_real: number; b_imag: number }) => {
    if (b_real === 0 && b_imag === 0) {
      return createErrorResponse("除数不能为零！");
    }

    // (a + bi) / (c + di) = [(a + bi)(c - di)] / (c² + d²)
    const denominator = b_real * b_real + b_imag * b_imag;
    const real = (a_real * b_real + a_imag * b_imag) / denominator;
    const imag = (a_imag * b_real - a_real * b_imag) / denominator;

    const formatComplex = (r: number, i: number) => {
      if (i === 0) return r.toString();
      if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
      const imagPart = i === 1 ? "i" : i === -1 ? "i" : `${Math.abs(i)}i`;
      return i >= 0 ? `${r} + ${imagPart}` : `${r} - ${imagPart}`;
    };

    return createSuccessResponse(`复数除法结果：(${formatComplex(a_real, a_imag)}) ÷ (${formatComplex(b_real, b_imag)}) = ${formatComplex(real, imag)}`);
  }
};

// 复数模长工具
const complexMagnitudeTool: ToolRegistration = {
  name: "complex_magnitude",
  definition: {
    title: "复数模长",
    description: "计算复数的模长（绝对值）",
    inputSchema: {
      real: z.number().describe("复数的实部"),
      imag: z.number().describe("复数的虚部")
    }
  },
  handler: async ({ real, imag }: { real: number; imag: number }) => {
    const magnitude = Math.sqrt(real * real + imag * imag);

    const formatComplex = (r: number, i: number) => {
      if (i === 0) return r.toString();
      if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
      const imagPart = i === 1 ? "i" : i === -1 ? "i" : `${Math.abs(i)}i`;
      return i >= 0 ? `${r} + ${imagPart}` : `${r} - ${imagPart}`;
    };

    return createSuccessResponse(`复数模长：|${formatComplex(real, imag)}| = ${magnitude}`);
  }
};

// 复数共轭工具
const complexConjugateTool: ToolRegistration = {
  name: "complex_conjugate",
  definition: {
    title: "复数共轭",
    description: "计算复数的共轭",
    inputSchema: {
      real: z.number().describe("复数的实部"),
      imag: z.number().describe("复数的虚部")
    }
  },
  handler: async ({ real, imag }: { real: number; imag: number }) => {
    const conjugateImag = -imag;

    const formatComplex = (r: number, i: number) => {
      if (i === 0) return r.toString();
      if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
      const imagPart = i === 1 ? "i" : i === -1 ? "i" : `${Math.abs(i)}i`;
      return i >= 0 ? `${r} + ${imagPart}` : `${r} - ${imagPart}`;
    };

    return createSuccessResponse(`复数共轭：(${formatComplex(real, imag)})* = ${formatComplex(real, conjugateImag)}`);
  }
};

// 复数幅角工具
const complexArgumentTool: ToolRegistration = {
  name: "complex_argument",
  definition: {
    title: "复数幅角",
    description: "计算复数的幅角（以弧度为单位）",
    inputSchema: {
      real: z.number().describe("复数的实部"),
      imag: z.number().describe("复数的虚部")
    }
  },
  handler: async ({ real, imag }: { real: number; imag: number }) => {
    if (real === 0 && imag === 0) {
      return createErrorResponse("零复数的幅角未定义！");
    }

    const argument = Math.atan2(imag, real);
    const argumentDegrees = argument * 180 / Math.PI;

    const formatComplex = (r: number, i: number) => {
      if (i === 0) return r.toString();
      if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
      const imagPart = i === 1 ? "i" : i === -1 ? "i" : `${Math.abs(i)}i`;
      return i >= 0 ? `${r} + ${imagPart}` : `${r} - ${imagPart}`;
    };

    return createSuccessResponse(`复数幅角：arg(${formatComplex(real, imag)}) = ${argument} 弧度 = ${argumentDegrees}°`);
  }
};

// 复数极坐标形式工具
const complexPolarTool: ToolRegistration = {
  name: "complex_polar",
  definition: {
    title: "复数极坐标形式",
    description: "将复数转换为极坐标形式 r∠θ",
    inputSchema: {
      real: z.number().describe("复数的实部"),
      imag: z.number().describe("复数的虚部")
    }
  },
  handler: async ({ real, imag }: { real: number; imag: number }) => {
    if (real === 0 && imag === 0) {
      return createSuccessResponse(`复数极坐标形式：0 + 0i = 0∠0°`);
    }

    const magnitude = Math.sqrt(real * real + imag * imag);
    const argument = Math.atan2(imag, real);
    const argumentDegrees = argument * 180 / Math.PI;

    const formatComplex = (r: number, i: number) => {
      if (i === 0) return r.toString();
      if (r === 0) return i === 1 ? "i" : i === -1 ? "-i" : `${i}i`;
      const imagPart = i === 1 ? "i" : i === -1 ? "i" : `${Math.abs(i)}i`;
      return i >= 0 ? `${r} + ${imagPart}` : `${r} - ${imagPart}`;
    };

    return createSuccessResponse(`复数极坐标形式：${formatComplex(real, imag)} = ${magnitude}∠${argumentDegrees}° = ${magnitude}∠${argument} 弧度`);
  }
};

export const complexTools: ToolRegistration[] = [
  complexAddTool,
  complexSubtractTool,
  complexMultiplyTool,
  complexDivideTool,
  complexMagnitudeTool,
  complexConjugateTool,
  complexArgumentTool,
  complexPolarTool
];