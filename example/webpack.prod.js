const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    output: {
		filename: '[name].min.js'
	},
	devtool: 'source-map',
	plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ids.HashedModuleIdsPlugin(),
        new BundleAnalyzerPlugin()
    ]
});
