module.exports = {
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
      '^~/(.*)$': '<rootDir>/$1',
      '^~~/(.*)$': '<rootDir>/$1',
      '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
      '^.+\\.js$': 'babel-jest',
      '.*\\.(vue)$': 'vue-jest',
  },
  reporters: ['default', 'jest-junit'],
};