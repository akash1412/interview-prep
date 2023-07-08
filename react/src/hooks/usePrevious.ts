import { useEffect, useRef, useState } from "react";

export function usePrevious<T>(value: T) {
	const previousValue = useRef<T>();
	console.log("called");
	useEffect(() => {
		if (previousValue.current !== value) {
			previousValue.current = value;
		}
	}, [value]);

	return previousValue.current;
}
