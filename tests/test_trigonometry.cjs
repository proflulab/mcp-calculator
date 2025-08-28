#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

// 测试三角函数功能
function testTrigonometry() {
  console.log("=== 三角函数测试 ===\n");

  const tests = [
    // 正弦函数测试
    {
      tool: "sin",
      params: { angle: 0 },
      description: "sin(0) = 0",
    },
    {
      tool: "sin",
      params: { angle: Math.PI / 2 },
      description: "sin(π/2) = 1",
    },
    {
      tool: "sin",
      params: { angle: Math.PI },
      description: "sin(π) ≈ 0",
    },

    // 余弦函数测试
    {
      tool: "cos",
      params: { angle: 0 },
      description: "cos(0) = 1",
    },
    {
      tool: "cos",
      params: { angle: Math.PI / 2 },
      description: "cos(π/2) ≈ 0",
    },
    {
      tool: "cos",
      params: { angle: Math.PI },
      description: "cos(π) = -1",
    },

    // 正切函数测试
    {
      tool: "tan",
      params: { angle: 0 },
      description: "tan(0) = 0",
    },
    {
      tool: "tan",
      params: { angle: Math.PI / 4 },
      description: "tan(π/4) = 1",
    },

    // 反正弦函数测试
    {
      tool: "asin",
      params: { value: 0 },
      description: "asin(0) = 0",
    },
    {
      tool: "asin",
      params: { value: 1 },
      description: "asin(1) = π/2",
    },
    {
      tool: "asin",
      params: { value: 0.5 },
      description: "asin(0.5) = π/6",
    },
    {
      tool: "asin",
      params: { value: 2 },
      description: "asin(2) - 错误测试（超出范围）",
    },

    // 反余弦函数测试
    {
      tool: "acos",
      params: { value: 1 },
      description: "acos(1) = 0",
    },
    {
      tool: "acos",
      params: { value: 0 },
      description: "acos(0) = π/2",
    },
    {
      tool: "acos",
      params: { value: -2 },
      description: "acos(-2) - 错误测试（超出范围）",
    },

    // 反正切函数测试
    {
      tool: "atan",
      params: { value: 0 },
      description: "atan(0) = 0",
    },
    {
      tool: "atan",
      params: { value: 1 },
      description: "atan(1) = π/4",
    },
    {
      tool: "atan",
      params: { value: -1 },
      description: "atan(-1) = -π/4",
    },
  ];

  let testIndex = 0;

  function runNextTest() {
    if (testIndex >= tests.length) {
      console.log("\n=== 所有三角函数测试完成 ===");
      return;
    }

    const test = tests[testIndex];
    console.log(`测试 ${testIndex + 1}: ${test.description}`);

    const mcpProcess = spawn("node", [path.join(__dirname, "build/index.js")], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let output = "";

    mcpProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    mcpProcess.stderr.on("data", (data) => {
      console.error("错误:", data.toString());
    });

    mcpProcess.on("close", (code) => {
      try {
        const lines = output.trim().split("\n");
        const lastLine = lines[lines.length - 1];
        if (lastLine) {
          const response = JSON.parse(lastLine);
          if (response.result && response.result.content) {
            console.log("结果:", response.result.content[0].text);
          } else {
            console.log("响应:", JSON.stringify(response, null, 2));
          }
        }
      } catch (e) {
        console.log("输出:", output);
      }

      testIndex++;
      setTimeout(runNextTest, 100);
    });

    // 发送 JSON-RPC 请求
    const request = {
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name: test.tool,
        arguments: test.params,
      },
    };

    mcpProcess.stdin.write(JSON.stringify(request) + "\n");
    mcpProcess.stdin.end();
  }

  runNextTest();
}

testTrigonometry();
