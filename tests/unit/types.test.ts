import { MathError, formatResult, createErrorResponse, createSuccessResponse } from '../../src/types';

describe('类型模块测试', () => {
  describe('MathError类测试', () => {
    test('创建MathError实例', () => {
      const error = new MathError('测试错误消息');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(MathError);
      expect(error.message).toBe('测试错误消息');
      expect(error.name).toBe('MathError');
    });

    test('MathError继承Error的属性', () => {
      const error = new MathError('另一个错误');
      expect(error.stack).toBeDefined();
      expect(error.toString()).toContain('MathError: 另一个错误');
    });
  });

  describe('formatResult函数测试', () => {
    test('格式化数字操作数结果', () => {
      const result = formatResult('加法', [1, 2], 3);
      expect(result).toBe('加法结果：1 2 = 3');
    });

    test('格式化字符串操作数结果', () => {
      const result = formatResult('转换', ['10', 'cm'], '100mm');
      expect(result).toBe('转换结果：10 cm = 100mm');
    });

    test('格式化混合操作数结果', () => {
      const result = formatResult('计算', [3.14, 'π'], '圆周率');
      expect(result).toBe('计算结果：3.14 π = 圆周率');
    });

    test('格式化空操作数结果', () => {
      const result = formatResult('操作', [], 'result');
      expect(result).toBe('操作结果： = result');
    });

    test('格式化单个操作数结果', () => {
      const result = formatResult('平方根', [16], 4);
      expect(result).toBe('平方根结果：16 = 4');
    });
  });

  describe('响应创建函数测试', () => {
    test('createErrorResponse创建错误响应', () => {
      const response = createErrorResponse('测试错误');
      expect(response.isError).toBe(true);
      expect(response.content).toHaveLength(1);
      expect(response.content[0].type).toBe('text');
      expect(response.content[0].text).toBe('错误：测试错误');
    });

    test('createSuccessResponse创建成功响应', () => {
      const response = createSuccessResponse('操作成功');
      expect(response.isError).toBeUndefined();
      expect(response.content).toHaveLength(1);
      expect(response.content[0].type).toBe('text');
      expect(response.content[0].text).toBe('操作成功');
    });
  });
});