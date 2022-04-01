const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  // output:{
  //   path:path.resolve(__dirname,'dist')
  // },
  chainWebpack: (webpackConfig) => {
    // 我们需要禁用 cache loader，否则客户端构建版本会从服务端构建版本使用缓存过的组件
    webpackConfig.module.rule("vue").uses.delete("cache-loader");
    webpackConfig.module.rule("js").uses.delete("cache-loader");
    webpackConfig.module.rule("ts").uses.delete("cache-loader");
    webpackConfig.module.rule("tsx").uses.delete("cache-loader");
    
    //设置别名
    webpackConfig.resolve.alias
        .set("@$", resolve("src"))
    if (!process.env.SSR) {
      // 将入口指向应用的客户端入口文件
      webpackConfig.entry("app").clear().add("./src/entry-client.ts");
      return;
    }

    // 将入口指向应用的服务端入口文件
    webpackConfig.entry("app").clear().add("./src/entry-server.ts");

    // 这允许 webpack 以适合于 Node 的方式处理动态导入，
    // 同时也告诉 `vue-loader` 在编译 Vue 组件的时候抛出面向服务端的代码。
    webpackConfig.target("node");
    // 这会告诉服务端的包使用 Node 风格的导出
    webpackConfig.output.libraryTarget("commonjs2");

    webpackConfig
      .plugin("manifest")
      .use(new WebpackManifestPlugin({ fileName: "ssr-manifest.json" }));

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 将应用依赖变为外部扩展。
    // 这使得服务端构建更加快速并生成更小的包文件。

    // 不要将需要被 webpack 处理的依赖变为外部扩展
    // 也应该把修改 `global` 的依赖 (例如各种 polyfill) 整理成一个白名单
    webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

    webpackConfig.optimization.splitChunks(false).minimize(false);

    webpackConfig.plugins.delete("preload");
    webpackConfig.plugins.delete("prefetch");
    webpackConfig.plugins.delete("progress");
    webpackConfig.plugins.delete("friendly-errors");

    webpackConfig.plugin('clean').use(new CleanWebpackPlugin());
    webpackConfig.plugin("limit").use(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      })
    );

    // webpackConfig.plugin('emptyWebpackBuildDetailPlugin').use(
    //   emptyWebpackBuildDetailPlugin, [{
    //     path: path.join(process.cwd(), 'log'),
    //     filename: 'compile-log.md'
    //   }]
    // )
  },
};
