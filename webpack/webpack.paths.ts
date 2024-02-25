import { WebpackPaths } from './types/types';

export const webpackPaths: WebpackPaths = {
	src: 'src',
	entry: './src/index.tsx',
	output: './dist',
	html: './public/index.html',
	watchFiles: './public/**/*.html',
};
