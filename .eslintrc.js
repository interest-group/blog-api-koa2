module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017, //指定ECMAScript支持的版本，6为ES6，这里为了兼容async和await，设置为2017
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'promise'
  ],
  env: {
    'node': true
  },
  rules: {
    'no-debugger': 0
  },
}
