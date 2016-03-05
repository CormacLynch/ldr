var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less-sourcemap');
var path = require('path');
var iconfont = require('gulp-iconfont');
var minifyCss = require('gulp-minify-css');
var consolidate = require('gulp-consolidate');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

function realPath(relativePath) {
	return path.join(__dirname, relativePath);
}

// Start all watch tasks by default
gulp.task('default', ['webpack-dev-server', 'less:build-dev', 'less:watch']);

// Single run development build
gulp.task('build-dev', ['iconfont', 'webpack:build-dev', 'less:build-dev']);

// Production build
gulp.task('build', ['iconfont', 'webpack:build', 'less:build-dev']);

/**
 * LESS development build
 */
gulp.task('less:build-dev', function () {
	gulp.src(['./css/less/style.less', './css/less/editor.less'])
	.pipe(less({
		paths: [
			'./css/less',
			'./node_modules'
		],
		sourceMap: {
			sourceMapRootpath: './css/less'
		}
	}))
	.on('error', function (error) {
		gutil.log(gutil.colors.red(error.message))
		// Notify on error. Uses node-notifier
		notifier.notify({
			title: 'Less compilation error',
			message: error.message
		})
	})
	.pipe(minifyCss({compatibility: 'ie8', keepSpecialComments: 0}))
	.pipe(gulp.dest('./css'));
});

/**
 * LESS watch
 */
gulp.task('less:watch', function () {
	gulp.watch('./css/less/**', ['less:build-dev']);
	gulp.watch('./fonts/icons/glyphs/*.svg', ['less:build-dev'])
});

/**
 * Icon fontkit build
 */
gulp.task('iconfont', function(){
	return gulp.src(['fonts/icons/glyphs/*.svg'])
	.pipe(iconfont({
		fontName: 'icons',
		normalize: true
	}))
	.on('codepoints', function(codepoints, options) {
		gulp.src('css/templates/icons.less')
			.pipe(consolidate('lodash', {
				glyphs: codepoints,
				fontName: options.fontName,
				fontPath: '../fonts/icons/',
				timeStamp: Math.floor(Date.now() / 1000)
			}))
			.pipe(gulp.dest('css/generated'));
	})
	.pipe(gulp.dest('fonts/icons'));
});

/**
 * Javascript production build
 */
gulp.task('webpack:build', function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({output: {comments: false}})
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError('webpack:build', err);
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

/**
 * Javascript dev build
 */
// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack:build-dev', err);
		}

		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true
		}));

		callback();
	});
});

gulp.task('webpack-dev-server', function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;
	myConfig.module.loaders[0].loaders.unshift('react-hot-loader');
	myConfig.entry.index.unshift('webpack/hot/only-dev-server')
	myConfig.entry.index.unshift('webpack-dev-server/client?http://0.0.0.0:3000');
	myConfig.output.publicPath = 'http://localhost:3000/';
	myConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		devtool: '#source-map',
		publicPath: myConfig.output.publicPath,
		hot: true,
		stats: {
			colors: true
		}
	}).listen(3000, 'localhost', function(err) {
		if (err) {
			throw new gutil.PluginError('webpack-dev-server', err);
		}

		gutil.log('[webpack-dev-server]', 'Listening at 0.0.0.0:3000');
	});
});
