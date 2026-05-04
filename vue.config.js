const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  parallel: false,
  devServer: {
    allowedHosts: "all"
  }
})
