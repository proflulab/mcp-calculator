import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 复利计算工具
const compoundInterestTool: ToolRegistration = {
  name: "compound_interest",
  definition: {
    title: "复利计算",
    description: "计算复利投资的未来价值",
    inputSchema: {
      principal: z.number().positive().describe("本金"),
      annual_rate: z.number().min(0).max(1).describe("年利率（小数形式，如0.05表示5%）"),
      periods: z.number().positive().describe("投资期数"),
      compounding_frequency: z.number().int().positive().default(1).describe("每年复利次数（1=年复利，4=季复利，12=月复利）")
    }
  },
  handler: async ({ principal, annual_rate, periods, compounding_frequency }:
    { principal: number; annual_rate: number; periods: number; compounding_frequency: number }) => {

    const futureValue = principal * Math.pow(1 + annual_rate / compounding_frequency, compounding_frequency * periods);
    const totalInterest = futureValue - principal;
    const effectiveRate = Math.pow(1 + annual_rate / compounding_frequency, compounding_frequency) - 1;

    return createSuccessResponse(
      `复利计算结果：\n` +
      `本金：${principal.toFixed(2)}\n` +
      `年利率：${(annual_rate * 100).toFixed(2)}%\n` +
      `投资期限：${periods} 年\n` +
      `复利频率：每年 ${compounding_frequency} 次\n` +
      `有效年利率：${(effectiveRate * 100).toFixed(4)}%\n` +
      `未来价值：${futureValue.toFixed(2)}\n` +
      `总利息：${totalInterest.toFixed(2)}`
    );
  }
};

// 年金现值计算工具
const presentValueAnnuityTool: ToolRegistration = {
  name: "present_value_annuity",
  definition: {
    title: "年金现值",
    description: "计算普通年金的现值",
    inputSchema: {
      payment: z.number().positive().describe("每期支付金额"),
      periods: z.number().int().positive().describe("支付期数"),
      interest_rate: z.number().positive().describe("每期利率（小数形式）")
    }
  },
  handler: async ({ payment, periods, interest_rate }:
    { payment: number; periods: number; interest_rate: number }) => {

    if (interest_rate === 0) {
      const presentValue = payment * periods;
      return createSuccessResponse(
        `年金现值计算结果（零利率）：\n` +
        `每期支付：${payment.toFixed(2)}\n` +
        `支付期数：${periods}\n` +
        `现值：${presentValue.toFixed(2)}`
      );
    }

    const presentValue = payment * (1 - Math.pow(1 + interest_rate, -periods)) / interest_rate;
    const totalPayments = payment * periods;
    const discount = totalPayments - presentValue;

    return createSuccessResponse(
      `年金现值计算结果：\n` +
      `每期支付：${payment.toFixed(2)}\n` +
      `支付期数：${periods}\n` +
      `每期利率：${(interest_rate * 100).toFixed(4)}%\n` +
      `现值：${presentValue.toFixed(2)}\n` +
      `总支付额：${totalPayments.toFixed(2)}\n` +
      `折现金额：${discount.toFixed(2)}`
    );
  }
};

// 年金未来值计算工具
const futureValueAnnuityTool: ToolRegistration = {
  name: "future_value_annuity",
  definition: {
    title: "年金未来值",
    description: "计算普通年金的未来值",
    inputSchema: {
      payment: z.number().positive().describe("每期支付金额"),
      periods: z.number().int().positive().describe("支付期数"),
      interest_rate: z.number().positive().describe("每期利率（小数形式）")
    }
  },
  handler: async ({ payment, periods, interest_rate }:
    { payment: number; periods: number; interest_rate: number }) => {

    if (interest_rate === 0) {
      const futureValue = payment * periods;
      return createSuccessResponse(
        `年金未来值计算结果（零利率）：\n` +
        `每期支付：${payment.toFixed(2)}\n` +
        `支付期数：${periods}\n` +
        `未来值：${futureValue.toFixed(2)}`
      );
    }

    const futureValue = payment * (Math.pow(1 + interest_rate, periods) - 1) / interest_rate;
    const totalPayments = payment * periods;
    const interest = futureValue - totalPayments;

    return createSuccessResponse(
      `年金未来值计算结果：\n` +
      `每期支付：${payment.toFixed(2)}\n` +
      `支付期数：${periods}\n` +
      `每期利率：${(interest_rate * 100).toFixed(4)}%\n` +
      `未来值：${futureValue.toFixed(2)}\n` +
      `总支付额：${totalPayments.toFixed(2)}\n` +
      `利息收入：${interest.toFixed(2)}`
    );
  }
};

// 贷款月供计算工具
const loanPaymentTool: ToolRegistration = {
  name: "loan_payment",
  definition: {
    title: "贷款月供计算",
    description: "计算等额本息贷款的月供金额",
    inputSchema: {
      loan_amount: z.number().positive().describe("贷款本金"),
      annual_rate: z.number().positive().describe("年利率（小数形式）"),
      years: z.number().positive().describe("贷款年限")
    }
  },
  handler: async ({ loan_amount, annual_rate, years }:
    { loan_amount: number; annual_rate: number; years: number }) => {

    const monthlyRate = annual_rate / 12;
    const totalPayments = years * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = loan_amount / totalPayments;
      return createSuccessResponse(
        `贷款月供计算结果（零利率）：\n` +
        `贷款本金：${loan_amount.toFixed(2)}\n` +
        `贷款年限：${years} 年\n` +
        `月供金额：${monthlyPayment.toFixed(2)}\n` +
        `总还款额：${loan_amount.toFixed(2)}`
      );
    }

    const monthlyPayment = loan_amount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - loan_amount;

    return createSuccessResponse(
      `贷款月供计算结果：\n` +
      `贷款本金：${loan_amount.toFixed(2)}\n` +
      `年利率：${(annual_rate * 100).toFixed(4)}%\n` +
      `贷款年限：${years} 年（${totalPayments} 期）\n` +
      `月供金额：${monthlyPayment.toFixed(2)}\n` +
      `总还款额：${totalAmount.toFixed(2)}\n` +
      `总利息：${totalInterest.toFixed(2)}`
    );
  }
};

// 净现值计算工具
const netPresentValueTool: ToolRegistration = {
  name: "net_present_value",
  definition: {
    title: "净现值计算",
    description: "计算投资项目的净现值（NPV）",
    inputSchema: {
      initial_investment: z.number().positive().describe("初始投资额"),
      cash_flows: z.array(z.number()).describe("各期现金流"),
      discount_rate: z.number().positive().describe("折现率（小数形式）")
    }
  },
  handler: async ({ initial_investment, cash_flows, discount_rate }:
    { initial_investment: number; cash_flows: number[]; discount_rate: number }) => {

    if (cash_flows.length === 0) {
      return createErrorResponse("现金流数组不能为空！");
    }

    let presentValue = 0;
    const detailedFlows: string[] = [];

    for (let i = 0; i < cash_flows.length; i++) {
      const pv = cash_flows[i] / Math.pow(1 + discount_rate, i + 1);
      presentValue += pv;
      detailedFlows.push(`第${i + 1}期：${cash_flows[i].toFixed(2)} / (1 + ${(discount_rate * 100).toFixed(2)}%)^${i + 1} = ${pv.toFixed(2)}`);
    }

    const npv = presentValue - initial_investment;
    const profitabilityIndex = presentValue / initial_investment;

    return createSuccessResponse(
      `净现值计算结果：\n` +
      `初始投资：${initial_investment.toFixed(2)}\n` +
      `折现率：${(discount_rate * 100).toFixed(2)}%\n` +
      `现金流现值明细：\n${detailedFlows.join('\n')}\n` +
      `现金流现值总和：${presentValue.toFixed(2)}\n` +
      `净现值（NPV）：${npv.toFixed(2)}\n` +
      `盈利指数：${profitabilityIndex.toFixed(4)}\n` +
      `投资建议：${npv > 0 ? '可行（NPV > 0）' : '不可行（NPV ≤ 0）'}`
    );
  }
};

// 内部收益率计算工具（牛顿法近似）
const internalRateOfReturnTool: ToolRegistration = {
  name: "internal_rate_of_return",
  definition: {
    title: "内部收益率计算",
    description: "计算投资项目的内部收益率（IRR）",
    inputSchema: {
      initial_investment: z.number().positive().describe("初始投资额"),
      cash_flows: z.array(z.number()).describe("各期现金流"),
      initial_guess: z.number().default(0.1).describe("初始猜测值"),
      tolerance: z.number().positive().default(0.000001).describe("容差"),
      max_iterations: z.number().int().positive().default(100).describe("最大迭代次数")
    }
  },
  handler: async ({ initial_investment, cash_flows, initial_guess, tolerance, max_iterations }:
    { initial_investment: number; cash_flows: number[]; initial_guess: number; tolerance: number; max_iterations: number }) => {

    if (cash_flows.length === 0) {
      return createErrorResponse("现金流数组不能为空！");
    }

    // NPV函数
    const npvFunction = (rate: number): number => {
      let npv = -initial_investment;
      for (let i = 0; i < cash_flows.length; i++) {
        npv += cash_flows[i] / Math.pow(1 + rate, i + 1);
      }
      return npv;
    };

    // NPV的导数
    const npvDerivative = (rate: number): number => {
      let derivative = 0;
      for (let i = 0; i < cash_flows.length; i++) {
        derivative -= (i + 1) * cash_flows[i] / Math.pow(1 + rate, i + 2);
      }
      return derivative;
    };

    let rate = initial_guess;
    let iterations = 0;

    for (let i = 0; i < max_iterations; i++) {
      const npv = npvFunction(rate);
      const derivative = npvDerivative(rate);

      if (Math.abs(derivative) < 1e-15) {
        return createErrorResponse("导数接近零，无法继续迭代！");
      }

      const newRate = rate - npv / derivative;
      iterations = i + 1;

      if (Math.abs(newRate - rate) < tolerance) {
        const finalNPV = npvFunction(newRate);
        return createSuccessResponse(
          `内部收益率计算结果：\n` +
          `IRR：${(newRate * 100).toFixed(4)}%\n` +
          `迭代次数：${iterations}\n` +
          `验证NPV：${finalNPV.toFixed(6)}\n` +
          `投资建议：${newRate > 0 ? '可行（IRR > 0）' : '不可行（IRR ≤ 0）'}`
        );
      }

      rate = newRate;

      // 防止负利率过小
      if (rate < -0.99) {
        rate = -0.99;
      }
    }

    return createErrorResponse(`IRR计算在 ${max_iterations} 次迭代后未收敛！最后结果：${(rate * 100).toFixed(4)}%`);
  }
};

// 债券价格计算工具
const bondPriceTool: ToolRegistration = {
  name: "bond_price",
  definition: {
    title: "债券价格计算",
    description: "计算债券的理论价格",
    inputSchema: {
      face_value: z.number().positive().describe("面值"),
      coupon_rate: z.number().min(0).describe("票面利率（小数形式）"),
      market_rate: z.number().positive().describe("市场利率（小数形式）"),
      years_to_maturity: z.number().positive().describe("到期年限"),
      payments_per_year: z.number().int().positive().default(1).describe("每年付息次数")
    }
  },
  handler: async ({ face_value, coupon_rate, market_rate, years_to_maturity, payments_per_year }:
    { face_value: number; coupon_rate: number; market_rate: number; years_to_maturity: number; payments_per_year: number }) => {

    const totalPeriods = years_to_maturity * payments_per_year;
    const periodCouponRate = coupon_rate / payments_per_year;
    const periodMarketRate = market_rate / payments_per_year;
    const couponPayment = face_value * periodCouponRate;

    // 计算利息现值
    let interestPV = 0;
    if (couponPayment > 0) {
      if (periodMarketRate === 0) {
        interestPV = couponPayment * totalPeriods;
      } else {
        interestPV = couponPayment * (1 - Math.pow(1 + periodMarketRate, -totalPeriods)) / periodMarketRate;
      }
    }

    // 计算本金现值
    const principalPV = face_value / Math.pow(1 + periodMarketRate, totalPeriods);

    const bondPrice = interestPV + principalPV;
    const premium = bondPrice - face_value;
    const yieldToMaturity = market_rate;

    return createSuccessResponse(
      `债券价格计算结果：\n` +
      `面值：${face_value.toFixed(2)}\n` +
      `票面利率：${(coupon_rate * 100).toFixed(4)}%\n` +
      `市场利率：${(market_rate * 100).toFixed(4)}%\n` +
      `到期年限：${years_to_maturity} 年\n` +
      `付息频率：每年 ${payments_per_year} 次\n` +
      `每期利息：${couponPayment.toFixed(2)}\n` +
      `利息现值：${interestPV.toFixed(2)}\n` +
      `本金现值：${principalPV.toFixed(2)}\n` +
      `债券价格：${bondPrice.toFixed(2)}\n` +
      `溢价/折价：${premium.toFixed(2)} ${premium > 0 ? '(溢价)' : premium < 0 ? '(折价)' : '(平价)'}\n` +
      `到期收益率：${(yieldToMaturity * 100).toFixed(4)}%`
    );
  }
};

export const financialTools: ToolRegistration[] = [
  compoundInterestTool,
  presentValueAnnuityTool,
  futureValueAnnuityTool,
  loanPaymentTool,
  netPresentValueTool,
  internalRateOfReturnTool,
  bondPriceTool
];