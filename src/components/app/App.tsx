import { useAppStateChanges } from 'components/app/hooks/useAppStateChanges';
import styles from 'src/styles/index.module.scss';
import { CSSProperties } from 'react';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

export const App = () => {
	const { appliedState, ...appStateParameters } = useAppStateChanges();
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm {...appStateParameters} />
			<Article />
		</main>
	);
};
