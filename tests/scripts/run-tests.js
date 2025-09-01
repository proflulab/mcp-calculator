#!/usr/bin/env node
/**
 * MCP Calculator 测试运行脚本
 * 提供多种测试运行模式和详细报告
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 颜色输出工具
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function colorLog(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function printHeader(title) {
  const line = "=".repeat(60);
  colorLog(line, "cyan");
  colorLog(`  ${title}`, "bright");
  colorLog(line, "cyan");
}

function printSection(title) {
  colorLog(`\n${"-".repeat(40)}`, "blue");
  colorLog(`  ${title}`, "yellow");
  colorLog(`${"-".repeat(40)}`, "blue");
}

// 测试配置
const testConfigs = {
  unit: {
    name: "单元测试",
    pattern: "tests/unit/**/*.test.ts",
    description: "测试各个模块的功能",
  },
  integration: {
    name: "集成测试",
    pattern: "tests/integration/**/*.test.ts",
    description: "测试整个系统的集成",
  },
  performance: {
    name: "性能测试",
    pattern: "tests/performance/**/*.test.ts",
    description: "测试系统性能和压力承受能力",
    timeout: 60000,
  },
  all: {
    name: "全部测试",
    pattern: "tests/**/*.test.ts",
    description: "运行所有测试",
  },
};

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    type: "all",
    coverage: false,
    watch: false,
    verbose: false,
    bail: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case "--type":
      case "-t":
        options.type = args[++i] || "all";
        break;
      case "--coverage":
      case "-c":
        options.coverage = true;
        break;
      case "--watch":
      case "-w":
        options.watch = true;
        break;
      case "--verbose":
      case "-v":
        options.verbose = true;
        break;
      case "--bail":
      case "-b":
        options.bail = true;
        break;
      case "--help":
      case "-h":
        options.help = true;
        break;
      default:
        if (testConfigs[arg]) {
          options.type = arg;
        }
        break;
    }
  }

  return options;
}

// 显示帮助信息
function showHelp() {
  printHeader("MCP Calculator 测试运行器");

  colorLog("\n用法:", "bright");
  colorLog("  node run-tests.js [选项] [测试类型]\n");

  colorLog("测试类型:", "bright");
  Object.entries(testConfigs).forEach(([key, config]) => {
    colorLog(`  ${key.padEnd(12)} - ${config.description}`, "green");
  });

  colorLog("\n选项:", "bright");
  colorLog(
    "  -t, --type      指定测试类型 (unit|integration|performance|all)",
    "green"
  );
  colorLog("  -c, --coverage  生成代码覆盖率报告", "green");
  colorLog("  -w, --watch     监视模式，文件变化时自动重新运行", "green");
  colorLog("  -v, --verbose   详细输出", "green");
  colorLog("  -b, --bail      遇到第一个失败测试时停止", "green");
  colorLog("  -h, --help      显示此帮助信息", "green");

  colorLog("\n示例:", "bright");
  colorLog("  node run-tests.js unit              # 运行单元测试", "cyan");
  colorLog(
    "  node run-tests.js --coverage        # 运行所有测试并生成覆盖率报告",
    "cyan"
  );
  colorLog(
    "  node run-tests.js performance -v    # 运行性能测试，详细输出",
    "cyan"
  );
  colorLog("  node run-tests.js --watch           # 监视模式运行测试", "cyan");
}

// 构建Jest命令
function buildJestCommand(options) {
  const config = testConfigs[options.type];
  if (!config) {
    throw new Error(`未知的测试类型: ${options.type}`);
  }

  let command = "npx jest";

  // 测试文件模式
  if (config.pattern) {
    command += ` "${config.pattern}"`;
  }

  // 配置文件
  command += " --config tests/jest.config.cjs";

  // 覆盖率
  if (options.coverage) {
    command += " --coverage --coverageDirectory=tests/coverage";
  }

  // 监视模式
  if (options.watch) {
    command += " --watch";
  }

  // 详细输出
  if (options.verbose) {
    command += " --verbose";
  }

  // 遇到失败时停止
  if (options.bail) {
    command += " --bail";
  }

  // 超时设置
  if (config.timeout) {
    command += ` --testTimeout=${config.timeout}`;
  }

  // 其他有用的选项
  command += " --detectOpenHandles --forceExit";

  return command;
}

// 检查依赖
function checkDependencies() {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    colorLog("错误: 找不到 package.json 文件", "red");
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const requiredDeps = ["jest", "@types/jest", "ts-jest"];
  const missingDeps = [];

  requiredDeps.forEach((dep) => {
    if (
      !packageJson.devDependencies?.[dep] &&
      !packageJson.dependencies?.[dep]
    ) {
      missingDeps.push(dep);
    }
  });

  if (missingDeps.length > 0) {
    colorLog("错误: 缺少必要的依赖:", "red");
    missingDeps.forEach((dep) => colorLog(`  - ${dep}`, "red"));
    colorLog("\n请运行以下命令安装依赖:", "yellow");
    colorLog(`npm install --save-dev ${missingDeps.join(" ")}`, "cyan");
    process.exit(1);
  }
}

// 运行测试前的准备
function prepareTests() {
  // 确保测试目录存在
  const testDirs = [
    "tests/unit",
    "tests/integration",
    "tests/performance",
    "tests/coverage",
  ];
  testDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// 运行测试
function runTests(options) {
  const config = testConfigs[options.type];

  printHeader(`运行 ${config.name}`);
  colorLog(`描述: ${config.description}\n`, "yellow");

  try {
    const command = buildJestCommand(options);
    colorLog(`执行命令: ${command}\n`, "blue");

    const startTime = Date.now();
    execSync(command, { stdio: "inherit", cwd: process.cwd() });
    const endTime = Date.now();

    const duration = ((endTime - startTime) / 1000).toFixed(2);
    colorLog(`\n✅ 测试完成! 耗时: ${duration}秒`, "green");

    if (options.coverage) {
      colorLog("\n📊 覆盖率报告已生成在 tests/coverage/ 目录", "cyan");
    }
  } catch (error) {
    colorLog("\n❌ 测试失败!", "red");
    process.exit(1);
  }
}

// 显示测试统计
function showTestStats() {
  printSection("测试文件统计");

  Object.entries(testConfigs).forEach(([key, config]) => {
    if (key === "all") return;

    const pattern = config.pattern.replace("**/", "");
    const testDir = path.dirname(pattern);

    if (fs.existsSync(testDir)) {
      const files = fs
        .readdirSync(testDir)
        .filter((f) => f.endsWith(".test.ts"));
      colorLog(`${config.name}: ${files.length} 个测试文件`, "green");
    } else {
      colorLog(`${config.name}: 目录不存在`, "yellow");
    }
  });
}

// 主函数
function main() {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    return;
  }

  try {
    checkDependencies();
    prepareTests();
    showTestStats();
    runTests(options);
  } catch (error) {
    colorLog(`\n错误: ${error.message}`, "red");
    process.exit(1);
  }
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runTests, testConfigs, parseArgs, buildJestCommand };
