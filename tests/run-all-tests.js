#!/usr/bin/env node

/**
 * 统一的测试运行脚本
 * 按顺序运行所有测试并提供详细的输出
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tests = [
  {
    name: '基础算术运算测试',
    file: 'test.js',
    description: '测试加法、减法、乘法、除法等基础运算'
  },
  {
    name: '扩展功能测试',
    file: 'test_extended.js',
    description: '测试求余、幂运算、平方根、绝对值等扩展运算'
  },
  {
    name: '开方功能测试',
    file: 'test_roots.js',
    description: '测试立方根、n次方根等开方运算'
  },
  {
    name: '三角函数测试',
    file: 'test_trigonometry.cjs',
    description: '测试正弦、余弦、正切及其反函数'
  },
  {
    name: '对数函数测试',
    file: 'test_logarithm.cjs',
    description: '测试自然对数、常用对数、任意底数对数'
  }
];

let currentTestIndex = 0;
let passedTests = 0;
let failedTests = 0;
const results = [];

console.log('🧪 MCP Calculator 测试套件');
console.log('=' .repeat(50));
console.log(`准备运行 ${tests.length} 个测试模块...\n`);

function runNextTest() {
  if (currentTestIndex >= tests.length) {
    showSummary();
    return;
  }

  const test = tests[currentTestIndex];
  console.log(`📋 [${currentTestIndex + 1}/${tests.length}] ${test.name}`);
  console.log(`📝 ${test.description}`);
  console.log(`🚀 运行: ${test.file}`);
  console.log('-'.repeat(40));

  const testProcess = spawn('node', [join(__dirname, test.file)], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let output = '';
  let errorOutput = '';
  const startTime = Date.now();

  testProcess.stdout.on('data', (data) => {
    const text = data.toString();
    output += text;
    process.stdout.write(text);
  });

  testProcess.stderr.on('data', (data) => {
    const text = data.toString();
    errorOutput += text;
    process.stderr.write(text);
  });

  testProcess.on('close', (code) => {
    const duration = Date.now() - startTime;
    const success = code === 0;
    
    if (success) {
      passedTests++;
      console.log(`\n✅ ${test.name} - 通过 (${duration}ms)`);
    } else {
      failedTests++;
      console.log(`\n❌ ${test.name} - 失败 (${duration}ms)`);
      if (errorOutput) {
        console.log('错误输出:', errorOutput);
      }
    }

    results.push({
      name: test.name,
      file: test.file,
      success,
      duration,
      output: output.trim(),
      error: errorOutput.trim()
    });

    console.log('\n' + '='.repeat(50) + '\n');
    currentTestIndex++;
    
    // 等待一秒后运行下一个测试
    setTimeout(runNextTest, 1000);
  });

  testProcess.on('error', (error) => {
    console.error(`\n❌ 无法启动测试 ${test.file}:`, error.message);
    failedTests++;
    results.push({
      name: test.name,
      file: test.file,
      success: false,
      duration: 0,
      output: '',
      error: error.message
    });
    currentTestIndex++;
    setTimeout(runNextTest, 1000);
  });
}

function showSummary() {
  console.log('📊 测试结果汇总');
  console.log('=' .repeat(50));
  console.log(`总测试数: ${tests.length}`);
  console.log(`✅ 通过: ${passedTests}`);
  console.log(`❌ 失败: ${failedTests}`);
  console.log(`📈 成功率: ${((passedTests / tests.length) * 100).toFixed(1)}%`);
  
  if (failedTests > 0) {
    console.log('\n❌ 失败的测试:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`  - ${result.name} (${result.file})`);
      if (result.error) {
        console.log(`    错误: ${result.error}`);
      }
    });
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (failedTests === 0) {
    console.log('🎉 所有测试都通过了！');
    process.exit(0);
  } else {
    console.log('⚠️  有测试失败，请检查上述错误信息。');
    process.exit(1);
  }
}

// 开始运行测试
runNextTest();