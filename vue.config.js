const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  lintOnSave: false,
  publicPath: './',
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  configureWebpack: {
    devServer: {
      disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
      before(app) { // 改完接口需要重启才能生效
        
      }
    }
  },

}
