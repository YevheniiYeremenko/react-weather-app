module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'node',
  transformIgnorePatterns: [
    "/node_modules/(?!axios).+\\.js$"
  ]
};
