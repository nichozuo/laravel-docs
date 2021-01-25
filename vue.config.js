module.exports = {
  lintOnSave: false,
  publicPath: '/docs/',
  devServer: {
    overlay: {
      warning: false,
      errors: false,
    },
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:8000/api',
        target: 'http://192.168.0.234:8000/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
}
