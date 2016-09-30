module.exports = {
	outputPath: 'http://localhost:8079',
	port: 8079,
	open: true,
	historyApiFallback: true,
	proxy: {
		'/v1/*': {
			target: {
				host: 'pitchedse-stage.us-east-1.elasticbeanstalk.com',
				protocol: 'http:',
				port: 80
			},
			changeOrigin: true,
			secure: true
		}
	}
};
