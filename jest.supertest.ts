import { config } from './jest.config';

module.exports = {
  ...config,
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.supertest-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
