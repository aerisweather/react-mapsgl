const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = merge(common, {
	mode: 'development',
    output: {
		filename: '[name].js'
	},
	devtool: 'inline-source-map',
	plugins: [
		// new BundleAnalyzerPlugin()
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public')
		},
        host: '127.0.0.1',
		port: 8080,
		hot: true,
		open: true,
		allowedHosts: 'all',
		historyApiFallback: {
			index: 'index.html'
		}
	}
});
