const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HtmlWebpackPlugin to generate HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      // WebpackPwaManifest to generate the manifest file
      new WebpackPwaManifest({
        name: 'Your PWA Name',
        short_name: 'PWA',
        description: 'Description of your PWA',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // InjectManifest to inject the service worker into the bundle
      new InjectManifest({
        swSrc: './src/sw.js', // Path to your service worker file
        swDest: 'sw.js', // Output service worker file name
        exclude: [/\.map$/, /manifest\.json$/, /index\.html$/],
      }),
    ],
    module: {
      rules: [
        // CSS loader configuration
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader configuration
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
