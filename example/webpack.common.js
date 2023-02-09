const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const PACKAGE = require('./package.json');

const IS_PROD = (process.env.NODE_ENV === 'production');

let deployPath = process.env.DEPLOY_PATH ? process.env.DEPLOY_PATH : null;
if (deployPath) {
	deployPath = deployPath.replace(/\{\{version\}\}/, PACKAGE.version);
}

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: deployPath || '/dist/',
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
        alias: {
            react: path.resolve('../node_modules/react')
        }
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: ['babel-loader']
		},{
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: ['babel-loader', 'ts-loader']
		},{
			test: /\.s?css$/,
			use: [{
				loader: MiniCssExtractPlugin.loader
			}, 'css-loader', 'sass-loader'],
		},{
			test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
			use: ['file-loader']
		}]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				extractComments: false,
				terserOptions: {
					ecma: 6,
				}
			})
		],
		chunkIds: 'named',	// always set to `named` to prevent numeric key conflicts
		splitChunks: {
			chunks: 'all',
			automaticNameDelimiter: '-',
			maxInitialRequests: IS_PROD ? 5 : Infinity,
			cacheGroups: {}
		},
		runtimeChunk: false
	},
	plugins: [
		new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
		new CleanWebpackPlugin({
			cleanAfterEveryBuildPatterns: ['dist'],
			dangerouslyAllowCleanPatternsOutsideProject: true
		}),
		new HtmlWebpackPlugin({
			inject: true,
			title: 'Demo',
			template: 'public/template.html',
			alwaysWriteToDisk: true
		}),
		new HtmlWebpackHarddiskPlugin({
			outputPath: path.resolve(__dirname, 'public')
		}),
        new webpack.DefinePlugin({}),
        new Dotenv({
            path: path.resolve(__dirname, '../.env')
        })
	]
};
