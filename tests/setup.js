/*
 * @Author: 杨仕明 shiming.y@qq.com
 * @Date: 2025-09-01 03:03:57
 * @LastEditors: 杨仕明 shiming.y@qq.com
 * @LastEditTime: 2025-09-01 14:17:26
 * @FilePath: /mcp_calculator/tests/setup.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

/**
 * Jest测试环境设置文件
 * 配置全局测试环境和工具函数
 */

// 全局测试配置
global.console = {
  ...console,
  // 在测试中静默某些日志
  error: () => {},
  warn: () => {},
  log: () => {},
};

// 测试工具函数
const testUtils = {
  // 创建模拟的MCP请求
  createMockRequest: (tool, params) => ({
    jsonrpc: "2.0",
    id: `test_${tool}_${Date.now()}`,
    method: "tools/call",
    params: {
      name: tool,
      arguments: params,
    },
  }),
};

module.exports = { testUtils };
