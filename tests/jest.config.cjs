/*
 * @Author: 杨仕明 shiming.y@qq.com
 * @Date: 2025-09-01 03:03:43
 * @LastEditors: 杨仕明 shiming.y@qq.com
 * @LastEditTime: 2025-09-01 16:06:16
 * @FilePath: /mcp_calculator/tests/jest.config.cjs
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "../",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/tests/**/*.test.ts", "**/tests/**/*.spec.ts"],
  transform: {
    "^.+.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transformIgnorePatterns: ["node_modules/(?!(@modelcontextprotocol)/)"],
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["node_modules", "build"],
  coverageDirectory: "tests/coverage",
  coverageReporters: ["text", "lcov", "html"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  testTimeout: 10000,
  verbose: true,
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
