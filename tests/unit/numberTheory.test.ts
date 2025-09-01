import { numberTheoryTools } from '../../src/modules/numberTheory.js';
import { ToolRegistration } from '../../src/types.js';

describe('numberTheoryTools', () => {
  let tools: { [key: string]: ToolRegistration };

  beforeAll(() => {
    tools = {};
    numberTheoryTools.forEach(tool => {
      tools[tool.name] = tool;
    });
  });

  describe('gcdTool', () => {
    it('should calculate GCD of two numbers', async () => {
      const result = await tools.gcd.handler({ numbers: [12, 18] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('6');
    });

    it('should calculate GCD of multiple numbers', async () => {
      const result = await tools.gcd.handler({ numbers: [24, 36, 48] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('12');
    });
  });

  describe('lcmTool', () => {
    it('should calculate LCM of two numbers', async () => {
      const result = await tools.lcm.handler({ numbers: [12, 18] });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('36');
    });
  });

  describe('isPrimeTool', () => {
    it('should identify prime numbers', async () => {
      const result = await tools.isPrime.handler({ n: 17 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('素数');
    });

    it('should identify non-prime numbers', async () => {
      const result = await tools.isPrime.handler({ n: 15 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('不是素数');
    });

    it('should handle number 1 correctly', async () => {
      const result = await tools.isPrime.handler({ n: 1 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('不是素数');
      expect(result.content[0].text).toContain('既不是素数也不是合数');
    });

    it('should handle number 2 correctly', async () => {
      const result = await tools.isPrime.handler({ n: 2 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('是素数');
    });

    it('should identify even numbers as non-prime', async () => {
      const result = await tools.isPrime.handler({ n: 4 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('不是素数');
      expect(result.content[0].text).toContain('偶数');
    });
  });

  describe('primeFactorizationTool', () => {
    it('should factorize a composite number', async () => {
      const result = await tools.primeFactorization.handler({ n: 60 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('2');
      expect(result.content[0].text).toContain('3');
      expect(result.content[0].text).toContain('5');
    });
  });

  describe('eulerPhiTool', () => {
    it('should calculate Euler phi function', async () => {
      const result = await tools.eulerPhi.handler({ n: 9 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('6');
    });
  });

  describe('isPerfectNumberTool', () => {
    it('should identify perfect numbers', async () => {
      const result = await tools.isPerfectNumber.handler({ n: 6 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('完全数');
    });

    it('should identify non-perfect numbers', async () => {
      const result = await tools.isPerfectNumber.handler({ n: 8 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('不是完全数');
    });
  });

  describe('divisorCountTool', () => {
    it('should count divisors correctly', async () => {
      const result = await tools.divisorCount.handler({ n: 12 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('6');
    });
  });

  describe('divisorListTool', () => {
    it('should list all divisors', async () => {
      const result = await tools.divisorList.handler({ n: 12 });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1');
      expect(result.content[0].text).toContain('12');
    });
  });

  describe('错误处理测试', () => {
    it('should handle large numbers in prime factorization', async () => {
      const result = await tools.primeFactorization.handler({ n: Number.MAX_SAFE_INTEGER + 1 });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('数字过大，超出安全整数范围');
    });
  });
});