import { geometryTools } from '../../src/modules/geometry.js';
import { ToolRegistration } from '../../src/types.js';

describe('几何计算模块测试', () => {
  let circleCalculationTool: ToolRegistration;
  let rectangleCalculationTool: ToolRegistration;
  let triangleCalculationTool: ToolRegistration;
  let trapezoidCalculationTool: ToolRegistration;
  let ellipseCalculationTool: ToolRegistration;
  let sphereCalculationTool: ToolRegistration;
  let cylinderCalculationTool: ToolRegistration;
  let coneCalculationTool: ToolRegistration;
  let cuboidCalculationTool: ToolRegistration;
  let regularPolygonTool: ToolRegistration;

  beforeAll(() => {
    circleCalculationTool = geometryTools.find(tool => tool.name === 'circle_calculation')!;
    rectangleCalculationTool = geometryTools.find(tool => tool.name === 'rectangle_calculation')!;
    triangleCalculationTool = geometryTools.find(tool => tool.name === 'triangle_calculation')!;
    trapezoidCalculationTool = geometryTools.find(tool => tool.name === 'trapezoid_calculation')!;
    ellipseCalculationTool = geometryTools.find(tool => tool.name === 'ellipse_calculation')!;
    sphereCalculationTool = geometryTools.find(tool => tool.name === 'sphere_calculation')!;
    cylinderCalculationTool = geometryTools.find(tool => tool.name === 'cylinder_calculation')!;
    coneCalculationTool = geometryTools.find(tool => tool.name === 'cone_calculation')!;
    cuboidCalculationTool = geometryTools.find(tool => tool.name === 'cuboid_calculation')!;
    regularPolygonTool = geometryTools.find(tool => tool.name === 'regular_polygon')!;
  });

  describe('圆形计算测试', () => {
    test('单位圆计算', async () => {
      const result = await circleCalculationTool.handler({ radius: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('直径：2');
      expect(result.content[0].text).toContain('周长：6.283185');
      expect(result.content[0].text).toContain('面积：3.141593');
    });

    test('半径为5的圆', async () => {
      const result = await circleCalculationTool.handler({ radius: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('直径：10');
      expect(result.content[0].text).toContain('周长：31.415927');
      expect(result.content[0].text).toContain('面积：78.539816');
    });
  });

  describe('矩形计算测试', () => {
    test('正方形计算', async () => {
      const result = await rectangleCalculationTool.handler({ length: 4, width: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('面积：16');
      expect(result.content[0].text).toContain('周长：16');
      expect(result.content[0].text).toContain('对角线长度：5.656854');
    });

    test('长方形计算', async () => {
      const result = await rectangleCalculationTool.handler({ length: 6, width: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('面积：24');
      expect(result.content[0].text).toContain('周长：20');
      expect(result.content[0].text).toContain('对角线长度：7.211103');
    });
  });

  describe('三角形计算测试', () => {
    test('等边三角形', async () => {
      const result = await triangleCalculationTool.handler({ side_a: 3, side_b: 3, side_c: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('等边三角形');
      expect(result.content[0].text).toContain('周长：9');
      expect(result.content[0].text).toContain('面积：3.897114');
      expect(result.content[0].text).toContain('60.00°');
    });

    test('直角三角形', async () => {
      const result = await triangleCalculationTool.handler({ side_a: 3, side_b: 4, side_c: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('直角三角形');
      expect(result.content[0].text).toContain('周长：12');
      expect(result.content[0].text).toContain('面积：6');
      expect(result.content[0].text).toContain('90.00°');
    });

    test('等腰三角形', async () => {
      const result = await triangleCalculationTool.handler({ side_a: 5, side_b: 5, side_c: 6 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('等腰三角形');
      expect(result.content[0].text).toContain('周长：16');
    });

    test('无效三角形', async () => {
      const result = await triangleCalculationTool.handler({ side_a: 1, side_b: 2, side_c: 5 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('无法构成三角形');
    });
  });

  describe('梯形计算测试', () => {
    test('普通梯形', async () => {
      const result = await trapezoidCalculationTool.handler({ top_base: 4, bottom_base: 8, height: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('面积：30');
      expect(result.content[0].text).toContain('平均底边：6');
    });
  });

  describe('椭圆计算测试', () => {
    test('椭圆计算', async () => {
      const result = await ellipseCalculationTool.handler({ semi_major_axis: 5, semi_minor_axis: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('面积：47.123890');
      expect(result.content[0].text).toContain('周长（近似）');
      expect(result.content[0].text).toContain('离心率');
    });

    test('圆形（特殊椭圆）', async () => {
      const result = await ellipseCalculationTool.handler({ semi_major_axis: 4, semi_minor_axis: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('面积：50.265482');
      expect(result.content[0].text).toContain('离心率：0.000000');
    });
  });

  describe('球体计算测试', () => {
    test('单位球', async () => {
      const result = await sphereCalculationTool.handler({ radius: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('表面积：12.566371');
      expect(result.content[0].text).toContain('体积：4.188790');
    });

    test('半径为3的球', async () => {
      const result = await sphereCalculationTool.handler({ radius: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('表面积：113.097336');
      expect(result.content[0].text).toContain('体积：113.097336');
    });
  });

  describe('圆柱体计算测试', () => {
    test('圆柱体计算', async () => {
      const result = await cylinderCalculationTool.handler({ radius: 2, height: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('底面积：12.566371');
      expect(result.content[0].text).toContain('侧面积：62.831853');
      expect(result.content[0].text).toContain('表面积：87.964594');
      expect(result.content[0].text).toContain('体积：62.831853');
    });
  });

  describe('圆锥体计算测试', () => {
    test('圆锥体计算', async () => {
      const result = await coneCalculationTool.handler({ radius: 3, height: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('斜高：5.000000');
      expect(result.content[0].text).toContain('底面积：28.274334');
      expect(result.content[0].text).toContain('侧面积：47.123890');
      expect(result.content[0].text).toContain('表面积：75.398224');
      expect(result.content[0].text).toContain('体积：37.699112');
    });
  });

  describe('长方体计算测试', () => {
    test('正方体', async () => {
      const result = await cuboidCalculationTool.handler({ length: 3, width: 3, height: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('体积：27');
      expect(result.content[0].text).toContain('表面积：54');
      expect(result.content[0].text).toContain('体对角线：5.196152');
    });

    test('长方体', async () => {
      const result = await cuboidCalculationTool.handler({ length: 4, width: 3, height: 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('体积：24');
      expect(result.content[0].text).toContain('表面积：52');
      expect(result.content[0].text).toContain('体对角线：5.385165');
    });
  });

  describe('正多边形计算测试', () => {
    test('正三角形', async () => {
      const result = await regularPolygonTool.handler({ sides: 3, side_length: 6 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('正3边形');
      expect(result.content[0].text).toContain('周长：18');
      expect(result.content[0].text).toContain('中心角：120°');
      expect(result.content[0].text).toContain('内角：60°');
    });

    test('正方形', async () => {
      const result = await regularPolygonTool.handler({ sides: 4, side_length: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('正4边形');
      expect(result.content[0].text).toContain('周长：16');
      expect(result.content[0].text).toContain('面积：16.000000');
      expect(result.content[0].text).toContain('中心角：90°');
      expect(result.content[0].text).toContain('内角：90°');
    });

    test('正六边形', async () => {
      const result = await regularPolygonTool.handler({ sides: 6, side_length: 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('正6边形');
      expect(result.content[0].text).toContain('周长：12');
      expect(result.content[0].text).toContain('中心角：60°');
      expect(result.content[0].text).toContain('内角：120°');
    });
  });
});