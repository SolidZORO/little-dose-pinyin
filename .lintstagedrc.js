module.exports = {
  'src/**/*.ts?(x)': ['prettier --write', 'eslint', 'git add'],
  // 'packages/**/*.(css|less)': ['prettier --write', 'stylelint"', 'git add'],
};
