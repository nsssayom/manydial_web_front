module.exports = {
    publicPath: '',
    devServer: {
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
    }
}