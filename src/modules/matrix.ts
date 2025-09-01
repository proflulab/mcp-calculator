import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 矩阵加法工具
const matrixAddTool: ToolRegistration = {
  name: "matrix_add",
  definition: {
    title: "矩阵加法",
    description: "计算两个矩阵的和",
    inputSchema: {
      matrix_a: z.array(z.array(z.number())).describe("第一个矩阵（二维数组）"),
      matrix_b: z.array(z.array(z.number())).describe("第二个矩阵（二维数组）")
    }
  },
  handler: async ({ matrix_a, matrix_b }: { matrix_a: number[][]; matrix_b: number[][] }) => {
    if (matrix_a.length === 0 || matrix_b.length === 0) {
      return createErrorResponse("矩阵不能为空！");
    }

    if (matrix_a.length !== matrix_b.length || matrix_a[0].length !== matrix_b[0].length) {
      return createErrorResponse("矩阵维度必须相同才能进行加法运算！");
    }

    const result = matrix_a.map((row, i) =>
      row.map((val, j) => val + matrix_b[i][j])
    );

    const formatMatrix = (matrix: number[][]) => {
      return matrix.map(row => `[${row.join(', ')}]`).join('\n');
    };

    return createSuccessResponse(`矩阵加法结果：\n${formatMatrix(result)}`);
  }
};

// 矩阵减法工具
const matrixSubtractTool: ToolRegistration = {
  name: "matrix_subtract",
  definition: {
    title: "矩阵减法",
    description: "计算两个矩阵的差",
    inputSchema: {
      matrix_a: z.array(z.array(z.number())).describe("被减矩阵（二维数组）"),
      matrix_b: z.array(z.array(z.number())).describe("减数矩阵（二维数组）")
    }
  },
  handler: async ({ matrix_a, matrix_b }: { matrix_a: number[][]; matrix_b: number[][] }) => {
    if (matrix_a.length === 0 || matrix_b.length === 0) {
      return createErrorResponse("矩阵不能为空！");
    }

    if (matrix_a.length !== matrix_b.length || matrix_a[0].length !== matrix_b[0].length) {
      return createErrorResponse("矩阵维度必须相同才能进行减法运算！");
    }

    const result = matrix_a.map((row, i) =>
      row.map((val, j) => val - matrix_b[i][j])
    );

    const formatMatrix = (matrix: number[][]) => {
      return matrix.map(row => `[${row.join(', ')}]`).join('\n');
    };

    return createSuccessResponse(`矩阵减法结果：\n${formatMatrix(result)}`);
  }
};

// 矩阵乘法工具
const matrixMultiplyTool: ToolRegistration = {
  name: "matrix_multiply",
  definition: {
    title: "矩阵乘法",
    description: "计算两个矩阵的乘积",
    inputSchema: {
      matrix_a: z.array(z.array(z.number())).describe("第一个矩阵（二维数组）"),
      matrix_b: z.array(z.array(z.number())).describe("第二个矩阵（二维数组）")
    }
  },
  handler: async ({ matrix_a, matrix_b }: { matrix_a: number[][]; matrix_b: number[][] }) => {
    if (matrix_a.length === 0 || matrix_b.length === 0) {
      return createErrorResponse("矩阵不能为空！");
    }

    if (matrix_a[0].length !== matrix_b.length) {
      return createErrorResponse("第一个矩阵的列数必须等于第二个矩阵的行数！");
    }

    const result = matrix_a.map((row, i) =>
      matrix_b[0].map((_, j) =>
        row.reduce((sum, val, k) => sum + val * matrix_b[k][j], 0)
      )
    );

    const formatMatrix = (matrix: number[][]) => {
      return matrix.map(row => `[${row.join(', ')}]`).join('\n');
    };

    return createSuccessResponse(`矩阵乘法结果：\n${formatMatrix(result)}`);
  }
};

// 矩阵转置工具
const matrixTransposeTool: ToolRegistration = {
  name: "matrix_transpose",
  definition: {
    title: "矩阵转置",
    description: "计算矩阵的转置",
    inputSchema: {
      matrix: z.array(z.array(z.number())).describe("输入矩阵（二维数组）")
    }
  },
  handler: async ({ matrix }: { matrix: number[][] }) => {
    if (matrix.length === 0) {
      return createErrorResponse("矩阵不能为空！");
    }

    const result = matrix[0].map((_, colIndex) =>
      matrix.map(row => row[colIndex])
    );

    const formatMatrix = (matrix: number[][]) => {
      return matrix.map(row => `[${row.join(', ')}]`).join('\n');
    };

    return createSuccessResponse(`矩阵转置结果：\n${formatMatrix(result)}`);
  }
};

// 矩阵行列式工具
const matrixDeterminantTool: ToolRegistration = {
  name: "matrix_determinant",
  definition: {
    title: "矩阵行列式",
    description: "计算方阵的行列式",
    inputSchema: {
      matrix: z.array(z.array(z.number())).describe("输入方阵（二维数组）")
    }
  },
  handler: async ({ matrix }: { matrix: number[][] }) => {
    if (matrix.length === 0) {
      return createErrorResponse("矩阵不能为空！");
    }

    if (matrix.length !== matrix[0].length) {
      return createErrorResponse("只能计算方阵的行列式！");
    }

    const calculateDeterminant = (mat: number[][]): number => {
      const n = mat.length;

      if (n === 1) return mat[0][0];
      if (n === 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];

      let det = 0;
      for (let i = 0; i < n; i++) {
        const subMatrix = mat.slice(1).map(row =>
          row.filter((_, colIndex) => colIndex !== i)
        );
        det += Math.pow(-1, i) * mat[0][i] * calculateDeterminant(subMatrix);
      }

      return det;
    };

    const determinant = calculateDeterminant(matrix);

    return createSuccessResponse(`矩阵行列式：det = ${determinant}`);
  }
};

// 矩阵逆矩阵工具
const matrixInverseTool: ToolRegistration = {
  name: "matrix_inverse",
  definition: {
    title: "矩阵求逆",
    description: "计算方阵的逆矩阵",
    inputSchema: {
      matrix: z.array(z.array(z.number())).describe("输入方阵（二维数组）")
    }
  },
  handler: async ({ matrix }: { matrix: number[][] }) => {
    if (matrix.length === 0) {
      return createErrorResponse("矩阵不能为空！");
    }

    if (matrix.length !== matrix[0].length) {
      return createErrorResponse("只能计算方阵的逆矩阵！");
    }

    const n = matrix.length;

    // 创建增广矩阵 [A|I]
    const augmented = matrix.map((row, i) => {
      const identityRow = new Array(n).fill(0);
      identityRow[i] = 1;
      return [...row, ...identityRow];
    });

    // 高斯-约旦消元法
    for (let i = 0; i < n; i++) {
      // 寻找主元
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
          maxRow = k;
        }
      }

      // 交换行
      [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

      // 检查是否为奇异矩阵
      if (Math.abs(augmented[i][i]) < 1e-10) {
        return createErrorResponse("矩阵是奇异的，不存在逆矩阵！");
      }

      // 将主元归一化
      const pivot = augmented[i][i];
      for (let j = 0; j < 2 * n; j++) {
        augmented[i][j] /= pivot;
      }

      // 消元
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = augmented[k][i];
          for (let j = 0; j < 2 * n; j++) {
            augmented[k][j] -= factor * augmented[i][j];
          }
        }
      }
    }

    // 提取逆矩阵
    const inverse = augmented.map(row => row.slice(n));

    const formatMatrix = (matrix: number[][]) => {
      return matrix.map(row => `[${row.map(val => val.toFixed(6)).join(', ')}]`).join('\n');
    };

    return createSuccessResponse(`逆矩阵：\n${formatMatrix(inverse)}`);
  }
};

// 矩阵迹工具
const matrixTraceTool: ToolRegistration = {
  name: "matrix_trace",
  definition: {
    title: "矩阵迹",
    description: "计算方阵的迹（对角线元素之和）",
    inputSchema: {
      matrix: z.array(z.array(z.number())).describe("输入方阵（二维数组）")
    }
  },
  handler: async ({ matrix }: { matrix: number[][] }) => {
    if (matrix.length === 0) {
      return createErrorResponse("矩阵不能为空！");
    }

    if (matrix.length !== matrix[0].length) {
      return createErrorResponse("只能计算方阵的迹！");
    }

    const trace = matrix.reduce((sum, row, i) => sum + row[i], 0);

    return createSuccessResponse(`矩阵迹：tr = ${trace}`);
  }
};

export const matrixTools: ToolRegistration[] = [
  matrixAddTool,
  matrixSubtractTool,
  matrixMultiplyTool,
  matrixTransposeTool,
  matrixDeterminantTool,
  matrixInverseTool,
  matrixTraceTool
];