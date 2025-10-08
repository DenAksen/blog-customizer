import { useEffect, RefObject } from 'react';

interface UseOutsideClickCloseProps {
	isOpen: boolean;
	sidebarRef: RefObject<HTMLElement>;
	onClose?: () => void;
}

export const useOutsideSidebarClickClose = ({
	isOpen,
	sidebarRef,
	onClose,
}: UseOutsideClickCloseProps) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			if (
				target instanceof Node &&
				isOpen &&
				!sidebarRef.current?.contains(target)
			) {
				onClose?.();
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose, sidebarRef]);
};
