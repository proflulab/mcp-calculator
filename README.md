# MCP Calculator Server

一个基于 Model Context Protocol (MCP) 的计算器服务器，提供基本的算术运算功能。

## 功能特性

- ✅ **加法运算** - 两个数字相加
- ✅ **减法运算** - 两个数字相减
- ✅ **乘法运算** - 两个数字相乘
- ✅ **除法运算** - 两个数字相除（包含除零错误处理）
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

运行测试脚本来验证功能：

```bash
node test.js
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

## MCP 协议使用

### 获取工具列表

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}
```

### 调用工具

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

## 技术栈

- **TypeScript** - 主要开发语言
- **@modelcontextprotocol/sdk** - MCP 协议实现
- **Zod** - 运行时类型验证
- **Node.js** - 运行环境

## 项目结构

```
mcp_calculator2/
├── src/
│   └── index.ts          # 主服务器文件
├── build/                # 编译输出目录
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── test.js              # 测试脚本
└── README.md            # 项目说明
```

## 开发脚本

- `npm run build` - 编译 TypeScript 代码
- `npm start` - 构建并启动服务器
- `npm run dev` - 开发模式（监听文件变化）

## 错误处理

服务器包含完善的错误处理机制：

1. **参数验证错误** - 当输入参数不符合要求时
2. **除零错误** - 当除法运算的除数为零时
3. **未知工具错误** - 当调用不存在的工具时

## 许可证

MIT License

## 参考资料

- [Model Context Protocol 官方文档](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)