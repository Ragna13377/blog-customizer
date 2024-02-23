import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useFormAction } from 'components/article-params-form/hooks/useFormAction';
import { FormEvent, Fragment } from 'react';
import { Text } from 'components/text';
import { Separator } from 'components/separator';
import { FormElementsType } from 'src/components/app/hooks/useAppStateChanges';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import {
	TUseClose,
	useClose,
} from 'components/article-params-form/hooks/useClose';

type FormProps = {
	formElements: FormElementsType[];
	state: ArticleStateType;
	resetState: () => void;
	applyState: (e?: FormEvent) => void;
	changeState: (
		nameState: keyof ArticleStateType
	) => (selected: OptionType) => void;
};
export const ArticleParamsForm = ({
	state,
	formElements,
	resetState,
	applyState,
	changeState,
}: FormProps) => {
	const { isOpen, formRef, toggleForm, closeForm, isClickedButton } =
		useFormAction();
	useClose({
		isOpen,
		rootRef: formRef,
		onClose: closeForm,
		exception: isClickedButton,
	} as TUseClose);
	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={applyState}>
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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetState} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
