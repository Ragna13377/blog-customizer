import webpack from 'webpack';
import { WebpackOptions } from '../types/types';
import path from 'path';
import { getLoaders } from './webpack.loaders';
import { getPlugins } from './webpack.plugins';

export function getCommonWebpack(
	options: WebpackOptions
): webpack.Configuration {
	const isProd = options.mode === 'prod';
	return {
		entry: path.resolve(__dirname, '../..', options.paths.entry),
		output: {
			path: path.resolve(__dirname, '../..', options.paths.output), //путь куда будет собираться наш проект
			filename: isProd
				? 'static/scripts/[name].[contenthash].js'
				: 'static/scripts/[name].js', // имя нашего бандла
			publicPath: '/',
		},
		module: {
			rules: getLoaders(options),
		},
		resolve: {
			extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'], //указываем файлы с которыми будет работать webpack
			alias: {
				fonts: path.resolve(__dirname, '../..', options.paths.src, 'fonts'),
				src: path.resolve(__dirname, '../..', options.paths.src),
				components: path.resolve(
					__dirname,
					'../..',
					options.paths.src,
					'components'
				),
			},
		},
		plugins: getPlugins(options),
	};
}
