interface FetchResponseInterface {
	code: number,
	data: any
}
interface fetchParam {
	url: string,
	method: string,
	type?: 'file',
	data?: any
}

const OnFetchService = ({url, method, type, data}: fetchParam) => {

	let headers = {'Content-Type': 'application/json'}
	const base_url = 'http://localhost:8001/api/'

	if (type === 'file') {
		headers['Content-Type'] = 'multipart/form-data'
	}

	return new Promise(async (resolve, reject) => {
		const res: any = await fetch(base_url + url, {
			method: method,
			body: data
		})

		console.log(res)
		console.log(typeof res)
	})
}

export default OnFetchService
