#!/usr/bin/env node

// 简单的测试脚本来验证 MCP 计算器服务器
import { spawn } from 'child_process';

const server = spawn('node', ['build/index.js'], {
  stdio: ['pipe', 'pipe', 'inherit']
});

// 测试工具列表请求
const listToolsRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list'
};

// 测试加法工具调用
const addToolRequest = {
  jsonrpc: '2.0',
  id: 2,
  method: 'tools/call',
  params: {
    name: 'add',
    arguments: {
      a: 10,
      b: 5
    }
  }
};

// 测试除法工具调用（包含除零错误）
const divideByZeroRequest = {
  jsonrpc: '2.0',
  id: 3,
  method: 'tools/call',
  params: {
    name: 'divide',
    arguments: {
      a: 10,
      b: 0
    }
  }
};

let responseCount = 0;
let responses = [];

server.stdout.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  
  lines.forEach(line => {
    try {
      const response = JSON.parse(line);
      responses.push(response);
      responseCount++;
      
      console.log(`响应 ${responseCount}:`, JSON.stringify(response, null, 2));
      
      if (responseCount === 3) {
        console.log('\n=== 测试完成 ===');
        console.log('所有测试请求都已完成！');
        server.kill();
        process.exit(0);
      }
    } catch (e) {
      console.log('非JSON响应:', line);
    }
  });
});

server.on('error', (error) => {
  console.error('服务器错误:', error);
  process.exit(1);
});

// 发送测试请求
setTimeout(() => {
  console.log('发送工具列表请求...');
  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
}, 100);

setTimeout(() => {
  console.log('发送加法测试请求...');
  server.stdin.write(JSON.stringify(addToolRequest) + '\n');
}, 200);

setTimeout(() => {
  console.log('发送除零测试请求...');
  server.stdin.write(JSON.stringify(divideByZeroRequest) + '\n');
}, 300);

// 超时保护
setTimeout(() => {
  console.log('测试超时，终止服务器');
  server.kill();
  process.exit(1);
}, 5000);