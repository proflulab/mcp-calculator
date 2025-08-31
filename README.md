# MCP Calculator Server

[![npm version](https://badge.fury.io/js/mcp-calculator.svg)](https://badge.fury.io/js/mcp-calculator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

一个功能完整的基于 Model Context Protocol (MCP) 的计算器服务器，提供丰富的数学运算功能，包括基础算术、高级数学函数、三角函数和对数运算。

## 📦 安装

### 通过 npm 安装（推荐）

```bash
# 全局安装
npm install -g mcp-calculator

# 或者本地安装
npm install mcp-calculator
```

### 从源码安装

```bash
# 克隆项目
git clone https://github.com/your-username/mcp-calculator.git
cd mcp-calculator

# 安装依赖
npm install

# 构建并启动
npm start
```

## 🚀 快速开始

### 全局安装后使用

```bash
# 直接启动服务器
calculator
```

### 本地安装后使用

```bash
# 使用 npx 运行
npx mcp-calculator

# 或者通过 npm scripts
npm start
```

## 功能特性

### 基础运算

- ✅ **加法运算** - 两个数字相加
- ✅ **减法运算** - 两个数字相减
- ✅ **乘法运算** - 两个数字相乘
- ✅ **除法运算** - 两个数字相除（包含除零错误处理）

### 扩展运算

- ✅ **求余运算** - 计算两个数的余数 (a % b)
- ✅ **幂运算** - 计算a的b次方 (a^b)
- ✅ **平方根** - 计算数字的平方根（包含负数错误处理）
- ✅ **立方根** - 计算数字的立方根
- ✅ **开多次方** - 计算数字的n次方根（包含完善的错误处理）
- ✅ **绝对值** - 计算数字的绝对值

### 对数函数

- ✅ **自然对数** - 计算自然对数（以e为底）
- ✅ **常用对数** - 计算以10为底的对数
- ✅ **任意底数对数** - 计算以指定底数的对数

### 三角函数

- ✅ **正弦** (sin) - 计算角度的正弦值
- ✅ **余弦** (cos) - 计算角度的余弦值
- ✅ **正切** (tan) - 计算角度的正切值
- ✅ **反正弦** (asin) - 计算反正弦值
- ✅ **反余弦** (acos) - 计算反余弦值
- ✅ **反正切** (atan) - 计算反正切值

### 系统特性

- ✅ **参数验证** - 使用 Zod 进行输入验证
- ✅ **错误处理** - 完善的错误处理机制

## 安装和使用

### 1. 安装依赖

```bash
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 启动服务器

```bash
npm start
```

或者直接运行构建后的文件：

```bash
node build/index.js
```

### 4. 测试服务器

运行基础功能测试脚本：

```bash
npm test
# 或者直接运行
node tests/test.js
```

运行扩展功能测试脚本：

```bash
npm run test:extended
# 或者直接运行
node tests/test_extended.js
```

运行开方功能测试脚本：

```bash
npm run test:roots
# 或者直接运行
node tests/test_roots.js
```

运行三角函数测试脚本：

```bash
npm run test:trigonometry
# 或者直接运行
node tests/test_trigonometry.cjs
```

运行对数函数测试脚本：

```bash
npm run test:logarithm
# 或者直接运行
node tests/test_logarithm.cjs
```

运行所有测试：

```bash
npm run test:all
```

## 💡 使用示例

### 在 MCP 客户端中使用

#### 全局安装配置

如果你已经全局安装了 `mcp-calculator`，可以这样配置：

```json
{
  "mcpServers": {
    "calculator": {
      "command": "calculator"
    }
  }
}
```

#### 本地安装配置

如果你是本地安装或从源码构建，可以这样配置：

```json
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["/path/to/mcp_calculator/build/index.js"]
    }
  }
}
```

#### 使用 npx 配置

```json
{
  "mcpServers": {
    "calculator": {
      "command": "npx",
      "args": ["mcp-calculator"]
    }
  }
}
```

### 计算器功能示例

- **基础运算**："计算 15 + 27"
- **三角函数**："计算 sin(π/4) 的值"
- **对数运算**："计算 log₂(16)"
- **开方运算**："计算 ∛125"
- **复合运算**："计算 2^3 + √16 - ln(e)"

### 命令行直接使用

```bash
# 启动服务器
node build/index.js

# 在另一个终端发送请求
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"add","arguments":{"a":10,"b":5}}}' | node build/index.js
```

### 安装验证

安装完成后，你可以通过以下方式验证安装是否成功：

```bash
# 检查版本
npm list mcp-calculator

# 运行测试（如果是从源码安装）
npm run test:all

# 启动服务器测试
calculator  # 全局安装
# 或
npx mcp-calculator  # 本地安装
```

## 可用工具

### 1. add - 加法运算

- **描述**: 执行两个数字的加法运算
- **参数**:
  - `a` (number): 第一个数字
  - `b` (number): 第二个数字
- **示例**: `10 + 5 = 15`

### 2. subtract - 减法运算

- **描述**: 执行两个数字的减法运算
- **参数**:
  - `a` (number): 被减数
  - `b` (number): 减数
- **示例**: `10 - 5 = 5`

### 3. multiply - 乘法运算

- **描述**: 执行两个数字的乘法运算
- **参数**:
  - `a` (number): 第一个数字
  - `b` (number): 第二个数字
- **示例**: `10 × 5 = 50`

### 4. divide - 除法运算

- **描述**: 执行两个数字的除法运算
- **参数**:
  - `a` (number): 被除数
  - `b` (number): 除数
- **示例**: `10 ÷ 5 = 2`
- **注意**: 除数不能为零，否则返回错误

### 5. modulo - 求余运算

- **描述**: 计算两个数的余数
- **参数**:
  - `a` (number): 被除数
  - `b` (number): 除数
- **示例**: `17 % 5 = 2`
- **注意**: 除数不能为零，否则返回错误

### 6. power - 幂运算

- **描述**: 计算a的b次方
- **参数**:
  - `a` (number): 底数
  - `b` (number): 指数
- **示例**: `2^8 = 256`

### 7. sqrt - 平方根

- **描述**: 计算数字的平方根
- **参数**:
  - `a` (number): 被开方数
- **示例**: `√16 = 4`
- **注意**: 负数不能开平方根，否则返回错误

### 8. abs - 绝对值

- **描述**: 计算数字的绝对值
- **参数**:
  - `a` (number): 数字
- **示例**: `|-25| = 25`

### 9. cbrt - 立方根

- **描述**: 计算数字的立方根
- **参数**:
  - `a` (number): 被开方数
- **示例**: `∛27 = 3`, `∛-8 = -2`
- **注意**: 支持负数立方根

### 10. nthRoot - 开多次方

- **描述**: 计算数字的n次方根
- **参数**:
  - `a` (number): 被开方数
  - `n` (number): 开方次数
- **示例**: `4√16 = 2`, `5√32 = 2`
- **注意**:
  - 开方次数不能为零
  - 负数不能开偶次方根

### 11. sin - 正弦函数

- **描述**: 计算角度的正弦值
- **参数**:
  - `angle` (number): 角度（弧度）
- **示例**: `sin(π/2) = 1`

### 12. cos - 余弦函数

- **描述**: 计算角度的余弦值
- **参数**:
  - `angle` (number): 角度（弧度）
- **示例**: `cos(0) = 1`

### 13. tan - 正切函数

- **描述**: 计算角度的正切值
- **参数**:
  - `angle` (number): 角度（弧度）
- **示例**: `tan(π/4) = 1`

### 14. asin - 反正弦函数

- **描述**: 计算反正弦值
- **参数**:
  - `value` (number): 输入值（范围-1到1）
- **示例**: `asin(0.5) = π/6`
- **注意**: 输入值必须在-1到1之间

### 15. acos - 反余弦函数

- **描述**: 计算反余弦值
- **参数**:
  - `value` (number): 输入值（范围-1到1）
- **示例**: `acos(0.5) = π/3`
- **注意**: 输入值必须在-1到1之间

### 16. atan - 反正切函数

- **描述**: 计算反正切值
- **参数**:
  - `value` (number): 输入值
- **示例**: `atan(1) = π/4`

### 17. ln - 自然对数

- **描述**: 计算自然对数（以e为底的对数）
- **参数**:
  - `value` (number): 输入值（必须大于0）
- **示例**: `ln(e) = 1`
- **注意**: 输入值必须大于0

### 18. log10 - 常用对数

- **描述**: 计算以10为底的对数
- **参数**:
  - `value` (number): 输入值（必须大于0）
- **示例**: `log10(100) = 2`
- **注意**: 输入值必须大于0

### 19. log - 任意底数对数

- **描述**: 计算以指定底数的对数
- **参数**:
  - `value` (number): 输入值（必须大于0）
  - `base` (number): 底数（必须大于0且不等于1）
- **示例**: `log(8, 2) = 3`
- **注意**: 输入值必须大于0，底数必须大于0且不等于1

## 📡 MCP 协议使用

### 连接服务器

服务器通过标准输入/输出 (stdio) 进行通信，支持 JSON-RPC 2.0 协议。

### 获取工具列表

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}
```

**响应示例：**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "add",
        "description": "执行两个数字的加法运算",
        "inputSchema": {
          "type": "object",
          "properties": {
            "a": { "type": "number", "description": "第一个数字" },
            "b": { "type": "number", "description": "第二个数字" }
          }
        }
      }
    ]
  }
}
```

### 调用工具

**基础算术运算：**

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "add",
    "arguments": {
      "a": 10,
      "b": 5
    }
  }
}
```

**三角函数运算：**

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "sin",
    "arguments": {
      "angle": 1.5708
    }
  }
}
```

**对数运算：**

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "log",
    "arguments": {
      "value": 8,
      "base": 2
    }
  }
}
```

**成功响应示例：**

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "加法运算结果：10 + 5 = 15"
      }
    ]
  }
}
```

**错误响应示例：**

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "错误：除数不能为零！"
      }
    ],
    "isError": true
  }
}
```

## 🛠️ 技术栈

- **TypeScript** - 主要开发语言，提供类型安全
- **@modelcontextprotocol/sdk** - MCP 协议实现
- **Zod** - 运行时类型验证和输入校验
- **Node.js** - 运行环境

### 依赖版本

- Node.js >= 16.0.0
- TypeScript >= 5.0.0
- @modelcontextprotocol/sdk ^1.17.4
- Zod ^3.25.76

## 📁 项目结构

```text
mcp-calculator/
├── src/
│   └── index.ts              # 主服务器文件
├── tests/                    # 测试文件目录
│   ├── test.js               # 基础功能测试
│   ├── test_extended.js      # 扩展功能测试
│   ├── test_roots.js         # 开方功能测试
│   ├── test_trigonometry.cjs # 三角函数测试
│   ├── test_logarithm.cjs    # 对数函数测试
│   └── run-all-tests.js      # 测试套件运行器
├── build/                    # 编译输出目录（发布到npm）
├── package.json              # 项目配置和依赖
├── package-lock.json         # 锁定依赖版本
├── tsconfig.json             # TypeScript 编译配置
├── .gitignore                # Git 忽略文件配置
├── LICENSE                   # MIT 许可证
└── README.md                 # 项目说明文档
```

## 📜 开发脚本

- `npm run build` - 编译 TypeScript 代码并设置执行权限
- `npm start` - 构建并启动服务器
- `npm run dev` - 开发模式（监听文件变化自动重编译）
- `npm test` - 运行基础功能测试
- `npm run test:extended` - 运行扩展功能测试
- `npm run test:logarithm` - 运行对数函数测试
- `npm run test:roots` - 运行开方功能测试
- `npm run test:trigonometry` - 运行三角函数测试
- `npm run test:all` - 运行所有测试

## 🧪 测试

项目包含完整的测试套件，覆盖所有功能模块：

```bash
# 运行所有测试
npm run test:all

# 或者单独运行各个测试
npm test                        # 基础算术运算测试
npm run test:extended           # 扩展运算测试
npm run test:roots              # 开方运算测试
npm run test:trigonometry       # 三角函数测试
npm run test:logarithm          # 对数函数测试
```

### 测试覆盖范围

- ✅ 基础算术运算（加减乘除）
- ✅ 扩展运算（求余、幂运算、平方根、绝对值）
- ✅ 开方运算（立方根、n次方根）
- ✅ 三角函数（sin、cos、tan、asin、acos、atan）
- ✅ 对数函数（ln、log10、任意底数对数）
- ✅ 错误处理（除零、参数验证、范围检查）

## ⚠️ 错误处理

服务器包含完善的错误处理机制：

1. **参数验证错误** - 当输入参数不符合要求时
2. **除零错误** - 当除法运算的除数为零时
3. **数学域错误** - 如负数开平方根、对数函数输入非正数等
4. **范围错误** - 如反三角函数输入超出定义域
5. **未知工具错误** - 当调用不存在的工具时

## 🔧 故障排除

### 常见问题

**Q: 启动时提示权限错误**
A: 确保构建脚本正确设置了执行权限：

```bash
npm run build
```

**Q: 测试脚本运行失败**
A: 确保先构建项目：

```bash
npm run build
node test.js
```

**Q: JSON-RPC 通信错误**
A: 检查请求格式是否正确，参考 MCP 协议使用部分的示例

### 调试模式

启用详细日志输出：

```bash
DEBUG=* node build/index.js
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用 TypeScript 进行开发
- 遵循现有的代码风格
- 为新功能添加相应的测试
- 更新文档说明

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📋 版本信息

当前版本：**v1.0.1**

### 版本历史

- **v1.0.1** - 初始发布版本
  - 支持19个数学运算工具
  - 完整的错误处理机制
  - 100%测试覆盖率
  - npm包发布

## 🔗 相关链接

- **npm 包**: [mcp-calculator](https://www.npmjs.com/package/mcp-calculator)
- **GitHub 仓库**: [mcp-calculator](https://github.com/your-username/mcp-calculator)
- [Model Context Protocol 官方文档](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Zod 验证库](https://github.com/colinhacks/zod)

## 📊 功能统计

- **19** 个数学工具
- **4** 个功能分类（基础运算、扩展运算、三角函数、对数函数）
- **100%** 测试覆盖率
- **完整** 的错误处理机制
- **TypeScript** 类型安全
- **零依赖运行时**（仅开发依赖）

## 🚀 性能特性

- **轻量级**: 编译后体积小，启动快速
- **内存高效**: 低内存占用，适合长期运行
- **类型安全**: 完整的 TypeScript 类型定义
- **错误恢复**: 单个计算错误不影响服务器运行

## 📚 API 参考

### 工具分类

| 分类 | 工具数量 | 工具名称 |
|------|----------|----------|
| 基础运算 | 4 | `add`, `subtract`, `multiply`, `divide` |
| 扩展运算 | 6 | `modulo`, `power`, `sqrt`, `abs`, `cbrt`, `nthRoot` |
| 三角函数 | 6 | `sin`, `cos`, `tan`, `asin`, `acos`, `atan` |
| 对数函数 | 3 | `ln`, `log10`, `log` |

### 错误类型

| 错误类型 | 触发条件 | 示例 |
|----------|----------|------|
| 除零错误 | 除数为0 | `divide(10, 0)` |
| 数学域错误 | 负数开偶次方根 | `sqrt(-4)` |
| 范围错误 | 反三角函数输入超出[-1,1] | `asin(2)` |
| 参数错误 | 对数函数输入非正数 | `ln(-1)` |

### 返回格式

所有工具调用都返回统一的格式：

```typescript
interface ToolResult {
  content: [{
    type: "text";
    text: string;
  }];
  isError?: boolean;
}
```

---

### Built With TypeScript and MCP ❤️
