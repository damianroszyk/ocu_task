module.exports = {
    outputPath: 'http://localhost:8079',
    port: 8079,
    open: true,
    proxy: {
        '/api/*': {
            target: 'http://web-whitelabel-dev.pitched.apps.miquido.com/api/',
            secure: false
        }
    }
}