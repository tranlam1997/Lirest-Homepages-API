/** @type {import('jest').Config} */
module.exports = {
  displayName: 'lirest-api',
  rootDir: 'test',
  bail: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  collectCoverage: true,
  testRegex: '.spec.ts$', // test files ending with .spec.ts
  coverageDirectory: '<rootDir>/../coverage',
  collectCoverageFrom : [
    '<rootDir>/../src/**/*.ts',
    '<rootDir>/**/*.ts',
    "!**/node_modules/**",
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/../src/$1',
    '^@test/(.*)$': '<rootDir>/$1'
  },
};