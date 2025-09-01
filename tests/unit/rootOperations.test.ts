/**
 * 根运算模块单元测试
 */

import { rootOperationTools } from '../../src/modules/rootOperations';
import { ToolRegistration } from '../../src/types';

describe('根运算模块', () => {
  let tools: Map<string, ToolRegistration>;

  beforeAll(() => {
    tools = new Map(rootOperationTools.map(tool => [tool.name, tool]));
  });

  describe('平方根 (sqrt)', () => {
    const sqrtTool = () => tools.get('sqrt')!;

    test('应该正确计算正数的平方根', async () => {
      const result = await sqrtTool().handler({ a: 9 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('平方根结果：√9 = 3');
    });

    test('应该正确计算小数的平方根', async () => {
      const result = await sqrtTool().handler({ a: 2.25 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('平方根结果：√2.25 = 1.5');
    });

    test('应该正确计算零的平方根', async () => {
      const result = await sqrtTool().handler({ a: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('平方根结果：√0 = 0');
    });

    test('应该正确处理负数平方根错误', async () => {
      const result = await sqrtTool().handler({ a: -4 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：负数不能开平方根！');
    });

    test('应该正确计算大数的平方根', async () => {
      const result = await sqrtTool().handler({ a: 100 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('平方根结果：√100 = 10');
    });
  });

  describe('立方根 (cbrt)', () => {
    const cbrtTool = () => tools.get('cbrt')!;

    test('应该正确计算正数的立方根', async () => {
      const result = await cbrtTool().handler({ a: 8 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('立方根结果：∛8 = 2');
    });

    test('应该正确计算负数的立方根', async () => {
      const result = await cbrtTool().handler({ a: -8 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('立方根结果：∛-8 = -2');
    });

    test('应该正确计算零的立方根', async () => {
      const result = await cbrtTool().handler({ a: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('立方根结果：∛0 = 0');
    });

    test('应该正确计算小数的立方根', async () => {
      const result = await cbrtTool().handler({ a: 27 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('立方根结果：∛27 = 3');
    });
  });

  describe('n次方根 (nthRoot)', () => {
    const nthRootTool = () => tools.get('nthRoot')!;

    test('应该正确计算正数的偶次方根', async () => {
      const result = await nthRootTool().handler({ a: 16, n: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('4次方根结果：4√16 = 2');
    });

    test('应该正确计算正数的奇次方根', async () => {
      const result = await nthRootTool().handler({ a: 32, n: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('5次方根结果：5√32 = 2');
    });

    test('应该正确处理负数的偶次方根错误', async () => {
      const result = await nthRootTool().handler({ a: -16, n: 4 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：负数不能开偶次方根！');
    });

    test('应该正确计算负数的奇次方根', async () => {
      const result = await nthRootTool().handler({ a: -32, n: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('5次方根结果：5√-32 = -2');
    });

    test('应该正确处理开方次数为零的错误', async () => {
      const result = await nthRootTool().handler({ a: 16, n: 0 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：开方次数不能为零！');
    });

    test('应该正确计算平方根（n=2）', async () => {
      const result = await nthRootTool().handler({ a: 25, n: 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('2次方根结果：2√25 = 5');
    });

    test('应该正确计算立方根（n=3）', async () => {
      const result = await nthRootTool().handler({ a: 125, n: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('3次方根结果：3√125 = 4.999999999999999');
    });
  });

  describe('绝对值 (abs)', () => {
    const absTool = () => tools.get('abs')!;

    test('应该正确计算正数的绝对值', async () => {
      const result = await absTool().handler({ a: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('绝对值结果：|5| = 5');
    });

    test('应该正确计算负数的绝对值', async () => {
      const result = await absTool().handler({ a: -5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('绝对值结果：|-5| = 5');
    });

    test('应该正确计算零的绝对值', async () => {
      const result = await absTool().handler({ a: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('绝对值结果：|0| = 0');
    });

    test('应该正确计算小数的绝对值', async () => {
      const result = await absTool().handler({ a: -3.14 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('绝对值结果：|-3.14| = 3.14');
    });
  });

  describe('工具定义验证', () => {
    test('所有工具应该有正确的定义结构', () => {
      rootOperationTools.forEach(tool => {
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('definition');
        expect(tool).toHaveProperty('handler');
        expect(tool.definition).toHaveProperty('title');
        expect(tool.definition).toHaveProperty('description');
        expect(tool.definition).toHaveProperty('inputSchema');
        expect(typeof tool.handler).toBe('function');
      });
    });

    test('应该包含所有预期的工具', () => {
      const expectedTools = ['sqrt', 'cbrt', 'nthRoot', 'abs'];
      const actualTools = rootOperationTools.map(tool => tool.name);
      expectedTools.forEach(toolName => {
        expect(actualTools).toContain(toolName);
      });
    });
  });
});