module.exports = {
	outputPath: 'http://localhost:8079',
	port: 8079,
	open: true,
	historyApiFallback: false,
	proxy: {
		'/v1/*': {
			target: {
				host: 'api-dev.pitched.apps.miquido.com',
				protocol: 'http:',
				port: 80
			},
			changeOrigin: true,
			secure: true
		}
	}
}
