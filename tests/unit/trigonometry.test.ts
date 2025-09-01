/**
 * 三角函数模块单元测试
 */

import { trigonometryTools } from '../../src/modules/trigonometry.js';
import { ToolRegistration } from '../../src/types.js';

describe('三角函数模块', () => {
  let tools: Map<string, ToolRegistration>;

  beforeAll(() => {
    tools = new Map(trigonometryTools.map(tool => [tool.name, tool]));
  });

  describe('正弦函数 (sin)', () => {
    const sinTool = () => tools.get('sin')!;

    test('应该正确计算sin(0)', async () => {
      const result = await sinTool().handler({ angle: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('正弦函数结果：sin(0) = 0');
    });

    test('应该正确计算sin(π/2)', async () => {
      const result = await sinTool().handler({ angle: Math.PI / 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe(`正弦函数结果：sin(${Math.PI / 2}) = 1`);
    });

    test('应该正确计算sin(π)', async () => {
      const result = await sinTool().handler({ angle: Math.PI });
      expect(result.isError).toBeFalsy();
      const sinPi = Math.sin(Math.PI);
      expect(result.content[0].text).toBe(`正弦函数结果：sin(${Math.PI}) = ${sinPi}`);
    });

    test('应该正确计算sin(π/6)', async () => {
      const result = await sinTool().handler({ angle: Math.PI / 6 });
      expect(result.isError).toBeFalsy();
      const expected = Math.sin(Math.PI / 6);
      expect(result.content[0].text).toBe(`正弦函数结果：sin(${Math.PI / 6}) = ${expected}`);
    });

    test('应该正确计算负角度的正弦值', async () => {
      const result = await sinTool().handler({ angle: -Math.PI / 2 });
      expect(result.isError).toBeFalsy();
      const expected = Math.sin(-Math.PI / 2);
      expect(result.content[0].text).toBe(`正弦函数结果：sin(${-Math.PI / 2}) = ${expected}`);
    });
  });

  describe('余弦函数 (cos)', () => {
    const cosTool = () => tools.get('cos')!;

    test('应该正确计算cos(0)', async () => {
      const result = await cosTool().handler({ angle: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('余弦函数结果：cos(0) = 1');
    });

    test('应该正确计算cos(π/2)', async () => {
      const result = await cosTool().handler({ angle: Math.PI / 2 });
      expect(result.isError).toBeFalsy();
      const expected = Math.cos(Math.PI / 2);
      expect(result.content[0].text).toBe(`余弦函数结果：cos(${Math.PI / 2}) = ${expected}`);
    });

    test('应该正确计算cos(π)', async () => {
      const result = await cosTool().handler({ angle: Math.PI });
      expect(result.isError).toBeFalsy();
      const expected = Math.cos(Math.PI);
      expect(result.content[0].text).toBe(`余弦函数结果：cos(${Math.PI}) = ${expected}`);
    });

    test('应该正确计算cos(π/3)', async () => {
      const result = await cosTool().handler({ angle: Math.PI / 3 });
      expect(result.isError).toBeFalsy();
      const expected = Math.cos(Math.PI / 3);
      expect(result.content[0].text).toBe(`余弦函数结果：cos(${Math.PI / 3}) = ${expected}`);
    });
  });

  describe('正切函数 (tan)', () => {
    const tanTool = () => tools.get('tan')!;

    test('应该正确计算tan(0)', async () => {
      const result = await tanTool().handler({ angle: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('正切函数结果：tan(0) = 0');
    });

    test('应该正确计算tan(π/4)', async () => {
      const result = await tanTool().handler({ angle: Math.PI / 4 });
      expect(result.isError).toBeFalsy();
      const expected = Math.tan(Math.PI / 4);
      expect(result.content[0].text).toBe(`正切函数结果：tan(${Math.PI / 4}) = ${expected}`);
    });

    test('应该正确计算tan(π/6)', async () => {
      const result = await tanTool().handler({ angle: Math.PI / 6 });
      expect(result.isError).toBeFalsy();
      const expected = Math.tan(Math.PI / 6);
      expect(result.content[0].text).toBe(`正切函数结果：tan(${Math.PI / 6}) = ${expected}`);
    });

    test('应该正确计算负角度的正切值', async () => {
      const result = await tanTool().handler({ angle: -Math.PI / 4 });
      expect(result.isError).toBeFalsy();
      const expected = Math.tan(-Math.PI / 4);
      expect(result.content[0].text).toBe(`正切函数结果：tan(${-Math.PI / 4}) = ${expected}`);
    });
  });

  describe('反正弦函数 (asin)', () => {
    const asinTool = () => tools.get('asin')!;

    test('应该正确计算asin(0)', async () => {
      const result = await asinTool().handler({ value: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('反正弦函数结果：asin(0) = 0 弧度');
    });

    test('应该正确计算asin(1)', async () => {
      const result = await asinTool().handler({ value: 1 });
      expect(result.isError).toBeFalsy();
      const expected = Math.asin(1);
      expect(result.content[0].text).toBe(`反正弦函数结果：asin(1) = ${expected} 弧度`);
    });

    test('应该正确计算asin(-1)', async () => {
      const result = await asinTool().handler({ value: -1 });
      expect(result.isError).toBeFalsy();
      const expected = Math.asin(-1);
      expect(result.content[0].text).toBe(`反正弦函数结果：asin(-1) = ${expected} 弧度`);
    });

    test('应该正确计算asin(0.5)', async () => {
      const result = await asinTool().handler({ value: 0.5 });
      expect(result.isError).toBeFalsy();
      const expected = Math.asin(0.5);
      expect(result.content[0].text).toBe(`反正弦函数结果：asin(0.5) = ${expected} 弧度`);
    });

    test('应该正确处理超出定义域的错误（大于1）', async () => {
      const result = await asinTool().handler({ value: 1.5 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：反正弦函数的输入值必须在-1到1之间！');
    });

    test('应该正确处理超出定义域的错误（小于-1）', async () => {
      const result = await asinTool().handler({ value: -1.5 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：反正弦函数的输入值必须在-1到1之间！');
    });
  });

  describe('反余弦函数 (acos)', () => {
    const acosTool = () => tools.get('acos')!;

    test('应该正确计算acos(1)', async () => {
      const result = await acosTool().handler({ value: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('反余弦函数结果：acos(1) = 0 弧度');
    });

    test('应该正确计算acos(0)', async () => {
      const result = await acosTool().handler({ value: 0 });
      expect(result.isError).toBeFalsy();
      const expected = Math.acos(0);
      expect(result.content[0].text).toBe(`反余弦函数结果：acos(0) = ${expected} 弧度`);
    });

    test('应该正确计算acos(-1)', async () => {
      const result = await acosTool().handler({ value: -1 });
      expect(result.isError).toBeFalsy();
      const expected = Math.acos(-1);
      expect(result.content[0].text).toBe(`反余弦函数结果：acos(-1) = ${expected} 弧度`);
    });

    test('应该正确处理超出定义域的错误（大于1）', async () => {
      const result = await acosTool().handler({ value: 2 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：反余弦函数的输入值必须在-1到1之间！');
    });

    test('应该正确处理超出定义域的错误（小于-1）', async () => {
      const result = await acosTool().handler({ value: -2 });
      expect(result.isError).toBe(true);
      expect(result.content[0].text).toBe('错误：反余弦函数的输入值必须在-1到1之间！');
    });
  });

  describe('反正切函数 (atan)', () => {
    const atanTool = () => tools.get('atan')!;

    test('应该正确计算atan(0)', async () => {
      const result = await atanTool().handler({ value: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('反正切函数结果：atan(0) = 0 弧度');
    });

    test('应该正确计算atan(1)', async () => {
      const result = await atanTool().handler({ value: 1 });
      expect(result.isError).toBeFalsy();
      const expected = Math.atan(1);
      expect(result.content[0].text).toBe(`反正切函数结果：atan(1) = ${expected} 弧度`);
    });

    test('应该正确计算atan(-1)', async () => {
      const result = await atanTool().handler({ value: -1 });
      expect(result.isError).toBeFalsy();
      const expected = Math.atan(-1);
      expect(result.content[0].text).toBe(`反正切函数结果：atan(-1) = ${expected} 弧度`);
    });

    test('应该正确计算大数值的反正切', async () => {
      const result = await atanTool().handler({ value: 1000 });
      expect(result.isError).toBeFalsy();
      const expected = Math.atan(1000);
      expect(result.content[0].text).toBe(`反正切函数结果：atan(1000) = ${expected} 弧度`);
    });
  });

  describe('双参数反正切函数 (atan2)', () => {
    const atan2Tool = () => tools.get('atan2')!;

    test('应该正确计算atan2(1, 1)', async () => {
      const result = await atan2Tool().handler({ y: 1, x: 1 });
      expect(result.isError).toBeFalsy();
      const expected = Math.atan2(1, 1);
      expect(result.content[0].text).toBe(`双参数反正切函数结果：atan2(1, 1) = ${expected} 弧度`);
    });

    test('应该正确计算atan2(0, 1)', async () => {
      const result = await atan2Tool().handler({ y: 0, x: 1 });
      expect(result.isError).toBeFalsy();
      const expected = Math.atan2(0, 1);
      expect(result.content[0].text).toBe(`双参数反正切函数结果：atan2(0, 1) = ${expected} 弧度`);
    });
  });

  describe('双曲函数', () => {
    const sinhTool = () => tools.get('sinh')!;
    const coshTool = () => tools.get('cosh')!;
    const tanhTool = () => tools.get('tanh')!;

    test('应该正确计算sinh(0)', async () => {
      const result = await sinhTool().handler({ value: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('双曲正弦函数结果：sinh(0) = 0');
    });

    test('应该正确计算cosh(0)', async () => {
      const result = await coshTool().handler({ value: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('双曲余弦函数结果：cosh(0) = 1');
    });

    test('应该正确计算tanh(0)', async () => {
      const result = await tanhTool().handler({ value: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('双曲正切函数结果：tanh(0) = 0');
    });
  });

  describe('反双曲函数', () => {
    const asinhTool = () => tools.get('asinh')!;
    const acoshTool = () => tools.get('acosh')!;
    const atanhTool = () => tools.get('atanh')!;

    test('应该正确计算asinh(0)', async () => {
      const result = await asinhTool().handler({ value: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('反双曲正弦函数结果：asinh(0) = 0');
    });

    test('应该正确计算acosh(1)', async () => {
      const result = await acoshTool().handler({ value: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('反双曲余弦函数结果：acosh(1) = 0');
    });

    test('应该处理acosh输入值小于1的错误', async () => {
      const result = await acoshTool().handler({ value: 0.5 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('必须大于等于1');
    });

    test('应该正确计算atanh(0)', async () => {
      const result = await atanhTool().handler({ value: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('反双曲正切函数结果：atanh(0) = 0');
    });

    test('应该处理atanh输入值超出范围的错误', async () => {
      const result = await atanhTool().handler({ value: 1.5 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('必须在-1到1之间');
    });
  });

  describe('正割、余割、余切函数', () => {
    const secTool = () => tools.get('sec')!;
    const cscTool = () => tools.get('csc')!;
    const cotTool = () => tools.get('cot')!;

    test('应该正确计算sec(0)', async () => {
      const result = await secTool().handler({ angle: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe('正割函数结果：sec(0) = 1');
    });

    test('应该处理sec在cos=0处的错误', async () => {
      const result = await secTool().handler({ angle: Math.PI / 2 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('未定义');
    });

    test('应该处理csc在sin=0处的错误', async () => {
      const result = await cscTool().handler({ angle: 0 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('未定义');
    });

    test('应该正确计算csc(π/2)', async () => {
      const result = await cscTool().handler({ angle: Math.PI / 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toBe(`余割函数结果：csc(${Math.PI / 2}) = 1`);
    });

    test('应该处理cot在sin=0处的错误', async () => {
      const result = await cotTool().handler({ angle: 0 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('未定义');
    });

    test('应该正确计算cot(π/4)', async () => {
      const result = await cotTool().handler({ angle: Math.PI / 4 });
      expect(result.isError).toBeFalsy();
      const expected = 1 / Math.tan(Math.PI / 4);
      expect(result.content[0].text).toBe(`余切函数结果：cot(${Math.PI / 4}) = ${expected}`);
    });
  });

  describe('角度弧度转换', () => {
    const degToRadTool = () => tools.get('degToRad')!;
    const radToDegTool = () => tools.get('radToDeg')!;

    test('应该正确将角度转换为弧度', async () => {
      const result = await degToRadTool().handler({ degrees: 180 });
      expect(result.isError).toBeFalsy();
      const expected = (180 * Math.PI) / 180;
      expect(result.content[0].text).toBe(`角度转弧度结果：180° = ${expected} 弧度`);
    });

    test('应该正确将弧度转换为角度', async () => {
      const result = await radToDegTool().handler({ radians: Math.PI });
      expect(result.isError).toBeFalsy();
      const expected = (Math.PI * 180) / Math.PI;
      expect(result.content[0].text).toBe(`弧度转角度结果：${Math.PI} 弧度 = ${expected}°`);
    });
  });

  describe('工具定义验证', () => {
    test('所有工具应该有正确的定义结构', () => {
      trigonometryTools.forEach(tool => {
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
      const expectedTools = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2', 'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh', 'sec', 'csc', 'cot', 'degToRad', 'radToDeg'];
      const actualTools = trigonometryTools.map(tool => tool.name);
      expectedTools.forEach(toolName => {
        expect(actualTools).toContain(toolName);
      });
    });
  });
});