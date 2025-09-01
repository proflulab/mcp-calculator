import { combinatoricsTools } from '../../src/modules/combinatorics.js';
import { ToolRegistration } from '../../src/types.js';

describe('Combinatorics Tools', () => {
  let factorialTool: ToolRegistration;
  let permutationTool: ToolRegistration;
  let combinationTool: ToolRegistration;
  let fibonacciTool: ToolRegistration;
  let fibonacciSequenceTool: ToolRegistration;
  let catalanTool: ToolRegistration;
  let bellNumberTool: ToolRegistration;
  let binomialCoefficientTool: ToolRegistration;

  beforeAll(() => {
    factorialTool = combinatoricsTools.find(tool => tool.name === 'factorial')!;
    permutationTool = combinatoricsTools.find(tool => tool.name === 'permutation')!;
    combinationTool = combinatoricsTools.find(tool => tool.name === 'combination')!;
    fibonacciTool = combinatoricsTools.find(tool => tool.name === 'fibonacci')!;
    fibonacciSequenceTool = combinatoricsTools.find(tool => tool.name === 'fibonacciSequence')!;
    catalanTool = combinatoricsTools.find(tool => tool.name === 'catalan')!;
    bellNumberTool = combinatoricsTools.find(tool => tool.name === 'bellNumber')!;
    binomialCoefficientTool = combinatoricsTools.find(tool => tool.name === 'binomialCoefficient')!;
  });

  describe('Factorial Tool', () => {
    it('should calculate factorial correctly', async () => {
      const result = await factorialTool.handler({ n: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('120');
    });

    it('should handle factorial of 0', async () => {
      const result = await factorialTool.handler({ n: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });

    it('should handle large numbers', async () => {
      const result = await factorialTool.handler({ n: 171 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('溢出');
    });
  });

  describe('Permutation Tool', () => {
    it('should calculate permutation correctly', async () => {
      const result = await permutationTool.handler({ n: 5, r: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('60');
    });

    it('should handle edge case where r = 0', async () => {
      const result = await permutationTool.handler({ n: 5, r: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });

    it('should handle error when r > n', async () => {
      const result = await permutationTool.handler({ n: 3, r: 5 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不能大于');
    });

    it('should handle large numbers', async () => {
      const result = await permutationTool.handler({ n: 171, r: 2 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('溢出');
    });
  });

  describe('Combination Tool', () => {
    it('should calculate combination correctly', async () => {
      const result = await combinationTool.handler({ n: 5, r: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('10');
    });

    it('should handle edge case where r = 0', async () => {
      const result = await combinationTool.handler({ n: 5, r: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });

    it('should handle error when r > n', async () => {
      const result = await combinationTool.handler({ n: 3, r: 5 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不能大于');
    });

    it('should handle large numbers', async () => {
      const result = await combinationTool.handler({ n: 171, r: 2 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('溢出');
    });
  });

  describe('Fibonacci Tool', () => {
    it('should calculate fibonacci numbers correctly', async () => {
      const result = await fibonacciTool.handler({ n: 10 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('55');
    });

    it('should handle fibonacci of 0', async () => {
      const result = await fibonacciTool.handler({ n: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('0');
    });

    it('should handle fibonacci of 1', async () => {
      const result = await fibonacciTool.handler({ n: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });

    it('should handle large numbers', async () => {
      const result = await fibonacciTool.handler({ n: 1500 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('过大');
    });
  });

  describe('Fibonacci Sequence Tool', () => {
    it('should generate fibonacci sequence correctly', async () => {
      const result = await fibonacciSequenceTool.handler({ n: 5 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('0, 1, 1, 2, 3');
    });

    it('should handle sequence of 1', async () => {
      const result = await fibonacciSequenceTool.handler({ n: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('0');
    });
  });

  describe('Catalan Tool', () => {
    it('should calculate catalan numbers correctly', async () => {
      const result = await catalanTool.handler({ n: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('14');
    });

    it('should handle catalan of 0', async () => {
      const result = await catalanTool.handler({ n: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });
  });

  describe('Bell Number Tool', () => {
    it('should calculate bell numbers correctly', async () => {
      const result = await bellNumberTool.handler({ n: 3 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('5');
    });

    it('should handle bell number of 0', async () => {
      const result = await bellNumberTool.handler({ n: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });
  });

  describe('Binomial Coefficient Tool', () => {
    it('should calculate binomial coefficient correctly', async () => {
      const result = await binomialCoefficientTool.handler({ n: 5, k: 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('10');
    });

    it('should handle edge case where k = 0', async () => {
      const result = await binomialCoefficientTool.handler({ n: 5, k: 0 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
    });

    it('should handle error when k > n', async () => {
      const result = await binomialCoefficientTool.handler({ n: 3, k: 5 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('不能大于');
    });

    it('should handle large numbers', async () => {
      const result = await binomialCoefficientTool.handler({ n: 171, k: 2 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('溢出');
    });
  });
});