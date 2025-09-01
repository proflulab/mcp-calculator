import { complexTools } from '../../src/modules/complex.js';
import { ToolRegistration } from '../../src/types.js';

describe('复数运算模块测试', () => {
  let complexAddTool: ToolRegistration;
  let complexSubtractTool: ToolRegistration;
  let complexMultiplyTool: ToolRegistration;
  let complexDivideTool: ToolRegistration;
  let complexMagnitudeTool: ToolRegistration;
  let complexConjugateTool: ToolRegistration;
  let complexArgumentTool: ToolRegistration;
  let complexPolarTool: ToolRegistration;

  beforeAll(() => {
    complexAddTool = complexTools.find(tool => tool.name === 'complex_add')!;
    complexSubtractTool = complexTools.find(tool => tool.name === 'complex_subtract')!;
    complexMultiplyTool = complexTools.find(tool => tool.name === 'complex_multiply')!;
    complexDivideTool = complexTools.find(tool => tool.name === 'complex_divide')!;
    complexMagnitudeTool = complexTools.find(tool => tool.name === 'complex_magnitude')!;
    complexConjugateTool = complexTools.find(tool => tool.name === 'complex_conjugate')!;
    complexArgumentTool = complexTools.find(tool => tool.name === 'complex_argument')!;
    complexPolarTool = complexTools.find(tool => tool.name === 'complex_polar')!;
  });

  describe('复数加法测试', () => {
    test('正常复数加法', async () => {
      const result = await complexAddTool.handler({ a_real: 3, a_imag: 4, b_real: 1, b_imag: 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('4 + 6i');
    });

    test('实数加法', async () => {
      const result = await complexAddTool.handler({ a_real: 5, a_imag: 0, b_real: 3, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('8');
    });

    test('纯虚数加法', async () => {
      const result = await complexAddTool.handler({ a_real: 0, a_imag: 3, b_real: 0, b_imag: 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('5i');
    });

    test('纯虚数i加法', async () => {
      const result = await complexAddTool.handler({ a_real: 0, a_imag: 1, b_real: 0, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('i');
    });

    test('纯虚数-i加法', async () => {
      const result = await complexAddTool.handler({ a_real: 0, a_imag: -1, b_real: 0, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-i');
    });
  });

  describe('复数减法测试', () => {
    test('正常复数减法', async () => {
      const result = await complexSubtractTool.handler({ a_real: 5, a_imag: 7, b_real: 2, b_imag: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('3 + 4i');
    });

    test('负结果', async () => {
      const result = await complexSubtractTool.handler({ a_real: 1, a_imag: 2, b_real: 3, b_imag: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-2 - 2i');
    });

    test('纯虚数i减法', async () => {
      const result = await complexSubtractTool.handler({ a_real: 0, a_imag: 1, b_real: 0, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('i');
    });

    test('纯虚数-i减法', async () => {
      const result = await complexSubtractTool.handler({ a_real: 0, a_imag: -1, b_real: 0, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-i');
    });
  });

  describe('复数乘法测试', () => {
    test('正常复数乘法', async () => {
      const result = await complexMultiplyTool.handler({ a_real: 1, a_imag: 2, b_real: 3, b_imag: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-5 + 10i');
    });

    test('与实数相乘', async () => {
      const result = await complexMultiplyTool.handler({ a_real: 2, a_imag: 3, b_real: 4, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('8 + 12i');
    });

    test('纯虚数i乘法', async () => {
      const result = await complexMultiplyTool.handler({ a_real: 0, a_imag: 1, b_real: 2, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('2i');
    });

    test('纯虚数-i乘法', async () => {
      const result = await complexMultiplyTool.handler({ a_real: 0, a_imag: -1, b_real: 3, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-3i');
    });
  });

  describe('复数除法测试', () => {
    test('正常复数除法', async () => {
      const result = await complexDivideTool.handler({ a_real: 6, a_imag: 8, b_real: 3, b_imag: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('2');
    });

    test('除零错误测试', async () => {
      const result = await complexDivideTool.handler({ a_real: 1, a_imag: 1, b_real: 0, b_imag: 0 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('除数不能为零');
    });

    test('纯虚数i除法', async () => {
      const result = await complexDivideTool.handler({ a_real: 0, a_imag: 1, b_real: 1, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('i');
    });

    test('纯虚数-i除法', async () => {
      const result = await complexDivideTool.handler({ a_real: 0, a_imag: -1, b_real: 1, b_imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-i');
    });
  });

  describe('复数模长测试', () => {
    test('计算模长', async () => {
      const result = await complexMagnitudeTool.handler({ real: 3, imag: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('5');
    });

    test('实数的模长', async () => {
      const result = await complexMagnitudeTool.handler({ real: 5, imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('5');
    });

    test('纯虚数i的模长', async () => {
      const result = await complexMagnitudeTool.handler({ real: 0, imag: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });

    test('纯虚数-i的模长', async () => {
      const result = await complexMagnitudeTool.handler({ real: 0, imag: -1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });
  });

  describe('复数共轭测试', () => {
    test('计算共轭', async () => {
      const result = await complexConjugateTool.handler({ real: 3, imag: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('3 - 4i');
    });

    test('实数的共轭', async () => {
      const result = await complexConjugateTool.handler({ real: 5, imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('5');
    });

    test('纯虚数i的共轭', async () => {
      const result = await complexConjugateTool.handler({ real: 0, imag: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-i');
    });

    test('纯虚数-i的共轭', async () => {
      const result = await complexConjugateTool.handler({ real: 0, imag: -1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('i');
    });
  });

  describe('复数幅角测试', () => {
    test('第一象限角度', async () => {
      const result = await complexArgumentTool.handler({ real: 1, imag: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('45');
    });

    test('负实轴', async () => {
      const result = await complexArgumentTool.handler({ real: -1, imag: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('180');
    });

    test('零复数幅角错误测试', async () => {
      const result = await complexArgumentTool.handler({ real: 0, imag: 0 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('零复数的幅角未定义');
    });
  });

  describe('极坐标形式测试', () => {
    test('转换为极坐标', async () => {
      const result = await complexPolarTool.handler({ real: 1, imag: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1.414');
      expect(result.content[0].text).toContain('45°');
    });

    test('零复数极坐标', async () => {
      const result = await complexPolarTool.handler({
        real: 0,
        imag: 0
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('0∠0°');
    });

    test('纯实数极坐标', async () => {
      const result = await complexPolarTool.handler({
        real: 5,
        imag: 0
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('5 = 5∠0°');
    });

    test('纯虚数极坐标', async () => {
      const result = await complexPolarTool.handler({
        real: 0,
        imag: 3
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('3i = 3∠90°');
    });
  });
});