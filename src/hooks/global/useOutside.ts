import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type HookReturn = {
	ref: any;
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
};

export default function useOutside(isVisible: boolean): HookReturn {
	const [show, setShow] = useState(isVisible);
	const ref = useRef<HTMLElement>(null);

	const onClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setShow(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', onClickOutside, true);
		return () => {
			document.removeEventListener('click', onClickOutside, true);
		};
	});

	return { ref, show, setShow };
}
