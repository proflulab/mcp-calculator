const { spawn } = require("child_process");

// 启动 MCP 服务器
const server = spawn("node", ["build/index.js"], {
  stdio: ["pipe", "pipe", "pipe"],
});

let responseCount = 0;
const expectedResponses = 7;

// 处理服务器响应
server.stdout.on("data", (data) => {
  const lines = data
    .toString()
    .split("\n")
    .filter((line) => line.trim());

  lines.forEach((line) => {
    try {
      const response = JSON.parse(line);
      if (response.result && response.result.content) {
        console.log("响应:", response.result.content[0].text);
        responseCount++;

        if (responseCount >= expectedResponses) {
          console.log("\n所有对数函数测试完成！");
          server.kill();
        }
      }
    } catch (e) {
      // 忽略非 JSON 响应
    }
  });
});

// 错误处理
server.stderr.on("data", (data) => {
  console.error("服务器错误:", data.toString());
});

// 等待服务器启动后发送测试请求
setTimeout(() => {
  console.log("开始测试对数函数功能...");

  // 测试自然对数
  const lnRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "ln",
      arguments: { value: 2.718281828 },
    },
  };
  server.stdin.write(JSON.stringify(lnRequest) + "\n");

  // 测试自然对数错误情况
  const lnErrorRequest = {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: {
      name: "ln",
      arguments: { value: -1 },
    },
  };
  server.stdin.write(JSON.stringify(lnErrorRequest) + "\n");

  // 测试常用对数
  const log10Request = {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "log10",
      arguments: { value: 100 },
    },
  };
  server.stdin.write(JSON.stringify(log10Request) + "\n");

  // 测试常用对数错误情况
  const log10ErrorRequest = {
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: {
      name: "log10",
      arguments: { value: 0 },
    },
  };
  server.stdin.write(JSON.stringify(log10ErrorRequest) + "\n");

  // 测试任意底数对数
  const logRequest = {
    jsonrpc: "2.0",
    id: 5,
    method: "tools/call",
    params: {
      name: "log",
      arguments: { value: 8, base: 2 },
    },
  };
  server.stdin.write(JSON.stringify(logRequest) + "\n");

  // 测试任意底数对数错误情况（底数为1）
  const logErrorRequest1 = {
    jsonrpc: "2.0",
    id: 6,
    method: "tools/call",
    params: {
      name: "log",
      arguments: { value: 8, base: 1 },
    },
  };
  server.stdin.write(JSON.stringify(logErrorRequest1) + "\n");

  // 测试任意底数对数错误情况（输入值为负数）
  const logErrorRequest2 = {
    jsonrpc: "2.0",
    id: 7,
    method: "tools/call",
    params: {
      name: "log",
      arguments: { value: -5, base: 2 },
    },
  };
  server.stdin.write(JSON.stringify(logErrorRequest2) + "\n");
}, 1000);

// 超时处理
setTimeout(() => {
  console.log("测试超时，强制退出");
  server.kill();
}, 10000);
