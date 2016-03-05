var webpack = require('webpack/lib/webpack');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');

var NPM_EVENT = process.env.npm_lifecycle_event
var NODE_ENV = NPM_EVENT === 'prod' ? 'production' : 'development'

var envPlugin = new webpack.DefinePlugin({
	'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
});

var config = {
	cache: true,
	context: __dirname,
	entry: {
		head: './js/head/index.js',
		index: ['./js/index.js']
	},
	output: {
		path: path.resolve('js/'),
		filename: 'bundle-[name].js',
		sourceMapFilename: '[file].map'
	},
	eslint: {
		fix: true
	},
	module: {
		loaders: [
			{
				test: /\.js$|\.json$|\.jsx$/,
				loader: 'babel-loader',
				exclude: [nodeModulesDir]
			}
		]
	},
	plugins: [
		envPlugin,
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		modulesDirectories: ['vendor', 'node_modules']
	}
};

if (NPM_EVENT === 'build' || NPM_EVENT === 'prod') {
	config.module.preLoaders = [
		{
			test: /\.js$/,
			loader: 'eslint-loader',
			exclude: [nodeModulesDir, path.resolve('js/head/')]
		}
	];
}

module.exports = config;
