/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '(.+)\\.js': '$1',
  },
  testPathIgnorePatterns: [
    '/examples/'
  ]
};

module.exports = config;
