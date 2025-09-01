/**
 * MCP Calculator 性能测试
 * 测试计算器在高负载下的性能表现
 */

import { basicMathTools } from '../../src/modules/basicMath';
import { rootOperationTools } from '../../src/modules/rootOperations';
import { trigonometryTools } from '../../src/modules/trigonometry';
import { logarithmTools } from '../../src/modules/logarithm';
import { ToolRegistration } from '../../src/types';

describe('MCP Calculator 性能测试', () => {
  let allTools: ToolRegistration[];

  beforeAll(() => {
    allTools = [
      ...basicMathTools,
      ...rootOperationTools,
      ...trigonometryTools,
      ...logarithmTools
    ];
  });

  describe('单个工具性能测试', () => {
    test('加法运算性能测试', async () => {
      const addTool = allTools.find(tool => tool.name === 'add')!;
      const iterations = 10000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        await addTool.handler({ a: Math.random() * 1000, b: Math.random() * 1000 });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / iterations;

      console.log(`加法运算 ${iterations} 次，总时间: ${totalTime.toFixed(2)}ms，平均时间: ${avgTime.toFixed(4)}ms`);

      // 期望平均每次运算时间小于1ms
      expect(avgTime).toBeLessThan(1);
    });

    test('乘法运算性能测试', async () => {
      const multiplyTool = allTools.find(tool => tool.name === 'multiply')!;
      const iterations = 10000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        await multiplyTool.handler({ a: Math.random() * 100, b: Math.random() * 100 });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / iterations;

      console.log(`乘法运算 ${iterations} 次，总时间: ${totalTime.toFixed(2)}ms，平均时间: ${avgTime.toFixed(4)}ms`);

      expect(avgTime).toBeLessThan(1);
    });

    test('幂运算性能测试', async () => {
      const powerTool = allTools.find(tool => tool.name === 'power')!;
      const iterations = 5000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        await powerTool.handler({ base: Math.random() * 10 + 1, exponent: Math.random() * 5 + 1 });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / iterations;

      console.log(`幂运算 ${iterations} 次，总时间: ${totalTime.toFixed(2)}ms，平均时间: ${avgTime.toFixed(4)}ms`);

      // 幂运算相对复杂，允许更长时间
      expect(avgTime).toBeLessThan(2);
    });

    test('三角函数性能测试', async () => {
      const sinTool = allTools.find(tool => tool.name === 'sin')!;
      const cosTool = allTools.find(tool => tool.name === 'cos')!;
      const tanTool = allTools.find(tool => tool.name === 'tan')!;

      const iterations = 5000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        const angle = Math.random() * Math.PI * 2;
        await sinTool.handler({ angle });
        await cosTool.handler({ angle });
        await tanTool.handler({ angle });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / (iterations * 3);

      console.log(`三角函数运算 ${iterations * 3} 次，总时间: ${totalTime.toFixed(2)}ms，平均时间: ${avgTime.toFixed(4)}ms`);

      expect(avgTime).toBeLessThan(1);
    });

    test('对数函数性能测试', async () => {
      const lnTool = allTools.find(tool => tool.name === 'ln')!;
      const log10Tool = allTools.find(tool => tool.name === 'log10')!;

      const iterations = 5000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        const value = Math.random() * 1000 + 1;
        await lnTool.handler({ value });
        await log10Tool.handler({ value });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / (iterations * 2);

      console.log(`对数函数运算 ${iterations * 2} 次，总时间: ${totalTime.toFixed(2)}ms，平均时间: ${avgTime.toFixed(4)}ms`);

      expect(avgTime).toBeLessThan(1);
    });
  });

  describe('并发性能测试', () => {
    test('并发加法运算测试', async () => {
      const addTool = allTools.find(tool => tool.name === 'add')!;
      const concurrentOperations = 1000;
      const startTime = performance.now();

      const promises = Array.from({ length: concurrentOperations }, () =>
        addTool.handler({ a: Math.random() * 1000, b: Math.random() * 1000 })
      );

      const results = await Promise.all(promises);
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      console.log(`并发加法运算 ${concurrentOperations} 次，总时间: ${totalTime.toFixed(2)}ms`);

      // 验证所有操作都成功完成
      expect(results.length).toBe(concurrentOperations);
      results.forEach(result => {
        expect(result.isError).toBeFalsy();
      });

      // 并发操作应该在合理时间内完成
      expect(totalTime).toBeLessThan(5000); // 5秒内完成
    });

    test('混合并发运算测试', async () => {
      const operations = [
        { tool: 'add', params: { a: 10, b: 5 } },
        { tool: 'multiply', params: { a: 3, b: 4 } },
        { tool: 'sqrt', params: { a: 16 } },
        { tool: 'sin', params: { angle: Math.PI / 2 } },
        { tool: 'ln', params: { value: Math.E } }
      ];

      const concurrentSets = 200;
      const startTime = performance.now();

      const promises = Array.from({ length: concurrentSets }, () => {
        return Promise.all(operations.map(op => {
          const tool = allTools.find(t => t.name === op.tool)!;
          return tool.handler(op.params);
        }));
      });

      const results = await Promise.all(promises);
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const totalOperations = concurrentSets * operations.length;

      console.log(`混合并发运算 ${totalOperations} 次，总时间: ${totalTime.toFixed(2)}ms`);

      // 验证所有操作都成功完成
      expect(results.length).toBe(concurrentSets);
      results.forEach(resultSet => {
        expect(resultSet.length).toBe(operations.length);
        resultSet.forEach(result => {
          expect(result.isError).toBeFalsy();
        });
      });

      expect(totalTime).toBeLessThan(10000); // 10秒内完成
    });
  });

  describe('内存使用测试', () => {
    test('大量运算后内存使用情况', async () => {
      const addTool = allTools.find(tool => tool.name === 'add')!;
      const iterations = 50000;

      // 记录初始内存使用
      const initialMemory = process.memoryUsage();

      // 执行大量运算
      for (let i = 0; i < iterations; i++) {
        await addTool.handler({ a: Math.random() * 1000, b: Math.random() * 1000 });

        // 每1000次运算检查一次内存
        if (i % 1000 === 0 && global.gc) {
          global.gc(); // 强制垃圾回收（如果可用）
        }
      }

      // 记录最终内存使用
      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;

      console.log(`执行 ${iterations} 次运算后内存增长: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`);
      console.log(`初始堆内存: ${(initialMemory.heapUsed / 1024 / 1024).toFixed(2)}MB`);
      console.log(`最终堆内存: ${(finalMemory.heapUsed / 1024 / 1024).toFixed(2)}MB`);

      // 内存增长应该在合理范围内（小于50MB）
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });
  });

  describe('错误处理性能测试', () => {
    test('大量错误处理性能测试', async () => {
      const divideTool = allTools.find(tool => tool.name === 'divide')!;
      const iterations = 5000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        // 故意触发除零错误
        await divideTool.handler({ a: Math.random() * 100, b: 0 });
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / iterations;

      console.log(`错误处理 ${iterations} 次，总时间: ${totalTime.toFixed(2)}ms，平均时间: ${avgTime.toFixed(4)}ms`);

      // 错误处理不应该显著影响性能
      expect(avgTime).toBeLessThan(2);
    });

    test('混合成功和错误操作性能测试', async () => {
      const divideTool = allTools.find(tool => tool.name === 'divide')!;
      const sqrtTool = allTools.find(tool => tool.name === 'sqrt')!;

      const iterations = 2000;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        // 50%成功操作，50%错误操作
        if (i % 2 === 0) {
          await divideTool.handler({ a: 10, b: 2 }); // 成功
          await sqrtTool.handler({ a: 16 }); // 成功
        } else {
          await divideTool.handler({ a: 10, b: 0 }); // 错误
          await sqrtTool.handler({ a: -4 }); // 错误
        }
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / (iterations * 2);

      console.log(`混合成功/错误操作 ${iterations * 2} 次，总时间: ${totalTime.toFixed(2)}ms，平均时间: ${avgTime.toFixed(4)}ms`);

      expect(avgTime).toBeLessThan(2);
    });
  });

  describe('压力测试', () => {
    test('极限并发压力测试', async () => {
      const tools = [
        { name: 'add', params: { a: 1, b: 2 } },
        { name: 'multiply', params: { a: 3, b: 4 } },
        { name: 'power', params: { base: 2, exponent: 3 } },
        { name: 'sqrt', params: { a: 25 } },
        { name: 'sin', params: { angle: Math.PI / 4 } },
        { name: 'ln', params: { value: 10 } }
      ];

      const concurrentOperations = 5000;
      const startTime = performance.now();

      const promises = Array.from({ length: concurrentOperations }, (_, i) => {
        const operation = tools[i % tools.length];
        const tool = allTools.find(t => t.name === operation.name)!;
        return tool.handler(operation.params);
      });

      const results = await Promise.all(promises);
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      console.log(`极限并发压力测试 ${concurrentOperations} 次操作，总时间: ${totalTime.toFixed(2)}ms`);

      // 验证所有操作都成功完成
      expect(results.length).toBe(concurrentOperations);
      results.forEach(result => {
        expect(result.isError).toBeFalsy();
      });

      // 压力测试应该在合理时间内完成
      expect(totalTime).toBeLessThan(30000); // 30秒内完成
    });

    test('长时间运行稳定性测试', async () => {
      const addTool = allTools.find(tool => tool.name === 'add')!;
      const testDuration = 5000; // 5秒
      const startTime = performance.now();
      let operationCount = 0;
      let errorCount = 0;

      while (performance.now() - startTime < testDuration) {
        try {
          const result = await addTool.handler({
            a: Math.random() * 1000,
            b: Math.random() * 1000
          });

          if (result.isError) {
            errorCount++;
          }
          operationCount++;
        } catch (error) {
          errorCount++;
          operationCount++;
        }
      }

      const actualDuration = performance.now() - startTime;
      const operationsPerSecond = (operationCount / actualDuration) * 1000;

      console.log(`长时间运行测试: ${actualDuration.toFixed(2)}ms内完成 ${operationCount} 次操作`);
      console.log(`操作速率: ${operationsPerSecond.toFixed(2)} 操作/秒`);
      console.log(`错误率: ${((errorCount / operationCount) * 100).toFixed(2)}%`);

      // 验证性能指标
      expect(operationCount).toBeGreaterThan(1000); // 至少完成1000次操作
      expect(operationsPerSecond).toBeGreaterThan(200); // 至少200操作/秒
      expect(errorCount).toBe(0); // 不应该有意外错误
    });
  });
});