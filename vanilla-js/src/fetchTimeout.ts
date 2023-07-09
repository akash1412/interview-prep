export const handleFetchWithTimeout = (url: string, duration: number) => {
	return new Promise((resolve, reject) => {
		const abort = new AbortController();
		let timerId: undefined | number;
		fetch(url, {
			signal: abort.signal,
		})
			.then(res => {
				clearTimeout(timerId);
				resolve(res.json());
			})
			.catch(err => reject(err));
		timerId = setTimeout(() => {
			abort.abort("request timed out");
		}, duration);
	});
};
