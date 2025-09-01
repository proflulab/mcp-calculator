# MCP Calculator Server

[![npm version](https://badge.fury.io/js/mcp-calculator.svg)](https://badge.fury.io/js/mcp-calculator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

一个功能完整的基于 Model Context Protocol (MCP) 的计算器服务器，提供丰富的数学运算功能，包括基础算术、根式运算、三角函数、对数运算、统计学、组合数学、数论、复数运算、矩阵运算、数值分析、金融计算、单位转换和几何计算等 13 个专业数学模块。

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
git clone https://github.com/proflulab/mcp-calculator.git
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

## 🧮 功能特性

### 📊 13 个专业数学模块

#### 1. 基础数学 (Basic Math)

- ✅ **加法运算** - 两个数字相加
- ✅ **减法运算** - 两个数字相减
- ✅ **乘法运算** - 两个数字相乘
- ✅ **除法运算** - 两个数字相除（包含除零错误处理）
- ✅ **求余运算** - 计算两个数的余数
- ✅ **幂运算** - 计算a的b次方

#### 2. 根式运算 (Root Operations)

- ✅ **平方根** - 计算数字的平方根
- ✅ **立方根** - 计算数字的立方根
- ✅ **开多次方** - 计算数字的n次方根
- ✅ **绝对值** - 计算数字的绝对值

#### 3. 三角函数 (Trigonometry)

- ✅ **基本三角函数** - sin, cos, tan
- ✅ **反三角函数** - asin, acos, atan
- ✅ **双曲函数** - sinh, cosh, tanh
- ✅ **角度弧度转换** - 度数与弧度互转

#### 4. 对数函数 (Logarithms)

- ✅ **自然对数** - ln(x)
- ✅ **常用对数** - log₁₀(x)
- ✅ **任意底数对数** - log_b(x)
- ✅ **指数函数** - e^x, 10^x, a^x

#### 5. 统计学 (Statistics)

- ✅ **描述统计** - 平均值、中位数、众数
- ✅ **离散度量** - 标准差、方差、范围
- ✅ **极值统计** - 最大值、最小值
- ✅ **聚合运算** - 求和、乘积

#### 6. 组合数学 (Combinatorics)

- ✅ **阶乘运算** - n!
- ✅ **排列组合** - P(n,r), C(n,r)
- ✅ **斐波那契数列** - 第n项斐波那契数
- ✅ **卡塔兰数** - 第n个卡塔兰数

#### 7. 数论 (Number Theory)

- ✅ **最大公约数** - GCD计算
- ✅ **最小公倍数** - LCM计算
- ✅ **素数判断** - 质数检测
- ✅ **质因数分解** - 素因子分解
- ✅ **欧拉函数** - φ(n)计算
- ✅ **完全数判断** - 完全数检测
- ✅ **因子统计** - 因子个数和列表

#### 8. 复数运算 (Complex Numbers)

- ✅ **基本运算** - 加减乘除
- ✅ **复数属性** - 模长、共轭、幅角
- ✅ **极坐标形式** - r∠θ 表示

#### 9. 矩阵运算 (Matrix Operations)

- ✅ **矩阵运算** - 加法、减法、乘法
- ✅ **矩阵属性** - 行列式、转置、逆矩阵
- ✅ **向量运算** - 点积、叉积、模长

#### 10. 数值分析 (Numerical Analysis)

- ✅ **数值积分** - 梯形法则、辛普森法则
- ✅ **数值微分** - 数值求导
- ✅ **方程求根** - 牛顿法、二分法
- ✅ **插值计算** - 拉格朗日插值

#### 11. 金融计算 (Financial)

- ✅ **复利计算** - 投资收益计算
- ✅ **年金计算** - 现值和未来值
- ✅ **贷款计算** - 月供计算
- ✅ **投资分析** - NPV、IRR计算
- ✅ **债券定价** - 债券价格计算

#### 12. 单位转换 (Conversions)

- ✅ **长度转换** - 米、英尺、英寸等
- ✅ **重量转换** - 千克、磅、盎司等
- ✅ **温度转换** - 摄氏度、华氏度、开尔文
- ✅ **面积体积** - 各种单位互转
- ✅ **时间转换** - 秒、分钟、小时等

#### 13. 几何计算 (Geometry)

- ✅ **平面几何** - 圆形、矩形、三角形面积周长
- ✅ **立体几何** - 球体、圆柱、圆锥体积表面积
- ✅ **坐标几何** - 点距离、直线方程

### 🔧 系统特性

- ✅ **参数验证** - 使用 Zod 进行输入验证
- ✅ **错误处理** - 完善的错误处理机制
- ✅ **模块化设计** - 13个独立数学模块
- ✅ **类型安全** - 完整的 TypeScript 类型定义
- ✅ **单元测试** - 266个测试用例，100%覆盖率

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

详细的测试说明和使用方法请参考：[测试文档](tests/README.md)

快速运行测试：

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行集成测试
npm run test:integration

# 生成覆盖率报告
npm run test:coverage
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

## 🔧 可用工具

本项目提供 **100+** 个数学工具，按 13 个专业模块组织。以下是各模块的主要工具：

### 📐 1. 基础数学 (Basic Math)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `add` | 加法运算 | `add(10, 5) = 15` |
| `subtract` | 减法运算 | `subtract(10, 5) = 5` |
| `multiply` | 乘法运算 | `multiply(10, 5) = 50` |
| `divide` | 除法运算 | `divide(10, 5) = 2` |
| `modulo` | 求余运算 | `modulo(17, 5) = 2` |
| `power` | 幂运算 | `power(2, 8) = 256` |

### 🔢 2. 根式运算 (Root Operations)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `sqrt` | 平方根 | `sqrt(16) = 4` |
| `cbrt` | 立方根 | `cbrt(27) = 3` |
| `nthRoot` | n次方根 | `nthRoot(16, 4) = 2` |
| `abs` | 绝对值 | `abs(-25) = 25` |

### 📊 3. 三角函数 (Trigonometry)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `sin` | 正弦函数 | `sin(π/2) = 1` |
| `cos` | 余弦函数 | `cos(0) = 1` |
| `tan` | 正切函数 | `tan(π/4) = 1` |
| `asin` | 反正弦函数 | `asin(0.5) = π/6` |
| `acos` | 反余弦函数 | `acos(0.5) = π/3` |
| `atan` | 反正切函数 | `atan(1) = π/4` |
| `sinh` | 双曲正弦 | `sinh(0) = 0` |
| `degrees_to_radians` | 角度转弧度 | `degrees_to_radians(180) = π` |

### 📈 4. 对数函数 (Logarithms)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `ln` | 自然对数 | `ln(e) = 1` |
| `log10` | 常用对数 | `log10(100) = 2` |
| `log` | 任意底数对数 | `log(8, 2) = 3` |
| `exp` | 指数函数 | `exp(1) = e` |

### 📊 5. 统计学 (Statistics)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `mean` | 平均值 | `mean([1,2,3,4,5]) = 3` |
| `median` | 中位数 | `median([1,2,3,4,5]) = 3` |
| `mode` | 众数 | `mode([1,1,2,3]) = 1` |
| `stdDev` | 标准差 | `stdDev([1,2,3,4,5]) = 1.58` |
| `variance` | 方差 | `variance([1,2,3,4,5]) = 2.5` |
| `max` | 最大值 | `max([1,2,3,4,5]) = 5` |
| `min` | 最小值 | `min([1,2,3,4,5]) = 1` |
| `sum` | 求和 | `sum([1,2,3,4,5]) = 15` |
| `product` | 乘积 | `product([1,2,3,4,5]) = 120` |
| `range` | 范围 | `range([1,2,3,4,5]) = 4` |

### 🎲 6. 组合数学 (Combinatorics)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `factorial` | 阶乘 | `factorial(5) = 120` |
| `permutation` | 排列 | `permutation(5, 3) = 60` |
| `combination` | 组合 | `combination(5, 3) = 10` |
| `fibonacci` | 斐波那契数 | `fibonacci(10) = 55` |

### 🔢 7. 数论 (Number Theory)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `gcd` | 最大公约数 | `gcd(12, 18) = 6` |
| `lcm` | 最小公倍数 | `lcm(12, 18) = 36` |
| `isPrime` | 素数判断 | `isPrime(17) = true` |
| `primeFactorization` | 质因数分解 | `primeFactorization(12) = [2,2,3]` |
| `eulerTotient` | 欧拉函数 | `eulerTotient(9) = 6` |
| `isPerfectNumber` | 完全数判断 | `isPerfectNumber(6) = true` |
| `divisorCount` | 因子个数 | `divisorCount(12) = 6` |
| `divisorList` | 因子列表 | `divisorList(12) = [1,2,3,4,6,12]` |

### 🔄 8. 复数运算 (Complex Numbers)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `complex_add` | 复数加法 | `(3+4i) + (1+2i) = 4+6i` |
| `complex_subtract` | 复数减法 | `(3+4i) - (1+2i) = 2+2i` |
| `complex_multiply` | 复数乘法 | `(3+4i) × (1+2i) = -5+10i` |
| `complex_divide` | 复数除法 | `(3+4i) ÷ (1+2i) = 2.2-0.4i` |
| `complex_magnitude` | 复数模长 | `|3+4i| = 5` |
| `complex_conjugate` | 复数共轭 | `conj(3+4i) = 3-4i` |
| `complex_argument` | 复数幅角 | `arg(3+4i) = 0.927` |
| `complex_polar` | 极坐标形式 | `3+4i = 5∠0.927` |

### 🔢 9. 矩阵运算 (Matrix Operations)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `matrix_add` | 矩阵加法 | `[[1,2],[3,4]] + [[5,6],[7,8]]` |
| `matrix_subtract` | 矩阵减法 | `[[1,2],[3,4]] - [[5,6],[7,8]]` |
| `matrix_multiply` | 矩阵乘法 | `[[1,2],[3,4]] × [[5,6],[7,8]]` |
| `matrix_determinant` | 行列式 | `det([[1,2],[3,4]]) = -2` |
| `matrix_transpose` | 矩阵转置 | `transpose([[1,2],[3,4]])` |
| `vector_dot_product` | 向量点积 | `[1,2,3] · [4,5,6] = 32` |
| `vector_magnitude` | 向量模长 | `|[3,4]| = 5` |

### 📊 10. 数值分析 (Numerical Analysis)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `numerical_integration` | 数值积分 | 梯形法则、辛普森法则 |
| `numerical_derivative` | 数值微分 | 数值求导 |
| `newton_method` | 牛顿法求根 | 方程求根 |
| `bisection_method` | 二分法求根 | 方程求根 |
| `lagrange_interpolation` | 拉格朗日插值 | 插值计算 |

### 💰 11. 金融计算 (Financial)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `compound_interest` | 复利计算 | 投资收益计算 |
| `present_value_annuity` | 年金现值 | 年金现值计算 |
| `future_value_annuity` | 年金未来值 | 年金未来值计算 |
| `loan_payment` | 贷款月供 | 等额本息月供 |
| `net_present_value` | 净现值 | NPV计算 |
| `internal_rate_of_return` | 内部收益率 | IRR计算 |
| `bond_price` | 债券价格 | 债券定价 |

### 🔄 12. 单位转换 (Conversions)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `length_conversion` | 长度转换 | 米、英尺、英寸互转 |
| `weight_conversion` | 重量转换 | 千克、磅、盎司互转 |
| `temperature_conversion` | 温度转换 | 摄氏度、华氏度、开尔文 |
| `area_conversion` | 面积转换 | 平方米、英亩等 |
| `time_conversion` | 时间转换 | 秒、分钟、小时等 |

### 📐 13. 几何计算 (Geometry)

| 工具名 | 描述 | 示例 |
|--------|------|------|
| `circle_area` | 圆形面积 | `π × r²` |
| `rectangle_area` | 矩形面积 | `length × width` |
| `triangle_area` | 三角形面积 | `½ × base × height` |
| `sphere_volume` | 球体体积 | `⁴⁄₃ × π × r³` |
| `cylinder_volume` | 圆柱体积 | `π × r² × h` |
| `distance_between_points` | 点距离 | 两点间距离计算 |

> 💡 **提示**: 每个工具都包含完整的参数验证、错误处理和详细的使用说明。使用 MCP 协议的 `tools/list` 方法可以获取所有工具的完整定义。

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
├── src/                      # 源代码目录
│   ├── index.ts              # 主服务器文件
│   ├── types.ts              # 类型定义文件
│   └── modules/              # 数学模块目录
│       ├── basicMath.ts      # 基础数学运算
│       ├── rootOperations.ts # 根式运算
│       ├── trigonometry.ts   # 三角函数
│       ├── logarithm.ts      # 对数函数
│       ├── statistics.ts     # 统计学函数
│       ├── combinatorics.ts  # 组合数学
│       ├── numberTheory.ts   # 数论函数
│       ├── complex.ts        # 复数运算
│       ├── matrix.ts         # 矩阵运算
│       ├── numerical.ts      # 数值分析
│       ├── financial.ts      # 金融计算
│       ├── conversion.ts     # 单位转换
│       └── geometry.ts       # 几何计算
├── tests/                    # 测试文件目录
│   ├── unit/                 # 单元测试
│   │   ├── basicMath.test.ts
│   │   ├── rootOperations.test.ts
│   │   ├── trigonometry.test.ts
│   │   ├── logarithm.test.ts
│   │   ├── statistics.test.ts
│   │   ├── combinatorics.test.ts
│   │   ├── numberTheory.test.ts
│   │   ├── complex.test.ts
│   │   ├── matrix.test.ts
│   │   ├── numerical.test.ts
│   │   ├── financial.test.ts
│   │   ├── conversion.test.ts
│   │   └── geometry.test.ts
│   ├── integration/           # 集成测试
│   ├── performance/          # 性能测试
│   ├── jest.config.cjs       # Jest 配置文件
│   ├── setup.ts              # 测试环境设置
│   ├── coverage/             # 测试覆盖率报告
│   └── README.md             # 测试文档
├── build/                    # 编译输出目录
├── package.json              # 项目配置和依赖
├── package-lock.json         # 锁定依赖版本
├── tsconfig.json             # TypeScript 编译配置
├── .gitignore                # Git 忽略文件配置
├── LICENSE                   # MIT 许可证
└── README.md                 # 项目说明文档
```

## 📜 开发脚本

### 构建和运行

- `npm run build` - 编译 TypeScript 代码
- `npm start` - 构建并启动服务器
- `npm run dev` - 开发模式（监听文件变化自动重编译）

## 🧪 测试

项目包含完整的测试套件，覆盖所有 13 个数学模块。详细的测试说明和使用方法请参考：[测试文档](tests/README.md)

快速运行测试：

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行集成测试
npm run test:integration

# 生成覆盖率报告
npm run test:coverage
```

## ⚠️ 错误处理

服务器包含完善的错误处理机制：

1. **参数验证错误** - 当输入参数不符合要求时
2. **除零错误** - 当除法运算的除数为零时
3. **数学域错误** - 如负数开平方根、对数函数输入非正数等
4. **范围错误** - 如反三角函数输入超出定义域
5. **未知工具错误** - 当调用不存在的工具时

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

- **100+** 个数学工具
- **13** 个专业数学模块
- **266** 个测试用例
- **14** 个测试套件
- **100%** 测试覆盖率
- **100%** 测试通过率
- **完整** 的错误处理机制
- **TypeScript** 类型安全
- **模块化设计** 架构

## 🚀 性能特性

- **轻量级**: 编译后体积小，启动快速
- **内存高效**: 低内存占用，适合长期运行
- **类型安全**: 完整的 TypeScript 类型定义
- **错误恢复**: 单个计算错误不影响服务器运行

## 📚 API 参考

### 模块分类

| 模块 | 工具数量 | 主要功能 |
|------|----------|----------|
| 基础数学 | 6 | 加减乘除、求余、幂运算 |
| 根式运算 | 4 | 平方根、立方根、n次方根、绝对值 |
| 三角函数 | 8 | 基本三角函数、反三角函数、双曲函数 |
| 对数函数 | 4 | 自然对数、常用对数、任意底数对数、指数函数 |
| 统计学 | 10 | 平均值、中位数、标准差、方差等 |
| 组合数学 | 4 | 阶乘、排列组合、斐波那契、卡塔兰数 |
| 数论 | 8 | GCD、LCM、素数判断、质因数分解等 |
| 复数运算 | 8 | 复数四则运算、模长、共轭、极坐标 |
| 矩阵运算 | 7 | 矩阵运算、行列式、逆矩阵、向量运算 |
| 数值分析 | 16 | 数值积分、微分、求根、插值 |
| 金融计算 | 7 | 复利、年金、贷款、NPV、IRR、债券 |
| 单位转换 | 5 | 长度、重量、温度、面积、时间转换 |
| 几何计算 | 6 | 平面几何、立体几何、坐标几何 |

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
