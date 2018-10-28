const path = require('path');

module.exports = {
  entry: './public/src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts')
  }
}