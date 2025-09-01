/**
 * MCP服务器集成测试
 * 测试整个服务器的功能和工具注册
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { basicMathTools } from '../../src/modules/basicMath';
import { rootOperationTools } from '../../src/modules/rootOperations';
import { trigonometryTools } from '../../src/modules/trigonometry';
import { logarithmTools } from '../../src/modules/logarithm';
import { ToolRegistration } from '../../src/types';

describe('MCP服务器集成测试', () => {
  let server: McpServer;
  let allTools: ToolRegistration[];

  beforeAll(() => {
    // 创建服务器实例
    server = new McpServer({
      name: 'calculator',
      version: '1.0.0'
    });

    // 收集所有工具
    allTools = [
      ...basicMathTools,
      ...rootOperationTools,
      ...trigonometryTools,
      ...logarithmTools
    ];

    // 注册所有工具
    allTools.forEach(tool => {
      server.registerTool(
        tool.name,
        {
          title: tool.definition.title,
          description: tool.definition.description,
          inputSchema: tool.definition.inputSchema
        },
        tool.handler
      );
    });
  });

  afterAll(async () => {
    // 清理服务器
    await server.close();
  });

  describe('服务器初始化', () => {
    test('服务器应该正确初始化', () => {
      expect(server).toBeDefined();
      expect(server).toBeInstanceOf(McpServer);
    });

    test('应该注册所有预期的工具', () => {
      const expectedToolCount =
        basicMathTools.length +
        rootOperationTools.length +
        trigonometryTools.length +
        logarithmTools.length;

      expect(allTools.length).toBe(expectedToolCount);
      expect(allTools.length).toBe(31); // 6 + 4 + 18 + 3 = 31个工具
    });

    test('所有工具名称应该是唯一的', () => {
      const toolNames = allTools.map(tool => tool.name);
      const uniqueNames = new Set(toolNames);
      expect(uniqueNames.size).toBe(toolNames.length);
    });
  });

  describe('工具分类验证', () => {
    test('基础数学运算工具应该包含所有预期工具', () => {
      const expectedBasicMathTools = ['add', 'subtract', 'multiply', 'divide', 'modulo', 'power'];
      const actualBasicMathTools = basicMathTools.map(tool => tool.name);

      expectedBasicMathTools.forEach(toolName => {
        expect(actualBasicMathTools).toContain(toolName);
      });
    });

    test('根运算工具应该包含所有预期工具', () => {
      const expectedRootTools = ['sqrt', 'cbrt', 'nthRoot', 'abs'];
      const actualRootTools = rootOperationTools.map(tool => tool.name);

      expectedRootTools.forEach(toolName => {
        expect(actualRootTools).toContain(toolName);
      });
    });

    test('三角函数工具应该包含所有预期工具', () => {
      const expectedTrigTools = [
        'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2',
        'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
        'sec', 'csc', 'cot', 'degToRad', 'radToDeg'
      ];
      const actualTrigTools = trigonometryTools.map(tool => tool.name);

      expectedTrigTools.forEach(toolName => {
        expect(actualTrigTools).toContain(toolName);
      });
    });

    test('对数函数工具应该包含所有预期工具', () => {
      const expectedLogTools = ['ln', 'log10', 'log'];
      const actualLogTools = logarithmTools.map(tool => tool.name);

      expectedLogTools.forEach(toolName => {
        expect(actualLogTools).toContain(toolName);
      });
    });
  });

  describe('工具定义完整性验证', () => {
    test('所有工具应该有完整的定义', () => {
      allTools.forEach(tool => {
        // 验证工具基本结构
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('definition');
        expect(tool).toHaveProperty('handler');

        // 验证工具名称
        expect(typeof tool.name).toBe('string');
        expect(tool.name.length).toBeGreaterThan(0);

        // 验证工具定义
        expect(tool.definition).toHaveProperty('title');
        expect(tool.definition).toHaveProperty('description');
        expect(tool.definition).toHaveProperty('inputSchema');

        // 验证定义内容
        expect(typeof tool.definition.title).toBe('string');
        expect(typeof tool.definition.description).toBe('string');
        expect(typeof tool.definition.inputSchema).toBe('object');

        // 验证处理函数
        expect(typeof tool.handler).toBe('function');
      });
    });

    test('所有工具的输入模式应该有效', () => {
      allTools.forEach(tool => {
        const inputSchema = tool.definition.inputSchema;
        expect(inputSchema).toBeDefined();
        expect(typeof inputSchema).toBe('object');

        // 验证输入模式至少有一个参数
        const paramKeys = Object.keys(inputSchema);
        expect(paramKeys.length).toBeGreaterThan(0);

        // 验证每个参数都有有效的Zod类型
        paramKeys.forEach(key => {
          expect(inputSchema[key]).toBeDefined();
          expect(typeof inputSchema[key]).toBe('object');
        });
      });
    });
  });

  describe('端到端工具执行测试', () => {
    test('应该能够执行基础数学运算', async () => {
      const addTool = allTools.find(tool => tool.name === 'add')!;
      const result = await addTool.handler({ a: 5, b: 3 });

      expect(result).toHaveProperty('content');
      expect(Array.isArray(result.content)).toBe(true);
      expect(result.content[0]).toHaveProperty('type', 'text');
      expect(result.content[0].text).toContain('8');
      expect(result.isError).toBeFalsy();
    });

    test('应该能够执行根运算', async () => {
      const sqrtTool = allTools.find(tool => tool.name === 'sqrt')!;
      const result = await sqrtTool.handler({ a: 16 });

      expect(result).toHaveProperty('content');
      expect(result.content[0].text).toContain('4');
      expect(result.isError).toBeFalsy();
    });

    test('应该能够执行三角函数运算', async () => {
      const sinTool = allTools.find(tool => tool.name === 'sin')!;
      const result = await sinTool.handler({ angle: 0 });

      expect(result).toHaveProperty('content');
      expect(result.content[0].text).toContain('0');
      expect(result.isError).toBeFalsy();
    });

    test('应该能够执行对数运算', async () => {
      const lnTool = allTools.find(tool => tool.name === 'ln')!;
      const result = await lnTool.handler({ value: 1 });

      expect(result).toHaveProperty('content');
      expect(result.content[0].text).toContain('0');
      expect(result.isError).toBeFalsy();
    });
  });

  describe('错误处理集成测试', () => {
    test('除零错误应该被正确处理', async () => {
      const divideTool = allTools.find(tool => tool.name === 'divide')!;
      const result = await divideTool.handler({ a: 10, b: 0 });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('错误');
      expect(result.content[0].text).toContain('除数不能为零');
    });

    test('负数平方根错误应该被正确处理', async () => {
      const sqrtTool = allTools.find(tool => tool.name === 'sqrt')!;
      const result = await sqrtTool.handler({ a: -4 });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('错误');
      expect(result.content[0].text).toContain('负数不能开平方根');
    });

    test('反三角函数定义域错误应该被正确处理', async () => {
      const asinTool = allTools.find(tool => tool.name === 'asin')!;
      const result = await asinTool.handler({ value: 2 });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('错误');
      expect(result.content[0].text).toContain('-1到1之间');
    });

    test('对数函数定义域错误应该被正确处理', async () => {
      const lnTool = allTools.find(tool => tool.name === 'ln')!;
      const result = await lnTool.handler({ value: -1 });

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain('错误');
      expect(result.content[0].text).toContain('必须大于0');
    });
  });

  describe('响应格式一致性测试', () => {
    test('所有成功响应应该有一致的格式', async () => {
      const testCases = [
        { tool: 'add', params: { a: 1, b: 2 } },
        { tool: 'sqrt', params: { a: 4 } },
        { tool: 'sin', params: { angle: 0 } },
        { tool: 'ln', params: { value: 1 } }
      ];

      for (const testCase of testCases) {
        const tool = allTools.find(t => t.name === testCase.tool)!;
        const result = await tool.handler(testCase.params);

        // 验证响应结构
        expect(result).toHaveProperty('content');
        expect(Array.isArray(result.content)).toBe(true);
        expect(result.content.length).toBeGreaterThan(0);
        expect(result.content[0]).toHaveProperty('type', 'text');
        expect(result.content[0]).toHaveProperty('text');
        expect(typeof result.content[0].text).toBe('string');

        // 验证成功响应不应该有错误标记
        expect(result.isError).toBeFalsy();
      }
    });

    test('所有错误响应应该有一致的格式', async () => {
      const errorTestCases = [
        { tool: 'divide', params: { a: 1, b: 0 } },
        { tool: 'sqrt', params: { a: -1 } },
        { tool: 'asin', params: { value: 2 } },
        { tool: 'ln', params: { value: -1 } }
      ];

      for (const testCase of errorTestCases) {
        const tool = allTools.find(t => t.name === testCase.tool)!;
        const result = await tool.handler(testCase.params);

        // 验证错误响应结构
        expect(result).toHaveProperty('content');
        expect(Array.isArray(result.content)).toBe(true);
        expect(result.content.length).toBeGreaterThan(0);
        expect(result.content[0]).toHaveProperty('type', 'text');
        expect(result.content[0]).toHaveProperty('text');
        expect(typeof result.content[0].text).toBe('string');

        // 验证错误响应应该有错误标记
        expect(result.isError).toBe(true);
        expect(result.content[0].text).toContain('错误');
      }
    });
  });
});