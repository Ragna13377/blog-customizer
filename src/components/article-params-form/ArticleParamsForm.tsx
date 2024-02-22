import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useFormToggle } from 'components/article-params-form/hooks/useFormToggle';
import { ReactNode } from 'react';

type FormProps = {
	children: ReactNode;
	reset: () => void;
	apply: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};
export const ArticleParamsForm = ({ children, reset, apply }: FormProps) => {
	const { isOpen, formRef, toggleForm } = useFormToggle();
	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					{children}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={reset} />
						<Button title='Применить' type='submit' onClick={apply} />
					</div>
				</form>
			</aside>
		</>
	);
};
