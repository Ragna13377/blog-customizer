import { RefObject, useEffect } from 'react';

export type TUseClose = {
	isOpen: boolean;
	rootRef: RefObject<HTMLElement>;
	onClose: () => void;
	exception?: (event: MouseEvent) => boolean;
};
export function useClose({ isOpen, rootRef, onClose, exception }: TUseClose) {
	useEffect(() => {
		const isClickedOutside = (event: MouseEvent) => {
			const { target } = event;
			return (
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target)
			);
		};

		const handleCloseForm = (event: MouseEvent) => {
			if ((!exception || exception(event)) && isClickedOutside(event)) {
				onClose();
			}
		};
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleCloseForm);
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleCloseForm);
		};
	}, [isOpen, onClose, rootRef]);
}
