// export const config = {
//   testEnvironment: 'node',
//   preset: 'ts-jest',
//   rootDir: './',
//   modulePaths: ['<rootDir>'],
//   moduleNameMapper: {
//     '^src$': '<rootDir>/src/core',
//     '^src/(.+)$': '<rootDir>/src/$1',
//   },
//   modulePathIgnorePatterns: ['src/typings'],
//   testPathIgnorePatterns: [
//     '/node_modules./',
//     '<rootDir>/(coverage|dist|lib|tmp)./',
//   ],
// };

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

export const config: Config = {
  transform: {
    '^.+.(t|j)sx?$': '@swc/jest',
  },
  clearMocks: true,
  coverageProvider: 'v8',
};

export default config;
