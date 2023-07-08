import { useRef, useCallback } from "react";
export function useDebounce(cb: Function, delay: number) {
	const timerId = useRef<number>(0);

	const debounce = useCallback(
		(...args: any[]) => {
			clearTimeout(timerId.current);
			timerId.current = setTimeout(() => {
				cb.apply(undefined, args);
			}, delay);
		},
		[cb, delay]
	);

	return debounce;
}
