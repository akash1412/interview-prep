export const cachedApiCall = (duration: number = 1500) => {
	let cache: Record<string, { value: unknown; expiry: number }> = {};

	return async (url: string) => {
		const key = url;
		const entry = cache[key];

		if (!entry || Date.now() > entry.expiry) {
			console.log("making a fresh api call");
			try {
				const resp = await fetch(url);
				cache[key] = { value: resp, expiry: Date.now() + duration };
				return resp;
			} catch (error) {
				console.log(error);
			}
		} else {
			return cache[key].value;
		}
	};
};
