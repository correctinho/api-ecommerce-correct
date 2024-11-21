import config from './jest.config';

module.exports = {
  ...config,
  testEnvironment: './prisma/prisma-test-environment.ts',
  testMatch: ['**/**/*.e2e-spec.ts'],
  // testRegex: '.e2e-spec.ts$',
};
// "test:e2e": "jest --config ./jest.e2e.ts"
