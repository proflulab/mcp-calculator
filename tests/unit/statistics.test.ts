/**
 * 统计学函数模块单元测试
 */

import { statisticsTools } from '../../src/modules/statistics.js';
import { ToolRegistration } from '../../src/types.js';

describe('统计学函数模块测试', () => {
  let tools: Map<string, ToolRegistration>;

  beforeAll(() => {
    tools = new Map();
    statisticsTools.forEach(tool => {
      tools.set(tool.name, tool);
    });
  });

  describe('平均值测试', () => {
    const meanTool = () => tools.get('mean')!;

    test('正常计算平均值', async () => {
      const result = await meanTool().handler({ numbers: [1, 2, 3, 4, 5] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('3');
    });

    test('空数组应返回错误', async () => {
      const result = await meanTool().handler({ numbers: [] });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('数组不能为空');
    });

    test('负数平均值', async () => {
      const result = await meanTool().handler({ numbers: [-1, -2, -3] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-2');
    });
  });

  describe('中位数测试', () => {
    const medianTool = () => tools.get('median')!;

    test('奇数个元素的中位数', async () => {
      const result = await medianTool().handler({ numbers: [1, 3, 2, 5, 4] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('3');
    });

    test('偶数个元素的中位数', async () => {
      const result = await medianTool().handler({ numbers: [1, 2, 3, 4] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('2.5');
    });

    test('空数组应返回错误', async () => {
      const result = await medianTool().handler({ numbers: [] });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('数组不能为空');
    });
  });

  describe('众数测试', () => {
    const modeTool = () => tools.get('mode')!;

    test('单一众数', async () => {
      const result = await modeTool().handler({ numbers: [1, 2, 2, 3, 4] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('2');
      expect(result.content[0].text).toContain('出现次数：2');
    });

    test('多个众数', async () => {
      const result = await modeTool().handler({ numbers: [1, 1, 2, 2, 3] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('出现次数：2');
    });

    test('空数组应返回错误', async () => {
      const result = await modeTool().handler({ numbers: [] });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('数组不能为空');
    });
  });

  describe('标准差测试', () => {
    const stdDevTool = () => tools.get('stdDev')!;

    test('总体标准差', async () => {
      const result = await stdDevTool().handler({ numbers: [1, 2, 3, 4, 5] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('总体标准差');
    });

    test('样本标准差', async () => {
      const result = await stdDevTool().handler({ numbers: [1, 2, 3, 4, 5], sample: true });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('样本标准差');
    });

    test('样本标准差单个元素应返回错误', async () => {
      const result = await stdDevTool().handler({ numbers: [1], sample: true });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('样本标准差需要至少2个数据点');
    });
  });

  describe('方差测试', () => {
    const varianceTool = () => tools.get('variance')!;

    test('总体方差', async () => {
      const result = await varianceTool().handler({ numbers: [1, 2, 3, 4, 5] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('总体方差');
    });

    test('样本方差', async () => {
      const result = await varianceTool().handler({ numbers: [1, 2, 3, 4, 5], sample: true });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('样本方差');
    });

    test('样本方差单个元素应返回错误', async () => {
      const result = await varianceTool().handler({ numbers: [1], sample: true });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('样本方差需要至少2个数据点');
    });
  });

  describe('最大值和最小值测试', () => {
    const maxTool = () => tools.get('max')!;
    const minTool = () => tools.get('min')!;

    test('最大值', async () => {
      const result = await maxTool().handler({ numbers: [1, 5, 3, 9, 2] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('9');
    });

    test('最小值', async () => {
      const result = await minTool().handler({ numbers: [1, 5, 3, 9, 2] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });

    test('负数最大值', async () => {
      const result = await maxTool().handler({ numbers: [-5, -1, -3] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('-1');
    });
  });

  describe('求和和乘积测试', () => {
    const sumTool = () => tools.get('sum')!;
    const productTool = () => tools.get('product')!;

    test('求和', async () => {
      const result = await sumTool().handler({ numbers: [1, 2, 3, 4, 5] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('15');
    });

    test('乘积', async () => {
      const result = await productTool().handler({ numbers: [1, 2, 3, 4, 5] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('120');
    });

    test('空数组乘积', async () => {
      const result = await productTool().handler({ numbers: [] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });
  });

  describe('范围测试', () => {
    const rangeTool = () => tools.get('range')!;

    test('正常范围计算', async () => {
      const result = await rangeTool().handler({ numbers: [1, 5, 3, 9, 2] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('8');
      expect(result.content[0].text).toContain('最大值：9');
      expect(result.content[0].text).toContain('最小值：1');
    });

    test('空数组应返回错误', async () => {
      const result = await rangeTool().handler({ numbers: [] });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('数组不能为空');
    });
  });
});