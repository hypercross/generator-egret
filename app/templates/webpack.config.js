var webpack = require('webpack');

module.exports = {
	entry: './src/main.ts',
	output: {
		path: __dirname + '/bin',
		publicPath: '/bin/',
		filename: 'bundle.js'
	},
	resolve:{
		extensions: ['', '.js', '.ts']
	},
	module: {
		loaders: [
			{test: /.ts/, loader: 'ts-loader'}
		]
	},
	plugins:[
		// new webpack.optimize.UglifyJsPlugin()
	],
	devServer: {
		host: '0.0.0.0'
	}
}
