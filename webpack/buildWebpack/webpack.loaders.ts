import { ModuleOptions } from 'webpack';
import { WebpackOptions } from '../types/types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function getLoaders({ mode }: WebpackOptions): ModuleOptions['rules'] {
	const isProd = mode === 'prod';
	const scriptLoader = {
		test: /\.[tj]sx?$/, //содержит регулярное выражение, которое содержит информацию какие файлы должны обрабатываться этим loader'ом
		use: [
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: !isProd,
				},
			},
		], // для того чтобы ts-loader корректно отработал нам нужен tsconfig его можно создать вручную, а можно создать автоматически
		/** чтобы проиницилизовать его автоматически можно установить пакет typesctipt глобально или использовать npx выполнив команду npx tsc --init
				После создания конфига нужно включить "allowJs": true, чтобы работать не только c typescript, также меняем "jsx": "react" чтобы мы могли работать с react компонентами и включаем карту ресурсов "sourceMap": true, пока на этом все вернемся в этот конфиг позже*/
		exclude: /node_modules/,
	};
	const styleLoader = {
		test: /\.(sa|sc|c)ss$/,
		use: [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			{
				loader: 'css-loader',
				options: {
					modules: {
						mode: 'local',
						localIdentName: '[name]__[local]__[hash:base64:5]',
						auto: /\.module\.\w+$/i,
					},
					importLoaders: 2, //Значение 2 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader.
				},
			},
			'postcss-loader',
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true,
				},
			},
		],
	};
	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: ['@svgr/webpack', 'url-loader'],
	};
	const imageLoader = {
		test: /\.(png|jp(e)?g|gif|webp|avif)$/,
		type: 'asset/resource',
		generator: {
			filename: isProd
				? 'static/images/[hash][ext][query]'
				: 'static/images/[name][ext][query]',
		},
	};
	const fontLoader = {
		test: /\.(woff(2)?|eot|ttf|otf)$/,
		type: 'asset/resource',
		generator: {
			filename: isProd
				? 'static/fonts/[hash][ext][query]'
				: 'static/fonts/[name][ext][query]',
		},
	};

	return [scriptLoader, styleLoader, svgLoader, imageLoader, fontLoader];
}
