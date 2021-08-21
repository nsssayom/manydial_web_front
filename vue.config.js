module.exports = {
    publicPath: '',
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api/*': {
                target: 'https://api.manydial.com',
                changeOrigin: true,
                logLevel: "debug",
                secure: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /encoderWorker\.min\.js$/,
                    use: [{ loader: 'file-loader' }]
                }
            ]
        }
    }
}