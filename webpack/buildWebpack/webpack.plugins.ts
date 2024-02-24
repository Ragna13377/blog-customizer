import { WebpackOptions } from '../types/types';
import { Configuration } from 'webpack';
import HTMLWebpackPlugins from 'html-webpack-plugin';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function getPlugins({
	mode,
	paths,
}: WebpackOptions): Configuration['plugins'] {
	const isProd = mode === 'prod';
	const basePlugins: Configuration['plugins'] = [
		new HTMLWebpackPlugins({
			template: path.resolve(__dirname, '../..', paths.html),
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: isProd
				? 'static/styles/[name].[contenthash].css'
				: 'static/styles/[name].css',
		}),
	];
	if (!isProd) {
		basePlugins.push(new ReactRefreshWebpackPlugin());
	}

	return basePlugins;
}
