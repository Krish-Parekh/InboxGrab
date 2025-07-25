interface IFetcher {
	url: string;
	init: RequestInit;
	error: string;
}

async function fetcher({ url, init, error }: IFetcher) {
	try {
		const response = await fetch(url, {
			...init,
			headers: {
				"Accept-Encoding": "gzip",
				...init.headers,
			},
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		return response.json();
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
		throw new Error(error);
	}
}

export function postFetcher() {
	return <ExtraArgs>(key: string, options?: Readonly<{ arg: ExtraArgs }>) => {
		return fetcher({
			url: key,
			init: {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(options?.arg),
			},
			error: "An error occured while posting to the server",
		});
	};
}
