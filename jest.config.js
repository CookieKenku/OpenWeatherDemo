module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
  verbose: true,
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@?react-native|@react-navigation|moti/.*)'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/tests/svgMock.js',
  },
};
