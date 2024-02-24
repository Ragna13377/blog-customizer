import path from 'path';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { WebpackOptions } from '../types/types';
export function getDevServer({
	paths,
}: WebpackOptions): DevServerConfiguration {
	return {
		historyApiFallback: true,
		static: path.resolve(__dirname, '../..', paths.output), // путь, куда "смотрит" режим разработчика
		compress: true, // это ускорит загрузку в режиме разработки
		port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
		open: true, // сайт будет открываться сам при запуске npm run dev
		hot: true,
		watchFiles: path.resolve(__dirname, '../..', paths.watchFiles),
	};
}
