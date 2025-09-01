/**
 * 基础数学运算模块单元测试
 */

import { basicMathTools } from '../../src/modules/basicMath';
import { ToolRegistration } from '../../src/types';

describe('基础数学运算模块', () => {
  let tools: Map<string, ToolRegistration>;

  beforeAll(() => {
    // 将工具数组转换为Map以便查找
    tools = new Map(basicMathTools.map(tool => [tool.name, tool]));
  });

  describe('加法运算 (add)', () => {
    const addTool = () => tools.get('add')!;

    test('应该正确执行正数加法', async () => {
      const result = await addTool().handler({ a: 5, b: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('加法运算结果：5 + 3 = 8');
    });

    test('应该正确执行负数加法', async () => {
      const result = await addTool().handler({ a: -5, b: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('加法运算结果：-5 + 3 = -2');
    });

    test('应该正确执行小数加法', async () => {
      const result = await addTool().handler({ a: 1.5, b: 2.3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('加法运算结果：1.5 + 2.3 = 3.8');
    });

    test('应该正确执行零加法', async () => {
      const result = await addTool().handler({ a: 0, b: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('加法运算结果：0 + 5 = 5');
    });
  });

  describe('减法运算 (subtract)', () => {
    const subtractTool = () => tools.get('subtract')!;

    test('应该正确执行正数减法', async () => {
      const result = await subtractTool().handler({ a: 10, b: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('减法运算结果：10 - 3 = 7');
    });

    test('应该正确执行负数减法', async () => {
      const result = await subtractTool().handler({ a: 5, b: 8 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('减法运算结果：5 - 8 = -3');
    });

    test('应该正确执行小数减法', async () => {
      const result = await subtractTool().handler({ a: 5.7, b: 2.2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('减法运算结果：5.7 - 2.2 = 3.5');
    });
  });

  describe('乘法运算 (multiply)', () => {
    const multiplyTool = () => tools.get('multiply')!;

    test('应该正确执行正数乘法', async () => {
      const result = await multiplyTool().handler({ a: 4, b: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('乘法运算结果：4 × 5 = 20');
    });

    test('应该正确执行负数乘法', async () => {
      const result = await multiplyTool().handler({ a: -3, b: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('乘法运算结果：-3 × 4 = -12');
    });

    test('应该正确执行零乘法', async () => {
      const result = await multiplyTool().handler({ a: 0, b: 100 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('乘法运算结果：0 × 100 = 0');
    });

    test('应该正确执行小数乘法', async () => {
      const result = await multiplyTool().handler({ a: 2.5, b: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('乘法运算结果：2.5 × 4 = 10');
    });
  });

  describe('除法运算 (divide)', () => {
    const divideTool = () => tools.get('divide')!;

    test('应该正确执行正数除法', async () => {
      const result = await divideTool().handler({ a: 15, b: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('除法运算结果：15 ÷ 3 = 5');
    });

    test('应该正确执行小数除法', async () => {
      const result = await divideTool().handler({ a: 7, b: 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('除法运算结果：7 ÷ 2 = 3.5');
    });

    test('应该正确处理除零错误', async () => {
      const result = await divideTool().handler({ a: 10, b: 0 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：除数不能为零！');
    });

    test('应该正确执行负数除法', async () => {
      const result = await divideTool().handler({ a: -12, b: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('除法运算结果：-12 ÷ 4 = -3');
    });
  });

  describe('求余运算 (modulo)', () => {
    const moduloTool = () => tools.get('modulo')!;

    test('应该正确执行求余运算', async () => {
      const result = await moduloTool().handler({ a: 17, b: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('求余运算结果：17 % 5 = 2');
    });

    test('应该正确处理求余除零错误', async () => {
      const result = await moduloTool().handler({ a: 10, b: 0 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：除数不能为零！');
    });

    test('应该正确执行负数求余', async () => {
      const result = await moduloTool().handler({ a: -17, b: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('求余运算结果：-17 % 5 = -2');
    });
  });

  describe('幂运算 (power)', () => {
    const powerTool = () => tools.get('power')!;

    test('应该正确执行正整数幂运算', async () => {
      const result = await powerTool().handler({ a: 2, b: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('幂运算结果：2^3 = 8');
    });

    test('应该正确执行零次幂', async () => {
      const result = await powerTool().handler({ a: 5, b: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('幂运算结果：5^0 = 1');
    });

    test('应该正确执行负数幂运算', async () => {
      const result = await powerTool().handler({ a: -2, b: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('幂运算结果：-2^3 = -8');
    });

    test('应该正确执行小数幂运算', async () => {
      const result = await powerTool().handler({ a: 4, b: 0.5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('幂运算结果：4^0.5 = 2');
    });
  });

  describe('工具定义验证', () => {
    test('所有工具应该有正确的定义结构', () => {
      basicMathTools.forEach(tool => {
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
      const expectedTools = ['add', 'subtract', 'multiply', 'divide', 'modulo', 'power'];
      const actualTools = basicMathTools.map(tool => tool.name);
      expectedTools.forEach(toolName => {
        expect(actualTools).toContain(toolName);
      });
    });
  });
});