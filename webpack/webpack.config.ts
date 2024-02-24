import { EnvVariables } from './types/types';
import { webpackPaths } from './webpack.paths';
import { getCommonWebpack } from './buildWebpack/webpack.common';
import { getDevServer } from './buildWebpack/weback.devServer';
const { merge } = require('webpack-merge');
import webpack from 'webpack';

export default async ({ mode }: EnvVariables) => {
	const options = {
		mode: mode ?? 'dev',
		paths: webpackPaths,
	};
	const commonConfig = getCommonWebpack(options);
	const modeConfig = await import(`./buildWebpack/webpack.${mode}` as string);
	const mergeConfig = merge(commonConfig, modeConfig.default);
	if (mode === 'prod') return mergeConfig;
	else
		return {
			...mergeConfig,
			devServer: getDevServer(options),
		} as webpack.Configuration;
};
