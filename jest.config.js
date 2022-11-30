module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*_protocols.ts',
    '!<rootDir>/src/**/protocols/**',
    '!<rootDir>/src/main/server.ts',
    '!<rootDir>/src/main/config/app.ts',
    '!<rootDir>/src/main/config/env.ts'
    // '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
