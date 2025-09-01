import { z } from "zod";
import { ToolRegistration, createErrorResponse, createSuccessResponse } from "../types.js";

// 长度转换工具
const lengthConversionTool: ToolRegistration = {
  name: "length_conversion",
  definition: {
    title: "长度单位转换",
    description: "在不同长度单位之间进行转换",
    inputSchema: {
      value: z.number().describe("要转换的数值"),
      from_unit: z.enum(["mm", "cm", "m", "km", "inch", "ft", "yard", "mile"]).describe("源单位"),
      to_unit: z.enum(["mm", "cm", "m", "km", "inch", "ft", "yard", "mile"]).describe("目标单位")
    }
  },
  handler: async ({ value, from_unit, to_unit }:
    { value: number; from_unit: string; to_unit: string }) => {

    // 转换为米的系数
    const toMeter: { [key: string]: number } = {
      "mm": 0.001,
      "cm": 0.01,
      "m": 1,
      "km": 1000,
      "inch": 0.0254,
      "ft": 0.3048,
      "yard": 0.9144,
      "mile": 1609.344
    };

    const unitNames: { [key: string]: string } = {
      "mm": "毫米",
      "cm": "厘米",
      "m": "米",
      "km": "千米",
      "inch": "英寸",
      "ft": "英尺",
      "yard": "码",
      "mile": "英里"
    };

    // 先转换为米，再转换为目标单位
    const meters = value * toMeter[from_unit];
    const result = meters / toMeter[to_unit];

    return createSuccessResponse(
      `长度转换结果：\n` +
      `${value} ${unitNames[from_unit]} = ${result.toFixed(8)} ${unitNames[to_unit]}\n` +
      `转换公式：${value} × ${toMeter[from_unit]} ÷ ${toMeter[to_unit]} = ${result.toFixed(8)}`
    );
  }
};

// 重量转换工具
const weightConversionTool: ToolRegistration = {
  name: "weight_conversion",
  definition: {
    title: "重量单位转换",
    description: "在不同重量单位之间进行转换",
    inputSchema: {
      value: z.number().describe("要转换的数值"),
      from_unit: z.enum(["mg", "g", "kg", "t", "oz", "lb", "stone"]).describe("源单位"),
      to_unit: z.enum(["mg", "g", "kg", "t", "oz", "lb", "stone"]).describe("目标单位")
    }
  },
  handler: async ({ value, from_unit, to_unit }:
    { value: number; from_unit: string; to_unit: string }) => {

    // 转换为克的系数
    const toGram: { [key: string]: number } = {
      "mg": 0.001,
      "g": 1,
      "kg": 1000,
      "t": 1000000,
      "oz": 28.3495,
      "lb": 453.592,
      "stone": 6350.29
    };

    const unitNames: { [key: string]: string } = {
      "mg": "毫克",
      "g": "克",
      "kg": "千克",
      "t": "吨",
      "oz": "盎司",
      "lb": "磅",
      "stone": "英石"
    };

    // 先转换为克，再转换为目标单位
    const grams = value * toGram[from_unit];
    const result = grams / toGram[to_unit];

    return createSuccessResponse(
      `重量转换结果：\n` +
      `${value} ${unitNames[from_unit]} = ${result.toFixed(8)} ${unitNames[to_unit]}\n` +
      `转换公式：${value} × ${toGram[from_unit]} ÷ ${toGram[to_unit]} = ${result.toFixed(8)}`
    );
  }
};

// 温度转换工具
const temperatureConversionTool: ToolRegistration = {
  name: "temperature_conversion",
  definition: {
    title: "温度单位转换",
    description: "在摄氏度、华氏度和开尔文之间进行转换",
    inputSchema: {
      value: z.number().describe("要转换的温度值"),
      from_unit: z.enum(["celsius", "fahrenheit", "kelvin"]).describe("源单位"),
      to_unit: z.enum(["celsius", "fahrenheit", "kelvin"]).describe("目标单位")
    }
  },
  handler: async ({ value, from_unit, to_unit }:
    { value: number; from_unit: string; to_unit: string }) => {

    // 检查开尔文温度不能为负值
    if (from_unit === "kelvin" && value < 0) {
      return createErrorResponse("开尔文温度不能为负值！绝对零度是0K。");
    }

    const unitNames: { [key: string]: string } = {
      "celsius": "摄氏度",
      "fahrenheit": "华氏度",
      "kelvin": "开尔文"
    };

    const unitSymbols: { [key: string]: string } = {
      "celsius": "°C",
      "fahrenheit": "°F",
      "kelvin": "K"
    };

    let result: number;
    let formula: string;

    // 温度转换公式
    if (from_unit === to_unit) {
      result = value;
      formula = "相同单位，无需转换";
    } else if (from_unit === "celsius" && to_unit === "fahrenheit") {
      result = (value * 9 / 5) + 32;
      formula = `(${value} × 9/5) + 32 = ${result.toFixed(4)}`;
    } else if (from_unit === "celsius" && to_unit === "kelvin") {
      result = value + 273.15;
      formula = `${value} + 273.15 = ${result.toFixed(4)}`;
    } else if (from_unit === "fahrenheit" && to_unit === "celsius") {
      result = (value - 32) * 5 / 9;
      formula = `(${value} - 32) × 5/9 = ${result.toFixed(4)}`;
    } else if (from_unit === "fahrenheit" && to_unit === "kelvin") {
      result = (value - 32) * 5 / 9 + 273.15;
      formula = `(${value} - 32) × 5/9 + 273.15 = ${result.toFixed(4)}`;
    } else if (from_unit === "kelvin" && to_unit === "celsius") {
      result = value - 273.15;
      formula = `${value} - 273.15 = ${result.toFixed(4)}`;
    } else if (from_unit === "kelvin" && to_unit === "fahrenheit") {
      result = (value - 273.15) * 9 / 5 + 32;
      formula = `(${value} - 273.15) × 9/5 + 32 = ${result.toFixed(4)}`;
    } else {
      return createErrorResponse("不支持的温度单位转换！");
    }

    return createSuccessResponse(
      `温度转换结果：\n` +
      `${value}${unitSymbols[from_unit]} = ${result.toFixed(4)}${unitSymbols[to_unit]}\n` +
      `转换公式：${formula}`
    );
  }
};

// 面积转换工具
const areaConversionTool: ToolRegistration = {
  name: "area_conversion",
  definition: {
    title: "面积单位转换",
    description: "在不同面积单位之间进行转换",
    inputSchema: {
      value: z.number().describe("要转换的数值"),
      from_unit: z.enum(["mm2", "cm2", "m2", "km2", "hectare", "acre", "in2", "ft2", "yard2"]).describe("源单位"),
      to_unit: z.enum(["mm2", "cm2", "m2", "km2", "hectare", "acre", "in2", "ft2", "yard2"]).describe("目标单位")
    }
  },
  handler: async ({ value, from_unit, to_unit }:
    { value: number; from_unit: string; to_unit: string }) => {

    // 转换为平方米的系数
    const toSquareMeter: { [key: string]: number } = {
      "mm2": 0.000001,
      "cm2": 0.0001,
      "m2": 1,
      "km2": 1000000,
      "hectare": 10000,
      "acre": 4046.86,
      "in2": 0.00064516,
      "ft2": 0.092903,
      "yard2": 0.836127
    };

    const unitNames: { [key: string]: string } = {
      "mm2": "平方毫米",
      "cm2": "平方厘米",
      "m2": "平方米",
      "km2": "平方千米",
      "hectare": "公顷",
      "acre": "英亩",
      "in2": "平方英寸",
      "ft2": "平方英尺",
      "yard2": "平方码"
    };

    // 检查单位是否有效
    if (!toSquareMeter[from_unit] || !toSquareMeter[to_unit]) {
      return createErrorResponse("不支持的面积单位转换！");
    }

    // 先转换为平方米，再转换为目标单位
    const squareMeters = value * toSquareMeter[from_unit];
    const result = squareMeters / toSquareMeter[to_unit];

    return createSuccessResponse(
      `面积转换结果：\n` +
      `${value} ${unitNames[from_unit]} = ${result.toFixed(8)} ${unitNames[to_unit]}\n` +
      `转换公式：${value} × ${toSquareMeter[from_unit]} ÷ ${toSquareMeter[to_unit]} = ${result.toFixed(8)}`
    );
  }
};

// 体积转换工具
const volumeConversionTool: ToolRegistration = {
  name: "volume_conversion",
  definition: {
    title: "体积单位转换",
    description: "在不同体积单位之间进行转换",
    inputSchema: {
      value: z.number().describe("要转换的数值"),
      from_unit: z.enum(["ml", "l", "m3", "cm3", "in3", "ft3", "gallon_us", "gallon_uk", "quart", "pint"]).describe("源单位"),
      to_unit: z.enum(["ml", "l", "m3", "cm3", "in3", "ft3", "gallon_us", "gallon_uk", "quart", "pint"]).describe("目标单位")
    }
  },
  handler: async ({ value, from_unit, to_unit }:
    { value: number; from_unit: string; to_unit: string }) => {

    // 转换为升的系数
    const toLiter: { [key: string]: number } = {
      "ml": 0.001,
      "l": 1,
      "m3": 1000,
      "cm3": 0.001,
      "in3": 0.0163871,
      "ft3": 28.3168,
      "gallon_us": 3.78541,
      "gallon_uk": 4.54609,
      "quart": 0.946353,
      "pint": 0.473176
    };

    const unitNames: { [key: string]: string } = {
      "ml": "毫升",
      "l": "升",
      "m3": "立方米",
      "cm3": "立方厘米",
      "in3": "立方英寸",
      "ft3": "立方英尺",
      "gallon_us": "美制加仑",
      "gallon_uk": "英制加仑",
      "quart": "夸脱",
      "pint": "品脱"
    };

    // 检查单位是否有效
    if (!toLiter[from_unit] || !toLiter[to_unit]) {
      return createErrorResponse("不支持的体积单位转换！");
    }

    // 先转换为升，再转换为目标单位
    const liters = value * toLiter[from_unit];
    const result = liters / toLiter[to_unit];

    return createSuccessResponse(
      `体积转换结果：\n` +
      `${value} ${unitNames[from_unit]} = ${result.toFixed(8)} ${unitNames[to_unit]}\n` +
      `转换公式：${value} × ${toLiter[from_unit]} ÷ ${toLiter[to_unit]} = ${result.toFixed(8)}`
    );
  }
};

// 时间转换工具
const timeConversionTool: ToolRegistration = {
  name: "time_conversion",
  definition: {
    title: "时间单位转换",
    description: "在不同时间单位之间进行转换",
    inputSchema: {
      value: z.number().describe("要转换的数值"),
      from_unit: z.enum(["ms", "second", "minute", "hour", "day", "week", "month", "year"]).describe("源单位"),
      to_unit: z.enum(["ms", "second", "minute", "hour", "day", "week", "month", "year"]).describe("目标单位")
    }
  },
  handler: async ({ value, from_unit, to_unit }:
    { value: number; from_unit: string; to_unit: string }) => {

    // 转换为秒的系数
    const toSecond: { [key: string]: number } = {
      "ms": 0.001,
      "second": 1,
      "minute": 60,
      "hour": 3600,
      "day": 86400,
      "week": 604800,
      "month": 2629746, // 平均月份（30.44天）
      "year": 31556952  // 平均年份（365.25天）
    };

    const unitNames: { [key: string]: string } = {
      "ms": "毫秒",
      "second": "秒",
      "minute": "分钟",
      "hour": "小时",
      "day": "天",
      "week": "周",
      "month": "月",
      "year": "年"
    };

    // 检查单位是否有效
    if (!toSecond[from_unit] || !toSecond[to_unit]) {
      return createErrorResponse("不支持的时间单位转换！");
    }

    // 先转换为秒，再转换为目标单位
    const seconds = value * toSecond[from_unit];
    const result = seconds / toSecond[to_unit];

    return createSuccessResponse(
      `时间转换结果：\n` +
      `${value} ${unitNames[from_unit]} = ${result.toFixed(8)} ${unitNames[to_unit]}\n` +
      `转换公式：${value} × ${toSecond[from_unit]} ÷ ${toSecond[to_unit]} = ${result.toFixed(8)}`
    );
  }
};

// 速度转换工具
const speedConversionTool: ToolRegistration = {
  name: "speed_conversion",
  definition: {
    title: "速度单位转换",
    description: "在不同速度单位之间进行转换",
    inputSchema: {
      value: z.number().describe("要转换的数值"),
      from_unit: z.enum(["mps", "kmh", "mph", "fps", "knot"]).describe("源单位"),
      to_unit: z.enum(["mps", "kmh", "mph", "fps", "knot"]).describe("目标单位")
    }
  },
  handler: async ({ value, from_unit, to_unit }:
    { value: number; from_unit: string; to_unit: string }) => {

    // 转换为米/秒的系数
    const toMeterPerSecond: { [key: string]: number } = {
      "mps": 1,
      "kmh": 0.277778,
      "mph": 0.44704,
      "fps": 0.3048,
      "knot": 0.514444
    };

    const unitNames: { [key: string]: string } = {
      "mps": "米/秒",
      "kmh": "千米/小时",
      "mph": "英里/小时",
      "fps": "英尺/秒",
      "knot": "节"
    };

    // 检查单位是否有效
    if (!toMeterPerSecond[from_unit] || !toMeterPerSecond[to_unit]) {
      return createErrorResponse("不支持的速度单位转换！");
    }

    // 先转换为米/秒，再转换为目标单位
    const meterPerSecond = value * toMeterPerSecond[from_unit];
    const result = meterPerSecond / toMeterPerSecond[to_unit];

    return createSuccessResponse(
      `速度转换结果：\n` +
      `${value} ${unitNames[from_unit]} = ${result.toFixed(8)} ${unitNames[to_unit]}\n` +
      `转换公式：${value} × ${toMeterPerSecond[from_unit]} ÷ ${toMeterPerSecond[to_unit]} = ${result.toFixed(8)}`
    );
  }
};

export const conversionTools: ToolRegistration[] = [
  lengthConversionTool,
  weightConversionTool,
  temperatureConversionTool,
  areaConversionTool,
  volumeConversionTool,
  timeConversionTool,
  speedConversionTool
];