/**
 * 对数函数模块单元测试
 */

import { logarithmTools } from '../../src/modules/logarithm';
import { ToolRegistration } from '../../src/types';

describe('对数函数模块', () => {
  let tools: Map<string, ToolRegistration>;

  beforeAll(() => {
    tools = new Map(logarithmTools.map(tool => [tool.name, tool]));
  });

  describe('自然对数 (ln)', () => {
    const lnTool = () => tools.get('ln')!;

    test('应该正确计算ln(1)', async () => {
      const result = await lnTool().handler({ value: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('自然对数结果：ln(1) = 0');
    });

    test('应该正确计算ln(e)', async () => {
      const result = await lnTool().handler({ value: Math.E });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(Math.E);
      expect(result.content[0].text).toBe(`自然对数结果：ln(${Math.E}) = ${expected}`);
    });

    test('应该正确计算ln(e²)', async () => {
      const eSquared = Math.E * Math.E;
      const result = await lnTool().handler({ value: eSquared });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(eSquared);
      expect(result.content[0].text).toBe(`自然对数结果：ln(${eSquared}) = ${expected}`);
    });

    test('应该正确计算ln(10)', async () => {
      const result = await lnTool().handler({ value: 10 });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(10);
      expect(result.content[0].text).toBe(`自然对数结果：ln(10) = ${expected}`);
    });

    test('应该正确处理零的对数错误', async () => {
      const result = await lnTool().handler({ value: 0 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的输入值必须大于0！');
    });

    test('应该正确处理负数的对数错误', async () => {
      const result = await lnTool().handler({ value: -5 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的输入值必须大于0！');
    });

    test('应该正确计算小数的自然对数', async () => {
      const result = await lnTool().handler({ value: 0.5 });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(0.5);
      expect(result.content[0].text).toBe(`自然对数结果：ln(0.5) = ${expected}`);
    });
  });

  describe('常用对数 (log10)', () => {
    const log10Tool = () => tools.get('log10')!;

    test('应该正确计算log10(1)', async () => {
      const result = await log10Tool().handler({ value: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('常用对数结果：log10(1) = 0');
    });

    test('应该正确计算log10(10)', async () => {
      const result = await log10Tool().handler({ value: 10 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('常用对数结果：log10(10) = 1');
    });

    test('应该正确计算log10(100)', async () => {
      const result = await log10Tool().handler({ value: 100 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('常用对数结果：log10(100) = 2');
    });

    test('应该正确计算log10(1000)', async () => {
      const result = await log10Tool().handler({ value: 1000 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('常用对数结果：log10(1000) = 3');
    });

    test('应该正确处理零的对数错误', async () => {
      const result = await log10Tool().handler({ value: 0 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的输入值必须大于0！');
    });

    test('应该正确处理负数的对数错误', async () => {
      const result = await log10Tool().handler({ value: -10 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的输入值必须大于0！');
    });

    test('应该正确计算小数的常用对数', async () => {
      const result = await log10Tool().handler({ value: 0.1 });
      expect(result.isError).toBeFalsy();
      const expected = Math.log10(0.1);
      expect(result.content[0].text).toBe(`常用对数结果：log10(0.1) = ${expected}`);
    });
  });

  describe('任意底数对数 (log)', () => {
    const logTool = () => tools.get('log')!;

    test('应该正确计算log2(8)', async () => {
      const result = await logTool().handler({ value: 8, base: 2 });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(8) / Math.log(2);
      expect(result.content[0].text).toBe(`任意底数对数结果：log2(8) = ${expected}`);
    });

    test('应该正确计算log3(27)', async () => {
      const result = await logTool().handler({ value: 27, base: 3 });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(27) / Math.log(3);
      expect(result.content[0].text).toBe(`任意底数对数结果：log3(27) = ${expected}`);
    });

    test('应该正确计算log5(125)', async () => {
      const result = await logTool().handler({ value: 125, base: 5 });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(125) / Math.log(5);
      expect(result.content[0].text).toBe(`任意底数对数结果：log5(125) = ${expected}`);
    });

    test('应该正确计算log10(100)（验证与log10工具一致性）', async () => {
      const result = await logTool().handler({ value: 100, base: 10 });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(100) / Math.log(10);
      expect(result.content[0].text).toBe(`任意底数对数结果：log10(100) = ${expected}`);
    });

    test('应该正确处理输入值为零的错误', async () => {
      const result = await logTool().handler({ value: 0, base: 2 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的输入值必须大于0！');
    });

    test('应该正确处理输入值为负数的错误', async () => {
      const result = await logTool().handler({ value: -5, base: 2 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的输入值必须大于0！');
    });

    test('应该正确处理底数为零的错误', async () => {
      const result = await logTool().handler({ value: 8, base: 0 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的底数必须大于0且不等于1！');
    });

    test('应该正确处理底数为1的错误', async () => {
      const result = await logTool().handler({ value: 8, base: 1 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的底数必须大于0且不等于1！');
    });

    test('应该正确处理底数为负数的错误', async () => {
      const result = await logTool().handler({ value: 8, base: -2 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：对数函数的底数必须大于0且不等于1！');
    });

    test('应该正确计算小数底数的对数', async () => {
      const result = await logTool().handler({ value: 4, base: 0.5 });
      expect(result.isError).toBeFalsy();
      const expected = Math.log(4) / Math.log(0.5);
      expect(result.content[0].text).toBe(`任意底数对数结果：log0.5(4) = ${expected}`);
    });
  });

  describe('工具定义验证', () => {
    test('所有工具应该有正确的定义结构', () => {
      logarithmTools.forEach(tool => {
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
      const expectedTools = ['ln', 'log10', 'log'];
      const actualTools = logarithmTools.map(tool => tool.name);
      expectedTools.forEach(toolName => {
        expect(actualTools).toContain(toolName);
      });
    });
  });
});