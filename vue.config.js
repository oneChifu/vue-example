// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const IconfontPlugin = require('iconfont-plugin-webpack');

module.exports = {
  lintOnSave: false,

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  },

  configureWebpack: {
    plugins: [
      // new IconfontPlugin({
      //     src: './src/assets/icons', // required - directory where your .svg files are located
      //     family: 'iconfont', // optional - the `font-family` name. if multiple iconfonts are generated, the dir names will be used.
      //     dest: {
      //         font: './src/assets/fonts/[family].[type]', // required - paths of generated font files
      //         css: './src/assets/css/_iconfont_[family].scss' // required - paths of generated css files
      //     },
      //     watch: {
      //         pattern: 'src/assets/icons/**/*.svg', // required - watch these files to reload
      //         cwd: undefined // optional - current working dir for watching
      //     },
      //     // cssTemplate: function() {}// optional - the function to generate css contents
      // }),
      // new ExtractTextPlugin('[name].css')
    ],

    module: {
      // rules: [
      //     {
      //         test: /\.scss$/,
      //         use: ExtractTextPlugin.extract({
      //             fallback: 'style-loader',
      //             use: ['css-loader', 'sass-loader']
      //         })
      //     },
      //     {
      //         test: /\.(svg|eot|ttf|woff|woff2)$/,
      //         use: [
      //             {
      //                 loader: 'url-loader',
      //                 options: {
      //                     limit: 8192,
      //                     outputPath: 'assets/fonts/'
      //                 }
      //             }
      //         ]
      //     }
      // ]
    }
  }
};
