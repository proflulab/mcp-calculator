import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 数值积分工具（梯形法则）
const numericalIntegrationTool: ToolRegistration = {
  name: "numerical_integration",
  definition: {
    title: "数值积分",
    description: "使用梯形法则计算函数的定积分",
    inputSchema: {
      function_type: z.enum(["polynomial", "exponential", "trigonometric", "logarithmic"]).describe("函数类型"),
      coefficients: z.array(z.number()).describe("函数系数或参数"),
      lower_bound: z.number().describe("积分下限"),
      upper_bound: z.number().describe("积分上限"),
      intervals: z.number().int().min(1).max(10000).default(1000).describe("分割区间数")
    }
  },
  handler: async ({ function_type, coefficients, lower_bound, upper_bound, intervals }:
    { function_type: string; coefficients: number[]; lower_bound: number; upper_bound: number; intervals: number }) => {

    if (lower_bound >= upper_bound) {
      return createErrorResponse("积分下限必须小于上限！");
    }

    const evaluateFunction = (x: number): number => {
      switch (function_type) {
        case "polynomial":
          // 多项式：a₀ + a₁x + a₂x² + ...
          return coefficients.reduce((sum, coeff, i) => sum + coeff * Math.pow(x, i), 0);
        case "exponential":
          // 指数函数：a * e^(bx)
          return coefficients[0] * Math.exp(coefficients[1] * x);
        case "trigonometric":
          // 三角函数：a * sin(bx) + c * cos(dx)
          return coefficients[0] * Math.sin(coefficients[1] * x) +
            (coefficients[2] || 0) * Math.cos((coefficients[3] || 1) * x);
        case "logarithmic":
          // 对数函数：a * ln(bx + c)
          const arg = coefficients[1] * x + (coefficients[2] || 0);
          if (arg <= 0) return NaN;
          return coefficients[0] * Math.log(arg);
        default:
          return 0;
      }
    };

    const h = (upper_bound - lower_bound) / intervals;
    let sum = 0;

    // 梯形法则
    for (let i = 0; i <= intervals; i++) {
      const x = lower_bound + i * h;
      const y = evaluateFunction(x);

      if (isNaN(y) || !isFinite(y)) {
        return createErrorResponse(`函数在 x = ${x} 处未定义或无穷大！`);
      }

      if (i === 0 || i === intervals) {
        sum += y;
      } else {
        sum += 2 * y;
      }
    }

    const result = (h / 2) * sum;

    return createSuccessResponse(`数值积分结果：∫[${lower_bound}, ${upper_bound}] f(x)dx ≈ ${result}\n使用梯形法则，分割区间数：${intervals}`);
  }
};

// 数值微分工具
const numericalDerivativeTool: ToolRegistration = {
  name: "numerical_derivative",
  definition: {
    title: "数值微分",
    description: "使用中心差分法计算函数在某点的导数",
    inputSchema: {
      function_type: z.enum(["polynomial", "exponential", "trigonometric", "logarithmic"]).describe("函数类型"),
      coefficients: z.array(z.number()).describe("函数系数或参数"),
      point: z.number().describe("求导点"),
      step_size: z.number().positive().default(0.0001).describe("步长")
    }
  },
  handler: async ({ function_type, coefficients, point, step_size }:
    { function_type: string; coefficients: number[]; point: number; step_size: number }) => {

    const evaluateFunction = (x: number): number => {
      switch (function_type) {
        case "polynomial":
          return coefficients.reduce((sum, coeff, i) => sum + coeff * Math.pow(x, i), 0);
        case "exponential":
          return coefficients[0] * Math.exp(coefficients[1] * x);
        case "trigonometric":
          return coefficients[0] * Math.sin(coefficients[1] * x) +
            (coefficients[2] || 0) * Math.cos((coefficients[3] || 1) * x);
        case "logarithmic":
          const arg = coefficients[1] * x + (coefficients[2] || 0);
          if (arg <= 0) return NaN;
          return coefficients[0] * Math.log(arg);
        default:
          return 0;
      }
    };

    const f_plus = evaluateFunction(point + step_size);
    const f_minus = evaluateFunction(point - step_size);

    if (isNaN(f_plus) || isNaN(f_minus) || !isFinite(f_plus) || !isFinite(f_minus)) {
      return createErrorResponse(`函数在 x = ${point} 附近未定义！`);
    }

    const derivative = (f_plus - f_minus) / (2 * step_size);

    return createSuccessResponse(`数值微分结果：f'(${point}) ≈ ${derivative}\n使用中心差分法，步长：${step_size}`);
  }
};

// 牛顿法求根工具
const newtonMethodTool: ToolRegistration = {
  name: "newton_method",
  definition: {
    title: "牛顿法求根",
    description: "使用牛顿法求解方程的根",
    inputSchema: {
      function_type: z.enum(["polynomial", "exponential", "trigonometric", "logarithmic"]).describe("函数类型"),
      coefficients: z.array(z.number()).describe("函数系数或参数"),
      initial_guess: z.number().describe("初始猜测值"),
      tolerance: z.number().positive().default(0.000001).describe("容差"),
      max_iterations: z.number().int().positive().default(100).describe("最大迭代次数")
    }
  },
  handler: async ({ function_type, coefficients, initial_guess, tolerance, max_iterations }:
    { function_type: string; coefficients: number[]; initial_guess: number; tolerance: number; max_iterations: number }) => {

    const evaluateFunction = (x: number): number => {
      switch (function_type) {
        case "polynomial":
          return coefficients.reduce((sum, coeff, i) => sum + coeff * Math.pow(x, i), 0);
        case "exponential":
          return coefficients[0] * Math.exp(coefficients[1] * x);
        case "trigonometric":
          return coefficients[0] * Math.sin(coefficients[1] * x) +
            (coefficients[2] || 0) * Math.cos((coefficients[3] || 1) * x);
        case "logarithmic":
          const arg = coefficients[1] * x + (coefficients[2] || 0);
          if (arg <= 0) return NaN;
          return coefficients[0] * Math.log(arg);
        default:
          return 0;
      }
    };

    const evaluateDerivative = (x: number): number => {
      const h = 0.0001;
      const f_plus = evaluateFunction(x + h);
      const f_minus = evaluateFunction(x - h);
      return (f_plus - f_minus) / (2 * h);
    };

    let x = initial_guess;
    let iterations = 0;

    for (let i = 0; i < max_iterations; i++) {
      const fx = evaluateFunction(x);
      const fpx = evaluateDerivative(x);

      if (isNaN(fx) || isNaN(fpx) || !isFinite(fx) || !isFinite(fpx)) {
        return createErrorResponse(`函数在 x = ${x} 处未定义！`);
      }

      if (Math.abs(fpx) < 1e-15) {
        return createErrorResponse(`导数在 x = ${x} 处接近零，无法继续迭代！`);
      }

      const x_new = x - fx / fpx;
      iterations = i + 1;

      if (Math.abs(x_new - x) < tolerance) {
        return createSuccessResponse(`牛顿法求根结果：x ≈ ${x_new}\n迭代次数：${iterations}\nf(${x_new}) ≈ ${evaluateFunction(x_new)}`);
      }

      x = x_new;
    }

    return createErrorResponse(`牛顿法在 ${max_iterations} 次迭代后未收敛！最后结果：x ≈ ${x}`);
  }
};

// 二分法求根工具
const bisectionMethodTool: ToolRegistration = {
  name: "bisection_method",
  definition: {
    title: "二分法求根",
    description: "使用二分法求解方程在区间内的根",
    inputSchema: {
      function_type: z.enum(["polynomial", "exponential", "trigonometric", "logarithmic"]).describe("函数类型"),
      coefficients: z.array(z.number()).describe("函数系数或参数"),
      left_bound: z.number().describe("区间左端点"),
      right_bound: z.number().describe("区间右端点"),
      tolerance: z.number().positive().default(0.000001).describe("容差"),
      max_iterations: z.number().int().positive().default(100).describe("最大迭代次数")
    }
  },
  handler: async ({ function_type, coefficients, left_bound, right_bound, tolerance, max_iterations }:
    { function_type: string; coefficients: number[]; left_bound: number; right_bound: number; tolerance: number; max_iterations: number }) => {

    if (left_bound >= right_bound) {
      return createErrorResponse("左端点必须小于右端点！");
    }

    const evaluateFunction = (x: number): number => {
      switch (function_type) {
        case "polynomial":
          return coefficients.reduce((sum, coeff, i) => sum + coeff * Math.pow(x, i), 0);
        case "exponential":
          return coefficients[0] * Math.exp(coefficients[1] * x);
        case "trigonometric":
          return coefficients[0] * Math.sin(coefficients[1] * x) +
            (coefficients[2] || 0) * Math.cos((coefficients[3] || 1) * x);
        case "logarithmic":
          const arg = coefficients[1] * x + (coefficients[2] || 0);
          if (arg <= 0) return NaN;
          return coefficients[0] * Math.log(arg);
        default:
          return 0;
      }
    };

    const f_left = evaluateFunction(left_bound);
    const f_right = evaluateFunction(right_bound);

    if (isNaN(f_left) || isNaN(f_right)) {
      return createErrorResponse("函数在区间端点处未定义！");
    }

    if (f_left * f_right > 0) {
      return createErrorResponse("函数在区间端点处同号，可能不存在根！");
    }

    let a = left_bound;
    let b = right_bound;
    let iterations = 0;

    for (let i = 0; i < max_iterations; i++) {
      const c = (a + b) / 2;
      const fc = evaluateFunction(c);

      if (isNaN(fc)) {
        return createErrorResponse(`函数在 x = ${c} 处未定义！`);
      }

      iterations = i + 1;

      if (Math.abs(fc) < tolerance || (b - a) / 2 < tolerance) {
        return createSuccessResponse(`二分法求根结果：x ≈ ${c}\n迭代次数：${iterations}\nf(${c}) ≈ ${fc}`);
      }

      const fa = evaluateFunction(a);
      if (fa * fc < 0) {
        b = c;
      } else {
        a = c;
      }
    }

    const final_root = (a + b) / 2;
    return createErrorResponse(`二分法在 ${max_iterations} 次迭代后未收敛！最后结果：x ≈ ${final_root}`);
  }
};

// 插值工具（拉格朗日插值）
const lagrangeInterpolationTool: ToolRegistration = {
  name: "lagrange_interpolation",
  definition: {
    title: "拉格朗日插值",
    description: "使用拉格朗日插值法计算插值点的函数值",
    inputSchema: {
      x_points: z.array(z.number()).describe("已知点的x坐标"),
      y_points: z.array(z.number()).describe("已知点的y坐标"),
      interpolation_point: z.number().describe("插值点的x坐标")
    }
  },
  handler: async ({ x_points, y_points, interpolation_point }:
    { x_points: number[]; y_points: number[]; interpolation_point: number }) => {

    if (x_points.length !== y_points.length) {
      return createErrorResponse("x坐标和y坐标的数量必须相等！");
    }

    if (x_points.length < 2) {
      return createErrorResponse("至少需要2个数据点进行插值！");
    }

    // 检查x坐标是否有重复
    const uniqueX = new Set(x_points);
    if (uniqueX.size !== x_points.length) {
      return createErrorResponse("x坐标不能有重复值！");
    }

    let result = 0;

    for (let i = 0; i < x_points.length; i++) {
      let term = y_points[i];

      for (let j = 0; j < x_points.length; j++) {
        if (i !== j) {
          term *= (interpolation_point - x_points[j]) / (x_points[i] - x_points[j]);
        }
      }

      result += term;
    }

    return createSuccessResponse(`拉格朗日插值结果：f(${interpolation_point}) ≈ ${result}\n使用 ${x_points.length} 个数据点进行插值`);
  }
};

export const numericalTools: ToolRegistration[] = [
  numericalIntegrationTool,
  numericalDerivativeTool,
  newtonMethodTool,
  bisectionMethodTool,
  lagrangeInterpolationTool
];