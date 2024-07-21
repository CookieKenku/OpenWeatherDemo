module.exports = {
  root: true,
  extends: ['@react-native', 'prettier', 'plugin:react/jsx-runtime'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'object-shorthand': 'warn',
        'react/no-array-index-key': 'warn',
        'react/jsx-key': 'warn',
        'react/jsx-boolean-value': 'warn',
        'react/jsx-sort-props': 'warn',
        'import/first': 'warn',
        'import/newline-after-import': 'warn',
        'import/no-cycle': 'warn',
        'import/no-duplicates': 'warn',
        'import/no-extraneous-dependencies': 'warn',
        'import/order': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
              'unknown',
            ],
            pathGroups: [
              { pattern: 'react', group: 'external', position: 'before' },
              {
                pattern: 'react-native',
                group: 'external',
                position: 'before',
              },
              { pattern: '@react-*/**', group: 'external', position: 'before' },
              { pattern: '@*/**', group: 'external', position: 'before' },
              { pattern: 'react-*', group: 'external', position: 'before' },
              { pattern: 'react-*/**', group: 'external', position: 'before' },
              { pattern: '*', group: 'external', position: 'before' },
              {
                pattern: 'src/helpers/**',
                group: 'internal',
                position: 'after',
              },
              {
                pattern: 'src/api/**',
                group: 'internal',
                position: 'after',
              },
              {
                pattern: 'src/navigation/**',
                group: 'internal',
                position: 'after',
              },
              {
                pattern: 'src/screens/**',
                group: 'internal',
                position: 'after',
              },
              {
                pattern: 'src/components',
                group: 'internal',
                position: 'after',
              },
              { pattern: 'assets/**', group: 'internal', position: 'after' },
            ],
            pathGroupsExcludedImportTypes: ['react'],
          },
        ],
        'no-catch-shadow': 'off',
        'prefer-const': 'warn',
        'react/no-unstable-nested-components': [
          'warn',
          {
            allowAsProps: true,
          },
        ],
        'spaced-comment': 'warn',
        camelcase: [
          'warn',
          {
            allow: ['feels_like'],
          },
        ],
        eqeqeq: ['error', 'smart'],
      },
    },
  ],
  env: {
    jest: true,
  },
};
