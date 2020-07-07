const path = require('path');
console.log('------->', __dirname)
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/,
         use: [
           'file-loader'
         ]
       }
    ]
  }

};