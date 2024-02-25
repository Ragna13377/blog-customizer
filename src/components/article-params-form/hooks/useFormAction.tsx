import { useRef, useState } from 'react';
import { OnClick } from 'components/arrow-button/ArrowButton';
import arrowStyles from 'components/arrow-button/ArrowButton.module.scss';

export function useFormAction() {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement | null>(null);
	const toggleForm: OnClick = (e) => {
		e.stopPropagation();
		setIsOpen(!isOpen);
	};
	const closeForm = () => {
		setIsOpen(false);
	};
	const isClickedButton = (event: MouseEvent) => {
		const targetElement = event.target as HTMLElement;
		return !targetElement.classList.contains(arrowStyles.container);
	};
	return {
		isOpen,
		formRef,
		toggleForm,
		closeForm,
		isClickedButton,
	};
}
