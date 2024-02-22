import { useRef, useEffect, useState } from 'react';
import { OnClick } from 'components/arrow-button/ArrowButton';
import arrowStyles from 'components/arrow-button/ArrowButton.module.scss';

export function useFormToggle() {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLElement | null>(null);
	const toggleForm: OnClick = (e) => {
		e.stopPropagation();
		setIsOpen(!isOpen);
	};
	const handlerClickOutside = (event: MouseEvent) => {
		const targetElement = event.target as HTMLElement;
		const relativePosition = targetElement.compareDocumentPosition(
			formRef.current as Node
		);
		if (
			relativePosition !== 10 &&
			relativePosition !== 35 &&
			!targetElement.classList.contains(arrowStyles.container)
		) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		document.addEventListener('click', handlerClickOutside);
		return () => document.removeEventListener('click', handlerClickOutside);
	});

	return {
		isOpen,
		formRef,
		toggleForm,
	};
}
