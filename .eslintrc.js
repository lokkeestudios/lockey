module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:react/recommended', 'eslint:recommended'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript'
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  plugins: ['prettier', 'react', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'warn',
    'no-control-regex': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': ['error', { functions: 'defaultArguments' }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
};
