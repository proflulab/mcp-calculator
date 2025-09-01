import { conversionTools } from '../../src/modules/conversion.js';
import { ToolRegistration } from '../../src/types.js';

describe('单位转换模块测试', () => {
  let lengthConversionTool: ToolRegistration;
  let weightConversionTool: ToolRegistration;
  let temperatureConversionTool: ToolRegistration;
  let areaConversionTool: ToolRegistration;
  let volumeConversionTool: ToolRegistration;
  let timeConversionTool: ToolRegistration;
  let speedConversionTool: ToolRegistration;

  beforeAll(() => {
    lengthConversionTool = conversionTools.find(tool => tool.name === 'length_conversion')!;
    weightConversionTool = conversionTools.find(tool => tool.name === 'weight_conversion')!;
    temperatureConversionTool = conversionTools.find(tool => tool.name === 'temperature_conversion')!;
    areaConversionTool = conversionTools.find(tool => tool.name === 'area_conversion')!;
    volumeConversionTool = conversionTools.find(tool => tool.name === 'volume_conversion')!;
    timeConversionTool = conversionTools.find(tool => tool.name === 'time_conversion')!;
    speedConversionTool = conversionTools.find(tool => tool.name === 'speed_conversion')!;
  });

  describe('长度转换测试', () => {
    test('米到厘米', async () => {
      const result = await lengthConversionTool.handler({
        value: 1,
        from_unit: 'm',
        to_unit: 'cm'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('100');
    });

    test('英寸到厘米', async () => {
      const result = await lengthConversionTool.handler({
        value: 1,
        from_unit: 'inch',
        to_unit: 'cm'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('2.54');
    });

    test('千米到英里', async () => {
      const result = await lengthConversionTool.handler({
        value: 1,
        from_unit: 'km',
        to_unit: 'mile'
      });
      expect(result.isError).toBeFalsy();
    });

    test('千米到英里验证', async () => {
      const result = await lengthConversionTool.handler({
        value: 1,
        from_unit: 'km',
        to_unit: 'mile'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('0.62');
    });
  });

  describe('重量转换测试', () => {
    test('千克到克', async () => {
      const result = await weightConversionTool.handler({
        value: 1,
        from_unit: 'kg',
        to_unit: 'g'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1000');
    });

    test('磅到千克', async () => {
      const result = await weightConversionTool.handler({
        value: 1,
        from_unit: 'lb',
        to_unit: 'kg'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('0.453592');
    });
  });

  describe('温度转换测试', () => {
    test('摄氏度到华氏度', async () => {
      const result = await temperatureConversionTool.handler({
        value: 0,
        from_unit: 'celsius',
        to_unit: 'fahrenheit'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('32');
    });

    test('摄氏度到开尔文', async () => {
      const result = await temperatureConversionTool.handler({
        value: 0,
        from_unit: 'celsius',
        to_unit: 'kelvin'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('273.15');
    });

    test('华氏度到摄氏度', async () => {
      const result = await temperatureConversionTool.handler({
        value: 32,
        from_unit: 'fahrenheit',
        to_unit: 'celsius'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('0');
    });

    test('相同单位转换', async () => {
      const result = await temperatureConversionTool.handler({
        value: 25,
        from_unit: 'celsius',
        to_unit: 'celsius'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('25');
    });

    test('开尔文温度负值错误', async () => {
      const result = await temperatureConversionTool.handler({
        value: -10,
        from_unit: 'kelvin',
        to_unit: 'celsius'
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('开尔文温度不能为负值');
    });

    test('不支持的温度单位', async () => {
      const result = await temperatureConversionTool.handler({
        value: 25,
        from_unit: 'invalid_temp',
        to_unit: 'celsius'
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不支持的温度单位转换');
    });
  });

  describe('面积转换测试', () => {
    test('平方米到平方厘米', async () => {
      const result = await areaConversionTool.handler({
        value: 1,
        from_unit: 'm2',
        to_unit: 'cm2'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('10000');
    });

    test('公顷到平方米', async () => {
      const result = await areaConversionTool.handler({
        value: 1,
        from_unit: 'hectare',
        to_unit: 'm2'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('10000');
    });
  });

  describe('体积转换测试', () => {
    test('升到毫升', async () => {
      const result = await volumeConversionTool.handler({
        value: 1,
        from_unit: 'l',
        to_unit: 'ml'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1000');
    });

    test('立方米到升', async () => {
      const result = await volumeConversionTool.handler({
        value: 1,
        from_unit: 'm3',
        to_unit: 'l'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1000');
    });
  });

  describe('时间转换测试', () => {
    test('小时到分钟', async () => {
      const result = await timeConversionTool.handler({
        value: 1,
        from_unit: 'hour',
        to_unit: 'minute'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('60');
    });

    test('天到小时', async () => {
      const result = await timeConversionTool.handler({
        value: 1,
        from_unit: 'day',
        to_unit: 'hour'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('24');
    });

    test('年到天', async () => {
      const result = await timeConversionTool.handler({
        value: 1,
        from_unit: 'year',
        to_unit: 'day'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('365.24');
    });
  });

  describe('速度转换测试', () => {
    test('千米/小时到米/秒', async () => {
      const result = await speedConversionTool.handler({
        value: 36,
        from_unit: 'kmh',
        to_unit: 'mps'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('10');
    });

    test('英里/小时到千米/小时', async () => {
      const result = await speedConversionTool.handler({
        value: 60,
        from_unit: 'mph',
        to_unit: 'kmh'
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('96.56');
    });

    test('不支持的速度单位转换', async () => {
      const result = await speedConversionTool.handler({
        value: 100,
        from_unit: 'invalid_unit' as any,
        to_unit: 'mps'
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不支持的速度单位转换');
    });
  });

  describe('错误处理测试', () => {
    test('温度转换 - 不支持的单位组合', async () => {
      const result = await temperatureConversionTool.handler({
        value: 100,
        from_unit: 'invalid' as any,
        to_unit: 'celsius'
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不支持的温度单位转换');
    });

    test('面积转换 - 不支持的单位组合', async () => {
      const result = await areaConversionTool.handler({
        value: 100,
        from_unit: 'invalid' as any,
        to_unit: 'm2'
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不支持的面积单位转换');
    });

    test('体积转换 - 不支持的单位组合', async () => {
      const result = await volumeConversionTool.handler({
        value: 100,
        from_unit: 'invalid' as any,
        to_unit: 'l'
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不支持的体积单位转换');
    });

    test('时间转换 - 不支持的单位组合', async () => {
      const result = await timeConversionTool.handler({
        value: 100,
        from_unit: 'invalid' as any,
        to_unit: 'hour'
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不支持的时间单位转换');
    });
  });
});