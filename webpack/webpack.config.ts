import { EnvVariables } from './types/types';
import { webpackPaths } from './webpack.paths';
import { getCommonWebpack } from './build/webpack.common';
import { getDevServer } from './build/weback.devServer';
const { merge } = require('webpack-merge');
import webpack from 'webpack';

export default async ({ mode }: EnvVariables) => {
	const options = {
		mode: mode ?? 'dev',
		paths: webpackPaths,
	};
	const commonConfig = getCommonWebpack(options);
	const modeConfig = await import(`./build/webpack.${mode}` as string);
	const mergeConfig = merge(commonConfig, modeConfig.default);
	if (mode === 'prod') return mergeConfig;
	else
		return {
			...mergeConfig,
			devServer: getDevServer(options),
		} as webpack.Configuration;
};
