#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { basicMathTools } from "./modules/basicMath.js";
import { rootOperationTools } from "./modules/rootOperations.js";
import { trigonometryTools } from "./modules/trigonometry.js";
import { logarithmTools } from "./modules/logarithm.js";
import { statisticsTools } from "./modules/statistics.js";
import { combinatoricsTools } from "./modules/combinatorics.js";
import { numberTheoryTools } from "./modules/numberTheory.js";
import { complexTools } from "./modules/complex.js";
import { matrixTools } from "./modules/matrix.js";
import { numericalTools } from "./modules/numerical.js";
import { financialTools } from "./modules/financial.js";
import { conversionTools } from "./modules/conversion.js";
import { geometryTools } from "./modules/geometry.js";
import type { ToolRegistration } from "./types.js";

/**
 * MCP计算器服务器
 * 提供各种数学运算功能的MCP服务器实现
 */
class CalculatorServer {
  private server: McpServer;
  private allTools: ToolRegistration[];

  constructor() {
    // 创建服务器实例
    this.server = new McpServer({
      name: "calculator",
      version: "1.0.0"
    });

    // 收集所有工具
    this.allTools = [
      ...basicMathTools,
      ...rootOperationTools,
      ...trigonometryTools,
      ...logarithmTools,
      ...statisticsTools,
      ...combinatoricsTools,
      ...numberTheoryTools,
      ...complexTools,
      ...matrixTools,
      ...numericalTools,
      ...financialTools,
      ...conversionTools,
      ...geometryTools
    ];
  }

  /**
   * 注册所有工具到MCP服务器
   */
  private registerAllTools(): void {
    this.allTools.forEach(tool => {
      this.server.registerTool(
        tool.name,
        {
          title: tool.definition.title,
          description: tool.definition.description,
          inputSchema: tool.definition.inputSchema
        },
        tool.handler
      );
    });

    console.error(`已注册 ${this.allTools.length} 个计算器工具`);
  }

  /**
   * 启动服务器
   */
  public async start(): Promise<void> {
    // 注册所有工具
    this.registerAllTools();

    // 创建传输层并连接
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error("MCP Calculator Server started");
  }

  /**
   * 关闭服务器
   */
  public async stop(): Promise<void> {
    console.error("Shutting down MCP Calculator Server...");
    await this.server.close();
  }
}

// 创建服务器实例
const calculatorServer = new CalculatorServer();

// 启动服务器
async function main() {
  try {
    await calculatorServer.start();
  } catch (error) {
    console.error("Failed to start MCP Calculator Server:", error);
    process.exit(1);
  }
}

// 错误处理和优雅关闭
process.on("SIGINT", async () => {
  await calculatorServer.stop();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await calculatorServer.stop();
  process.exit(0);
});

// 启动应用
main();