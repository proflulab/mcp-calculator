/*
 * @Author: 杨仕明 shiming.y@qq.com
 * @Date: 2025-09-01 02:33:27
 * @LastEditors: 杨仕明 shiming.y@qq.com
 * @LastEditTime: 2025-09-01 02:48:30
 * @FilePath: /mcp_calculator/src/types.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import { z } from "zod";

// 工具响应内容类型
export interface ToolContent {
  [x: string]: unknown;
  type: 'text';
  text: string;
  _meta?: { [x: string]: unknown };
}

// 工具响应类型
export interface ToolResponse {
  content: ToolContent[];
  isError?: boolean;
}

// 工具定义类型
export interface ToolDefinition {
  title: string;
  description: string;
  inputSchema: Record<string, z.ZodType>;
}

// 工具处理函数类型
export type ToolHandler<T = any> = (params: T) => Promise<{
  content: ToolContent[];
  isError?: boolean;
}>;

// 工具注册信息
export interface ToolRegistration {
  name: string;
  definition: ToolDefinition;
  handler: ToolHandler;
}

// 数学运算错误类型
export class MathError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MathError';
  }
}

// 通用数学运算结果格式化函数
export function formatResult(operation: string, operands: (string | number)[], result: number | string): string {
  return `${operation}结果：${operands.join(' ')} = ${result}`;
}

// 创建错误响应的辅助函数
export function createErrorResponse(message: string): ToolResponse {
  return {
    content: [{
      type: "text",
      text: `错误：${message}`
    }],
    isError: true
  };
}

// 创建成功响应的辅助函数
export function createSuccessResponse(text: string): ToolResponse {
  return {
    content: [{
      type: "text",
      text
    }]
  };
}