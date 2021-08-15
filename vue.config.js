module.exports = {
    publicPath: '',
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
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