interface fetchParam {
	url: string,
	method: string,
	data?: any
}

const OnFetchService = <T>({url, method, data}: fetchParam): Promise<T> => {
	const base_url = 'http://localhost:8001/api/'

	return fetch(base_url + url, {
		method: method,
		body: data
	}).then(res => {
		if (!res.ok) throw new Error(res.statusText)
		return res.json() as Promise<T>
	})
}

export default OnFetchService
