#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建服务器实例
const server = new McpServer({
  name: "calculator",
  version: "1.0.0"
});

// 注册加法工具
server.registerTool(
  "add",
  {
    title: "加法运算",
    description: "执行两个数字的加法运算",
    inputSchema: {
      a: z.number().describe("第一个数字"),
      b: z.number().describe("第二个数字")
    }
  },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `加法运算结果：${a} + ${b} = ${a + b}`
    }]
  })
);

// 注册减法工具
server.registerTool(
  "subtract",
  {
    title: "减法运算",
    description: "执行两个数字的减法运算",
    inputSchema: {
      a: z.number().describe("被减数"),
      b: z.number().describe("减数")
    }
  },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `减法运算结果：${a} - ${b} = ${a - b}`
    }]
  })
);

// 注册乘法工具
server.registerTool(
  "multiply",
  {
    title: "乘法运算",
    description: "执行两个数字的乘法运算",
    inputSchema: {
      a: z.number().describe("第一个数字"),
      b: z.number().describe("第二个数字")
    }
  },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `乘法运算结果：${a} × ${b} = ${a * b}`
    }]
  })
);

// 注册除法工具
server.registerTool(
  "divide",
  {
    title: "除法运算",
    description: "执行两个数字的除法运算",
    inputSchema: {
      a: z.number().describe("被除数"),
      b: z.number().describe("除数")
    }
  },
  async ({ a, b }) => {
    if (b === 0) {
      return {
        content: [{
          type: "text",
          text: "错误：除数不能为零！"
        }],
        isError: true
      };
    }
    return {
      content: [{
        type: "text",
        text: `除法运算结果：${a} ÷ ${b} = ${a / b}`
      }]
    };
  }
);

// 注册求余运算工具
server.registerTool(
  "modulo",
  {
    title: "求余运算",
    description: "计算两个数的余数",
    inputSchema: {
      a: z.number().describe("被除数"),
      b: z.number().describe("除数")
    }
  },
  async ({ a, b }) => {
    if (b === 0) {
      return {
        content: [{
          type: "text",
          text: "错误：除数不能为零！"
        }],
        isError: true
      };
    }
    return {
      content: [{
        type: "text",
        text: `求余运算结果：${a} % ${b} = ${a % b}`
      }]
    };
  }
);

// 注册幂运算工具
server.registerTool(
  "power",
  {
    title: "幂运算",
    description: "计算a的b次方",
    inputSchema: {
      a: z.number().describe("底数"),
      b: z.number().describe("指数")
    }
  },
  async ({ a, b }) => ({
    content: [{
      type: "text",
      text: `幂运算结果：${a}^${b} = ${Math.pow(a, b)}`
    }]
  })
);

// 注册平方根工具
server.registerTool(
  "sqrt",
  {
    title: "平方根",
    description: "计算数字的平方根",
    inputSchema: {
      a: z.number().describe("被开方数")
    }
  },
  async ({ a }) => {
    if (a < 0) {
      return {
        content: [{
          type: "text",
          text: "错误：负数不能开平方根！"
        }],
        isError: true
      };
    }
    return {
      content: [{
        type: "text",
        text: `平方根结果：√${a} = ${Math.sqrt(a)}`
      }]
    };
  }
);

// 注册绝对值工具
server.registerTool(
  "abs",
  {
    title: "绝对值",
    description: "计算数字的绝对值",
    inputSchema: {
      a: z.number().describe("数字")
    }
  },
  async ({ a }) => ({
    content: [{
      type: "text",
      text: `绝对值结果：|${a}| = ${Math.abs(a)}`
    }]
  })
);

// 注册立方根工具
server.registerTool(
  "cbrt",
  {
    title: "立方根",
    description: "计算数字的立方根",
    inputSchema: {
      a: z.number().describe("被开方数")
    }
  },
  async ({ a }) => ({
    content: [{
      type: "text",
      text: `立方根结果：∛${a} = ${Math.cbrt(a)}`
    }]
  })
);

// 注册开多次方工具
server.registerTool(
  "nthRoot",
  {
    title: "开多次方",
    description: "计算数字的n次方根",
    inputSchema: {
      a: z.number().describe("被开方数"),
      n: z.number().describe("开方次数")
    }
  },
  async ({ a, n }) => {
    if (n === 0) {
      return {
        content: [{
          type: "text",
          text: "错误：开方次数不能为零！"
        }],
        isError: true
      };
    }
    if (a < 0 && n % 2 === 0) {
      return {
        content: [{
          type: "text",
          text: "错误：负数不能开偶次方根！"
        }],
        isError: true
      };
    }
    const result = Math.pow(a, 1/n);
    return {
      content: [{
        type: "text",
        text: `${n}次方根结果：${n}√${a} = ${result}`
      }]
    };
  }
);

// 注册正弦函数工具
server.registerTool(
  "sin",
  {
    title: "正弦函数",
    description: "计算角度的正弦值（输入为弧度）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  async ({ angle }) => ({
    content: [{
      type: "text",
      text: `正弦函数结果：sin(${angle}) = ${Math.sin(angle)}`
    }]
  })
);

// 注册余弦函数工具
server.registerTool(
  "cos",
  {
    title: "余弦函数",
    description: "计算角度的余弦值（输入为弧度）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  async ({ angle }) => ({
    content: [{
      type: "text",
      text: `余弦函数结果：cos(${angle}) = ${Math.cos(angle)}`
    }]
  })
);

// 注册正切函数工具
server.registerTool(
  "tan",
  {
    title: "正切函数",
    description: "计算角度的正切值（输入为弧度）",
    inputSchema: {
      angle: z.number().describe("角度（弧度）")
    }
  },
  async ({ angle }) => ({
    content: [{
      type: "text",
      text: `正切函数结果：tan(${angle}) = ${Math.tan(angle)}`
    }]
  })
);

// 注册反正弦函数工具
server.registerTool(
  "asin",
  {
    title: "反正弦函数",
    description: "计算反正弦值（返回弧度）",
    inputSchema: {
      value: z.number().describe("输入值（-1到1之间）")
    }
  },
  async ({ value }) => {
    if (value < -1 || value > 1) {
      return {
        content: [{
          type: "text",
          text: "错误：反正弦函数的输入值必须在-1到1之间！"
        }],
        isError: true
      };
    }
    return {
      content: [{
        type: "text",
        text: `反正弦函数结果：asin(${value}) = ${Math.asin(value)} 弧度`
      }]
    };
  }
);

// 注册反余弦函数工具
server.registerTool(
  "acos",
  {
    title: "反余弦函数",
    description: "计算反余弦值（返回弧度）",
    inputSchema: {
      value: z.number().describe("输入值（-1到1之间）")
    }
  },
  async ({ value }) => {
    if (value < -1 || value > 1) {
      return {
        content: [{
          type: "text",
          text: "错误：反余弦函数的输入值必须在-1到1之间！"
        }],
        isError: true
      };
    }
    return {
      content: [{
        type: "text",
        text: `反余弦函数结果：acos(${value}) = ${Math.acos(value)} 弧度`
      }]
    };
  }
);

// 注册反正切函数工具
server.registerTool(
  "atan",
  {
    title: "反正切函数",
    description: "计算反正切值（返回弧度）",
    inputSchema: {
      value: z.number().describe("输入值")
    }
  },
  async ({ value }) => ({
    content: [{
      type: "text",
      text: `反正切函数结果：atan(${value}) = ${Math.atan(value)} 弧度`
    }]
  })
);

// 注册自然对数工具
server.registerTool(
  "ln",
  {
    title: "自然对数",
    description: "计算自然对数（以e为底）",
    inputSchema: {
      value: z.number().describe("输入值（必须大于0）")
    }
  },
  async ({ value }) => {
    if (value <= 0) {
      return {
        content: [{
          type: "text",
          text: "错误：对数函数的输入值必须大于0！"
        }],
        isError: true
      };
    }
    return {
      content: [{
        type: "text",
        text: `自然对数结果：ln(${value}) = ${Math.log(value)}`
      }]
    };
  }
);

// 注册常用对数工具
server.registerTool(
  "log10",
  {
    title: "常用对数",
    description: "计算以10为底的对数",
    inputSchema: {
      value: z.number().describe("输入值（必须大于0）")
    }
  },
  async ({ value }) => {
    if (value <= 0) {
      return {
        content: [{
          type: "text",
          text: "错误：对数函数的输入值必须大于0！"
        }],
        isError: true
      };
    }
    return {
      content: [{
        type: "text",
        text: `常用对数结果：log10(${value}) = ${Math.log10(value)}`
      }]
    };
  }
);

// 注册任意底数对数工具
server.registerTool(
  "log",
  {
    title: "任意底数对数",
    description: "计算以指定底数的对数",
    inputSchema: {
      value: z.number().describe("输入值（必须大于0）"),
      base: z.number().describe("底数（必须大于0且不等于1）")
    }
  },
  async ({ value, base }) => {
    if (value <= 0) {
      return {
        content: [{
          type: "text",
          text: "错误：对数函数的输入值必须大于0！"
        }],
        isError: true
      };
    }
    if (base <= 0 || base === 1) {
      return {
        content: [{
          type: "text",
          text: "错误：对数函数的底数必须大于0且不等于1！"
        }],
        isError: true
      };
    }
    const result = Math.log(value) / Math.log(base);
    return {
      content: [{
        type: "text",
        text: `任意底数对数结果：log${base}(${value}) = ${result}`
      }]
    };
  }
);

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // 使用 stderr 进行日志输出，避免干扰 JSON-RPC 通信
  console.error("MCP Calculator Server started");
}

// 错误处理
process.on("SIGINT", async () => {
  console.error("Shutting down MCP Calculator Server...");
  await server.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.error("Shutting down MCP Calculator Server...");
  await server.close();
  process.exit(0);
});

main().catch((error) => {
  console.error("Failed to start MCP Calculator Server:", error);
  process.exit(1);
});