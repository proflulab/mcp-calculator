import { financialTools } from '../../src/modules/financial.js';
import { ToolRegistration } from '../../src/types.js';

describe('金融计算模块测试', () => {
  let compoundInterestTool: ToolRegistration;
  let presentValueAnnuityTool: ToolRegistration;
  let futureValueAnnuityTool: ToolRegistration;
  let loanPaymentTool: ToolRegistration;
  let netPresentValueTool: ToolRegistration;
  let internalRateOfReturnTool: ToolRegistration;
  let bondPriceTool: ToolRegistration;

  beforeAll(() => {
    compoundInterestTool = financialTools.find(tool => tool.name === 'compound_interest')!;
    presentValueAnnuityTool = financialTools.find(tool => tool.name === 'present_value_annuity')!;
    futureValueAnnuityTool = financialTools.find(tool => tool.name === 'future_value_annuity')!;
    loanPaymentTool = financialTools.find(tool => tool.name === 'loan_payment')!;
    netPresentValueTool = financialTools.find(tool => tool.name === 'net_present_value')!;
    internalRateOfReturnTool = financialTools.find(tool => tool.name === 'internal_rate_of_return')!;
    bondPriceTool = financialTools.find(tool => tool.name === 'bond_price')!;
  });

  describe('复利计算测试', () => {
    test('年复利计算', async () => {
      const result = await compoundInterestTool.handler({
        principal: 10000,
        annual_rate: 0.05,
        periods: 10,
        compounding_frequency: 1
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('未来价值');
      expect(result.content[0].text).toContain('16288.95');
    });

    test('月复利计算', async () => {
      const result = await compoundInterestTool.handler({
        principal: 1000,
        annual_rate: 0.06,
        periods: 1,
        compounding_frequency: 12
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('未来价值');
    });
  });

  describe('年金现值测试', () => {
    test('普通年金现值', async () => {
      const result = await presentValueAnnuityTool.handler({
        payment: 1000,
        periods: 10,
        interest_rate: 0.05
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('现值');
    });

    test('零利率年金', async () => {
      const result = await presentValueAnnuityTool.handler({
        payment: 1000,
        periods: 5,
        interest_rate: 0
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('5000');
    });
  });

  describe('年金未来值测试', () => {
    test('普通年金未来值', async () => {
      const result = await futureValueAnnuityTool.handler({
        payment: 1000,
        periods: 10,
        interest_rate: 0.05
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('未来值');
    });
  });

  describe('贷款月供测试', () => {
    test('等额本息贷款', async () => {
      const result = await loanPaymentTool.handler({
        loan_amount: 300000,
        annual_rate: 0.045,
        years: 30
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('月供金额');
    });

    test('零利率贷款', async () => {
      const result = await loanPaymentTool.handler({
        loan_amount: 12000,
        annual_rate: 0,
        years: 1
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('1000');
    });
  });

  describe('净现值测试', () => {
    test('正NPV项目', async () => {
      const result = await netPresentValueTool.handler({
        initial_investment: 10000,
        cash_flows: [3000, 4000, 5000, 6000],
        discount_rate: 0.1
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('净现值');
      expect(result.content[0].text).toContain('可行');
    });

    test('空现金流应返回错误', async () => {
      const result = await netPresentValueTool.handler({
        initial_investment: 10000,
        cash_flows: [],
        discount_rate: 0.1
      });
      expect(result.isError).toBeTruthy();
    });
  });

  describe('内部收益率测试', () => {
    test('正常IRR计算', async () => {
      const result = await internalRateOfReturnTool.handler({
        initial_investment: 10000,
        cash_flows: [3000, 4000, 5000, 6000],
        initial_guess: 0.1,
        tolerance: 0.000001,
        max_iterations: 100
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('IRR');
    });

    test('空现金流应返回错误', async () => {
      const result = await internalRateOfReturnTool.handler({
        initial_investment: 10000,
        cash_flows: [],
        initial_guess: 0.1,
        tolerance: 0.000001,
        max_iterations: 100
      });
      expect(result.isError).toBeTruthy();
    });
  });

  describe('债券价格测试', () => {
    test('平价债券', async () => {
      const result = await bondPriceTool.handler({
        face_value: 1000,
        coupon_rate: 0.05,
        market_rate: 0.05,
        years_to_maturity: 10,
        payments_per_year: 1
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('债券价格');
      expect(result.content[0].text).toContain('1000');
    });

    test('零息债券', async () => {
      const result = await bondPriceTool.handler({
        face_value: 1000,
        coupon_rate: 0,
        market_rate: 0.05,
        years_to_maturity: 10,
        payments_per_year: 1
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('债券价格');
    });

    test('零市场利率债券价格计算', async () => {
      const result = await bondPriceTool.handler({
        face_value: 1000,
        coupon_rate: 0.05,
        market_rate: 0,
        years_to_maturity: 5,
        payments_per_year: 1
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('债券价格');
    });

    test('溢价债券价格计算', async () => {
      const result = await bondPriceTool.handler({
        face_value: 1000,
        coupon_rate: 0.06,
        market_rate: 0.04,
        years_to_maturity: 5,
        payments_per_year: 1
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('(溢价)');
    });
  });

  describe('错误处理测试', () => {
    test('NPV空现金流数组', async () => {
      const result = await netPresentValueTool.handler({
        cash_flows: [],
        discount_rate: 0.1
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('现金流数组不能为空');
    });

    test('IRR空现金流数组', async () => {
      const result = await internalRateOfReturnTool.handler({
        cash_flows: []
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('现金流数组不能为空');
    });
  });

  describe('边界情况和错误处理测试', () => {
    test('年金未来值 - 零利率情况', async () => {
      const result = await futureValueAnnuityTool.handler({
        payment: 1000,
        periods: 5,
        interest_rate: 0
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('零利率');
    });

    test('净现值计算 - 负NPV情况', async () => {
      const result = await netPresentValueTool.handler({
        initial_investment: 10000,
        cash_flows: [1000, 1000, 1000],
        discount_rate: 0.2
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('不可行');
    });

    test('内部收益率计算 - 导数接近零的情况', async () => {
      const result = await internalRateOfReturnTool.handler({
        initial_investment: 1000,
        cash_flows: [0, 0, 0, 0, 0],
        initial_guess: 0.1,
        tolerance: 0.000001,
        max_iterations: 100
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('导数接近零');
    });

    test('内部收益率计算 - 未收敛情况', async () => {
      const result = await internalRateOfReturnTool.handler({
        initial_investment: 1000,
        cash_flows: [100, 200, 300],
        initial_guess: 0.1,
        tolerance: 0.000001,
        max_iterations: 1
      });
      expect(result.isError).toBeTruthy();
      expect(result.content[0].text).toContain('未收敛');
    });

    test('内部收益率计算 - 负IRR情况', async () => {
      const result = await internalRateOfReturnTool.handler({
        initial_investment: 10000,
        cash_flows: [100, 200, 300],
        initial_guess: 0.1,
        tolerance: 0.000001,
        max_iterations: 100
      });
      expect(result.isError).toBeFalsy();
      expect(result.content[0].text).toContain('不可行');
    });
  });
});
