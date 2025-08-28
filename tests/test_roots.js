#!/usr/bin/env node

// 测试开方功能的脚本
import { spawn } from 'child_process';

const server = spawn('node', ['build/index.js'], {
  stdio: ['pipe', 'pipe', 'inherit']
});

// 测试立方根
const cbrtRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: {
    name: 'cbrt',
    arguments: {
      a: 27
    }
  }
};

// 测试立方根（负数）
const cbrtNegativeRequest = {
  jsonrpc: '2.0',
  id: 2,
  method: 'tools/call',
  params: {
    name: 'cbrt',
    arguments: {
      a: -8
    }
  }
};

// 测试4次方根
const nthRootRequest = {
  jsonrpc: '2.0',
  id: 3,
  method: 'tools/call',
  params: {
    name: 'nthRoot',
    arguments: {
      a: 16,
      n: 4
    }
  }
};

// 测试5次方根
const nthRoot5Request = {
  jsonrpc: '2.0',
  id: 4,
  method: 'tools/call',
  params: {
    name: 'nthRoot',
    arguments: {
      a: 32,
      n: 5
    }
  }
};

// 测试开方次数为零的错误
const nthRootZeroError = {
  jsonrpc: '2.0',
  id: 5,
  method: 'tools/call',
  params: {
    name: 'nthRoot',
    arguments: {
      a: 16,
      n: 0
    }
  }
};

// 测试负数开偶次方根的错误
const nthRootNegativeEvenError = {
  jsonrpc: '2.0',
  id: 6,
  method: 'tools/call',
  params: {
    name: 'nthRoot',
    arguments: {
      a: -16,
      n: 4
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
      
      if (responseCount === 6) {
        console.log('\n=== 开方功能测试完成 ===');
        console.log('所有开方功能测试都已完成！');
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
  console.log('发送立方根测试请求...');
  server.stdin.write(JSON.stringify(cbrtRequest) + '\n');
}, 100);

setTimeout(() => {
  console.log('发送立方根负数测试请求...');
  server.stdin.write(JSON.stringify(cbrtNegativeRequest) + '\n');
}, 200);

setTimeout(() => {
  console.log('发送4次方根测试请求...');
  server.stdin.write(JSON.stringify(nthRootRequest) + '\n');
}, 300);

setTimeout(() => {
  console.log('发送5次方根测试请求...');
  server.stdin.write(JSON.stringify(nthRoot5Request) + '\n');
}, 400);

setTimeout(() => {
  console.log('发送开方次数为零错误测试请求...');
  server.stdin.write(JSON.stringify(nthRootZeroError) + '\n');
}, 500);

setTimeout(() => {
  console.log('发送负数开偶次方根错误测试请求...');
  server.stdin.write(JSON.stringify(nthRootNegativeEvenError) + '\n');
}, 600);

// 超时保护
setTimeout(() => {
  console.log('测试超时，终止服务器');
  server.kill();
  process.exit(1);
}, 10000);