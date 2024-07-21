module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  verbose: true,
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@?react-native|@react-navigation|moti/.*)'],
};
