import { matrixTools } from '../../src/modules/matrix.js';
import { ToolRegistration } from '../../src/types.js';

describe('matrixTools', () => {
  let tools: { [key: string]: ToolRegistration };

  beforeAll(() => {
    tools = {};
    matrixTools.forEach(tool => {
      tools[tool.name] = tool;
    });
  });

  describe('matrix_add', () => {
    it('should add two matrices correctly', async () => {
      const result = await tools.matrix_add.handler({
        matrix_a: [[1, 2], [3, 4]],
        matrix_b: [[5, 6], [7, 8]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('6');
      expect(result.content[0].text).toContain('8');
    });

    it('should handle dimension mismatch', async () => {
      const result = await tools.matrix_add.handler({
        matrix_a: [[1, 2], [3, 4]],
        matrix_b: [[5, 6, 7], [8, 9, 10]]
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('矩阵维度必须相同');
    });

    it('should handle empty matrix', async () => {
      const result = await tools.matrix_add.handler({
        matrix_a: [],
        matrix_b: [[1, 2]]
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('矩阵不能为空');
    });
  });

  describe('matrix_subtract', () => {
    it('should subtract two matrices correctly', async () => {
      const result = await tools.matrix_subtract.handler({
        matrix_a: [[5, 6], [7, 8]],
        matrix_b: [[1, 2], [3, 4]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('4');
    });
  });

  describe('matrix_multiply', () => {
    it('should multiply two matrices correctly', async () => {
      const result = await tools.matrix_multiply.handler({
        matrix_a: [[1, 2], [3, 4]],
        matrix_b: [[5, 6], [7, 8]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('19');
      expect(result.content[0].text).toContain('22');
    });

    it('should handle dimension mismatch', async () => {
      const result = await tools.matrix_multiply.handler({
        matrix_a: [[1, 2], [3, 4]],
        matrix_b: [[5, 6, 7]]
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('第一个矩阵的列数必须等于第二个矩阵的行数');
    });
  });

  describe('matrix_transpose', () => {
    it('should transpose matrix correctly', async () => {
      const result = await tools.matrix_transpose.handler({
        matrix: [[1, 2, 3], [4, 5, 6]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
      expect(result.content[0].text).toContain('4');
    });
  });

  describe('matrix_determinant', () => {
    it('should calculate 2x2 determinant', async () => {
      const result = await tools.matrix_determinant.handler({
        matrix: [[1, 2], [3, 4]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-2');
    });

    it('should calculate 3x3 determinant', async () => {
      const result = await tools.matrix_determinant.handler({
        matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('0');
    });

    it('should handle non-square matrix', async () => {
      const result = await tools.matrix_determinant.handler({
        matrix: [[1, 2, 3], [4, 5, 6]]
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('只能计算方阵');
    });
  });

  describe('matrix_inverse', () => {
    it('should calculate inverse of 2x2 matrix', async () => {
      const result = await tools.matrix_inverse.handler({
        matrix: [[1, 2], [3, 4]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-2.000000');
    });

    it('should handle identity matrix', async () => {
      const result = await tools.matrix_inverse.handler({
        matrix: [[1, 0], [0, 1]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1.000000');
    });

    it('should handle singular matrix', async () => {
      const result = await tools.matrix_inverse.handler({
        matrix: [[1, 2], [2, 4]]
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('矩阵是奇异的，不存在逆矩阵');
    });

    it('should handle non-square matrix', async () => {
      const result = await tools.matrix_inverse.handler({
        matrix: [[1, 2, 3], [4, 5, 6]]
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('只能计算方阵的逆矩阵');
    });
  });

  describe('matrix_trace', () => {
    it('should calculate trace of 2x2 matrix', async () => {
      const result = await tools.matrix_trace.handler({
        matrix: [[1, 2], [3, 4]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('矩阵迹：tr = 5');
    });

    it('should calculate trace of 3x3 matrix', async () => {
      const result = await tools.matrix_trace.handler({
        matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('矩阵迹：tr = 15');
    });

    it('should calculate trace of identity matrix', async () => {
      const result = await tools.matrix_trace.handler({
        matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('矩阵迹：tr = 3');
    });

    it('should handle non-square matrix', async () => {
      const result = await tools.matrix_trace.handler({
        matrix: [[1, 2, 3], [4, 5, 6]]
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('只能计算方阵的迹');
    });
  });
});