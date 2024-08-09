const useTypeScript = false;

const lintEs = {
  env: {
    'browser': true,
    'jquery': true,
    'node': true,
    'es6': true
  },
  globals: {},
  parserOptions: {
    'sourceType': 'module',
    'ecmaVersion': 2021
  },
  rules: {
    'no-console': 'warn',
    'no-extra-semi': 'warn',
    'no-undef': 'warn',
    'quotes': [
      'warn', 'single'
    ],
    'space-before-blocks': [
      'warn', { 
        'functions': 'always' 
      }
    ] 
  }
};

const lintTs = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    tsconfigRootDir: __dirname,
    project: [ 
      './tsconfig.eslint.json' 
    ]
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'no-console': 'warn',
    'no-extra-semi': 'warn',
    'no-undef': 'warn',
    'quotes': [
      'warn', 'single'
    ],
    'space-before-blocks': [
      'warn', { 
        'functions': 'always' 
      }
    ],
  '@typescript-eslint/no-unsafe-call': 'warn',
  '@typescript-eslint/no-unsafe-member-access': 'warn',
  '@typescript-eslint/no-unsafe-return' : 'warn'
  },
};

module.exports = useTypeScript ? lintTs : lintEs;