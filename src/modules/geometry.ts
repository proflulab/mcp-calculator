import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 圆形计算工具
const circleCalculationTool: ToolRegistration = {
  name: "circle_calculation",
  definition: {
    title: "圆形计算",
    description: "计算圆的面积、周长等属性",
    inputSchema: {
      radius: z.number().positive().describe("半径")
    }
  },
  handler: async ({ radius }: { radius: number }) => {
    const area = Math.PI * radius * radius;
    const circumference = 2 * Math.PI * radius;
    const diameter = 2 * radius;

    return createSuccessResponse(
      `圆形计算结果：\n` +
      `半径：${radius}\n` +
      `直径：${diameter}\n` +
      `周长：${circumference.toFixed(6)}\n` +
      `面积：${area.toFixed(6)}\n` +
      `π ≈ ${Math.PI.toFixed(6)}`
    );
  }
};

// 矩形计算工具
const rectangleCalculationTool: ToolRegistration = {
  name: "rectangle_calculation",
  definition: {
    title: "矩形计算",
    description: "计算矩形的面积、周长等属性",
    inputSchema: {
      length: z.number().positive().describe("长度"),
      width: z.number().positive().describe("宽度")
    }
  },
  handler: async ({ length, width }: { length: number; width: number }) => {
    const area = length * width;
    const perimeter = 2 * (length + width);
    const diagonal = Math.sqrt(length * length + width * width);

    return createSuccessResponse(
      `矩形计算结果：\n` +
      `长度：${length}\n` +
      `宽度：${width}\n` +
      `面积：${area}\n` +
      `周长：${perimeter}\n` +
      `对角线长度：${diagonal.toFixed(6)}`
    );
  }
};

// 三角形计算工具
const triangleCalculationTool: ToolRegistration = {
  name: "triangle_calculation",
  definition: {
    title: "三角形计算",
    description: "根据三边长计算三角形的面积、周长等属性",
    inputSchema: {
      side_a: z.number().positive().describe("边长a"),
      side_b: z.number().positive().describe("边长b"),
      side_c: z.number().positive().describe("边长c")
    }
  },
  handler: async ({ side_a, side_b, side_c }: { side_a: number; side_b: number; side_c: number }) => {
    // 检查三角形不等式
    if (side_a + side_b <= side_c || side_a + side_c <= side_b || side_b + side_c <= side_a) {
      return createErrorResponse("给定的三边长无法构成三角形！");
    }

    const perimeter = side_a + side_b + side_c;
    const semiPerimeter = perimeter / 2;

    // 海伦公式计算面积
    const area = Math.sqrt(semiPerimeter * (semiPerimeter - side_a) * (semiPerimeter - side_b) * (semiPerimeter - side_c));

    // 计算角度（余弦定理）
    const angleA = Math.acos((side_b * side_b + side_c * side_c - side_a * side_a) / (2 * side_b * side_c)) * 180 / Math.PI;
    const angleB = Math.acos((side_a * side_a + side_c * side_c - side_b * side_b) / (2 * side_a * side_c)) * 180 / Math.PI;
    const angleC = Math.acos((side_a * side_a + side_b * side_b - side_c * side_c) / (2 * side_a * side_b)) * 180 / Math.PI;

    // 判断三角形类型
    let triangleType = "一般三角形";
    if (side_a === side_b && side_b === side_c) {
      triangleType = "等边三角形";
    } else if (side_a === side_b || side_b === side_c || side_a === side_c) {
      triangleType = "等腰三角形";
    }

    // 检查是否为直角三角形
    const sides = [side_a, side_b, side_c].sort((a, b) => a - b);
    if (Math.abs(sides[0] * sides[0] + sides[1] * sides[1] - sides[2] * sides[2]) < 1e-10) {
      triangleType += "（直角三角形）";
    }

    return createSuccessResponse(
      `三角形计算结果：\n` +
      `边长：a=${side_a}, b=${side_b}, c=${side_c}\n` +
      `类型：${triangleType}\n` +
      `周长：${perimeter}\n` +
      `面积：${area.toFixed(6)}\n` +
      `角度：∠A=${angleA.toFixed(2)}°, ∠B=${angleB.toFixed(2)}°, ∠C=${angleC.toFixed(2)}°`
    );
  }
};

// 梯形计算工具
const trapezoidCalculationTool: ToolRegistration = {
  name: "trapezoid_calculation",
  definition: {
    title: "梯形计算",
    description: "计算梯形的面积",
    inputSchema: {
      top_base: z.number().positive().describe("上底"),
      bottom_base: z.number().positive().describe("下底"),
      height: z.number().positive().describe("高")
    }
  },
  handler: async ({ top_base, bottom_base, height }: { top_base: number; bottom_base: number; height: number }) => {
    const area = (top_base + bottom_base) * height / 2;
    const averageBase = (top_base + bottom_base) / 2;

    return createSuccessResponse(
      `梯形计算结果：\n` +
      `上底：${top_base}\n` +
      `下底：${bottom_base}\n` +
      `高：${height}\n` +
      `平均底边：${averageBase}\n` +
      `面积：${area}\n` +
      `计算公式：(上底 + 下底) × 高 ÷ 2 = ${area}`
    );
  }
};

// 椭圆计算工具
const ellipseCalculationTool: ToolRegistration = {
  name: "ellipse_calculation",
  definition: {
    title: "椭圆计算",
    description: "计算椭圆的面积和周长（近似）",
    inputSchema: {
      semi_major_axis: z.number().positive().describe("长半轴"),
      semi_minor_axis: z.number().positive().describe("短半轴")
    }
  },
  handler: async ({ semi_major_axis, semi_minor_axis }: { semi_major_axis: number; semi_minor_axis: number }) => {
    const area = Math.PI * semi_major_axis * semi_minor_axis;

    // 椭圆周长的拉马努金近似公式
    const h = Math.pow((semi_major_axis - semi_minor_axis) / (semi_major_axis + semi_minor_axis), 2);
    const circumference = Math.PI * (semi_major_axis + semi_minor_axis) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

    const eccentricity = Math.sqrt(1 - (semi_minor_axis * semi_minor_axis) / (semi_major_axis * semi_major_axis));
    const focalDistance = 2 * semi_major_axis * eccentricity;

    return createSuccessResponse(
      `椭圆计算结果：\n` +
      `长半轴：${semi_major_axis}\n` +
      `短半轴：${semi_minor_axis}\n` +
      `面积：${area.toFixed(6)}\n` +
      `周长（近似）：${circumference.toFixed(6)}\n` +
      `离心率：${eccentricity.toFixed(6)}\n` +
      `焦距：${focalDistance.toFixed(6)}`
    );
  }
};

// 球体计算工具
const sphereCalculationTool: ToolRegistration = {
  name: "sphere_calculation",
  definition: {
    title: "球体计算",
    description: "计算球体的体积和表面积",
    inputSchema: {
      radius: z.number().positive().describe("半径")
    }
  },
  handler: async ({ radius }: { radius: number }) => {
    const volume = (4 / 3) * Math.PI * radius * radius * radius;
    const surfaceArea = 4 * Math.PI * radius * radius;
    const diameter = 2 * radius;

    return createSuccessResponse(
      `球体计算结果：\n` +
      `半径：${radius}\n` +
      `直径：${diameter}\n` +
      `表面积：${surfaceArea.toFixed(6)}\n` +
      `体积：${volume.toFixed(6)}\n` +
      `体积公式：(4/3)πr³ = ${volume.toFixed(6)}`
    );
  }
};

// 圆柱体计算工具
const cylinderCalculationTool: ToolRegistration = {
  name: "cylinder_calculation",
  definition: {
    title: "圆柱体计算",
    description: "计算圆柱体的体积和表面积",
    inputSchema: {
      radius: z.number().positive().describe("底面半径"),
      height: z.number().positive().describe("高度")
    }
  },
  handler: async ({ radius, height }: { radius: number; height: number }) => {
    const baseArea = Math.PI * radius * radius;
    const volume = baseArea * height;
    const lateralArea = 2 * Math.PI * radius * height;
    const surfaceArea = 2 * baseArea + lateralArea;

    return createSuccessResponse(
      `圆柱体计算结果：\n` +
      `底面半径：${radius}\n` +
      `高度：${height}\n` +
      `底面积：${baseArea.toFixed(6)}\n` +
      `侧面积：${lateralArea.toFixed(6)}\n` +
      `表面积：${surfaceArea.toFixed(6)}\n` +
      `体积：${volume.toFixed(6)}\n` +
      `体积公式：πr²h = ${volume.toFixed(6)}`
    );
  }
};

// 圆锥体计算工具
const coneCalculationTool: ToolRegistration = {
  name: "cone_calculation",
  definition: {
    title: "圆锥体计算",
    description: "计算圆锥体的体积和表面积",
    inputSchema: {
      radius: z.number().positive().describe("底面半径"),
      height: z.number().positive().describe("高度")
    }
  },
  handler: async ({ radius, height }: { radius: number; height: number }) => {
    const baseArea = Math.PI * radius * radius;
    const volume = (1 / 3) * baseArea * height;
    const slantHeight = Math.sqrt(radius * radius + height * height);
    const lateralArea = Math.PI * radius * slantHeight;
    const surfaceArea = baseArea + lateralArea;

    return createSuccessResponse(
      `圆锥体计算结果：\n` +
      `底面半径：${radius}\n` +
      `高度：${height}\n` +
      `斜高：${slantHeight.toFixed(6)}\n` +
      `底面积：${baseArea.toFixed(6)}\n` +
      `侧面积：${lateralArea.toFixed(6)}\n` +
      `表面积：${surfaceArea.toFixed(6)}\n` +
      `体积：${volume.toFixed(6)}\n` +
      `体积公式：(1/3)πr²h = ${volume.toFixed(6)}`
    );
  }
};

// 长方体计算工具
const cuboidCalculationTool: ToolRegistration = {
  name: "cuboid_calculation",
  definition: {
    title: "长方体计算",
    description: "计算长方体的体积和表面积",
    inputSchema: {
      length: z.number().positive().describe("长度"),
      width: z.number().positive().describe("宽度"),
      height: z.number().positive().describe("高度")
    }
  },
  handler: async ({ length, width, height }: { length: number; width: number; height: number }) => {
    const volume = length * width * height;
    const surfaceArea = 2 * (length * width + length * height + width * height);
    const diagonal = Math.sqrt(length * length + width * width + height * height);

    return createSuccessResponse(
      `长方体计算结果：\n` +
      `长度：${length}\n` +
      `宽度：${width}\n` +
      `高度：${height}\n` +
      `体积：${volume}\n` +
      `表面积：${surfaceArea}\n` +
      `体对角线：${diagonal.toFixed(6)}\n` +
      `体积公式：长 × 宽 × 高 = ${volume}`
    );
  }
};

// 正多边形计算工具
const regularPolygonTool: ToolRegistration = {
  name: "regular_polygon",
  definition: {
    title: "正多边形计算",
    description: "计算正多边形的面积和周长",
    inputSchema: {
      sides: z.number().int().min(3).describe("边数"),
      side_length: z.number().positive().describe("边长")
    }
  },
  handler: async ({ sides, side_length }: { sides: number; side_length: number }) => {
    const perimeter = sides * side_length;
    const apothem = side_length / (2 * Math.tan(Math.PI / sides));
    const area = (perimeter * apothem) / 2;
    const centralAngle = 360 / sides;
    const interiorAngle = (sides - 2) * 180 / sides;

    return createSuccessResponse(
      `正${sides}边形计算结果：\n` +
      `边数：${sides}\n` +
      `边长：${side_length}\n` +
      `周长：${perimeter}\n` +
      `边心距：${apothem.toFixed(6)}\n` +
      `面积：${area.toFixed(6)}\n` +
      `中心角：${centralAngle}°\n` +
      `内角：${interiorAngle}°`
    );
  }
};

export const geometryTools: ToolRegistration[] = [
  circleCalculationTool,
  rectangleCalculationTool,
  triangleCalculationTool,
  trapezoidCalculationTool,
  ellipseCalculationTool,
  sphereCalculationTool,
  cylinderCalculationTool,
  coneCalculationTool,
  cuboidCalculationTool,
  regularPolygonTool
];