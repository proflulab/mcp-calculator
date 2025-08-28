#!/usr/bin/env node

// 测试扩展功能的脚本
import { spawn } from "child_process";

const server = spawn("node", ["build/index.js"], {
  stdio: ["pipe", "pipe", "inherit"],
});

// 测试求余运算
const moduloRequest = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "modulo",
    arguments: {
      a: 17,
      b: 5,
    },
  },
};

// 测试幂运算
const powerRequest = {
  jsonrpc: "2.0",
  id: 2,
  method: "tools/call",
  params: {
    name: "power",
    arguments: {
      a: 2,
      b: 8,
    },
  },
};

// 测试平方根
const sqrtRequest = {
  jsonrpc: "2.0",
  id: 3,
  method: "tools/call",
  params: {
    name: "sqrt",
    arguments: {
      a: 16,
    },
  },
};

// 测试绝对值
const absRequest = {
  jsonrpc: "2.0",
  id: 4,
  method: "tools/call",
  params: {
    name: "abs",
    arguments: {
      a: -25,
    },
  },
};

// 测试平方根负数错误
const sqrtErrorRequest = {
  jsonrpc: "2.0",
  id: 5,
  method: "tools/call",
  params: {
    name: "sqrt",
    arguments: {
      a: -9,
    },
  },
};

let responseCount = 0;
let responses = [];

server.stdout.on("data", (data) => {
  const lines = data
    .toString()
    .split("\n")
    .filter((line) => line.trim());

  lines.forEach((line) => {
    try {
      const response = JSON.parse(line);
      responses.push(response);
      responseCount++;

      console.log(`响应 ${responseCount}:`, JSON.stringify(response, null, 2));

      if (responseCount === 5) {
        console.log("\n=== 扩展功能测试完成 ===");
        console.log("所有扩展功能测试都已完成！");
        server.kill();
        process.exit(0);
      }
    } catch (e) {
      console.log("非JSON响应:", line);
    }
  });
});

server.on("error", (error) => {
  console.error("服务器错误:", error);
  process.exit(1);
});

// 发送测试请求
setTimeout(() => {
  console.log("发送求余运算测试请求...");
  server.stdin.write(JSON.stringify(moduloRequest) + "\n");
}, 100);

setTimeout(() => {
  console.log("发送幂运算测试请求...");
  server.stdin.write(JSON.stringify(powerRequest) + "\n");
}, 200);

setTimeout(() => {
  console.log("发送平方根测试请求...");
  server.stdin.write(JSON.stringify(sqrtRequest) + "\n");
}, 300);

setTimeout(() => {
  console.log("发送绝对值测试请求...");
  server.stdin.write(JSON.stringify(absRequest) + "\n");
}, 400);

setTimeout(() => {
  console.log("发送平方根负数错误测试请求...");
  server.stdin.write(JSON.stringify(sqrtErrorRequest) + "\n");
}, 500);

// 超时保护
setTimeout(() => {
  console.log("测试超时，终止服务器");
  server.kill();
  process.exit(1);
}, 8000);
