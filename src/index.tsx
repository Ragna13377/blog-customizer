import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, Fragment } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import { useAppStateChanges } from 'src/hooks/useAppStateChanges';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const { state, appRef, formElements, resetState, applyState, changeState } =
		useAppStateChanges();
	return (
		<div
			ref={appRef}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm reset={resetState} apply={applyState}>
				<Text as='h2' size={31} weight={800} uppercase dynamicLite>
					Задайте параметры
				</Text>
				{formElements.map(
					({ stateName, component, separatorCount, ...props }, index) => {
						const Tag = component;
						return (
							<Fragment key={index}>
								{[...Array(separatorCount)].map((el, ind) => (
									<Separator key={ind} />
								))}
								<Tag
									selected={state[stateName]}
									onChange={changeState(stateName)}
									{...props}
								/>
							</Fragment>
						);
					}
				)}
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
