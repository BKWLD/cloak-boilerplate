import isRetryAllowed from 'is-retry-allowed'

// Retry on default conditions and when post request that
// has no mutation in the query string
export function retryCondition(error) {
	// Get the request body
	const data = error.config?.data
	const requestBody = data ? JSON.parse(data) : false

	// Limit to 500 codes
	const isRetryableError = error.code != 'ECONNABORTED' &&
	(!error.response || error.response.status >= 500 && error.response.status <= 599)

	const isNetworkError =
		!error.response &&
		Boolean(error.code) && // Prevents retrying cancelled requests
		error.code != 'ECONNABORTED' && // Prevents retrying timed out requests
		isRetryAllowed(error)

	// Retry POSTS requests with JSON body, with query property
	// that is a string that doesn't contain mutation
	const POSTWithQueryButNoMutation =
		error.config.method == 'post' && requestBody &&
		requestBody.query && !requestBody.query.includes('mutation')

	// Retry on Idempotent methods
	const isIdempotentMethod = ['get', 'head', 'options', 'put', 'delete']
		.indexOf(error.config.method) != -1

	const isIdempotentOrPOSTWithQueryAndNoMutation =
		!error.config ? false /* Cannot determine if the request can be retried */
		: isRetryableError && (isIdempotentMethod || POSTWithQueryButNoMutation)

	return isNetworkError || isIdempotentOrPOSTWithQueryAndNoMutation
}
