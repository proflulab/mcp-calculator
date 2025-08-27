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