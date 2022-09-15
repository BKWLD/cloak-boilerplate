/*
 * Setup Axios retry rules via Plugin because nuxt/axios's serialization
 * of it's options (where you would normally set the retry settings) does
 * not play friendly with importing code from other packages.
 */
import axiosRetry, {
	isNetworkError,
	isIdempotentRequestError,
	isRetryableError,
} from 'axios-retry'

// Add Axios Retry by default and expose a helper method that can be used to
// apply it Axios instances
export default function ({ $axios }, inject) {
	addAxiosRetry($axios)
	inject('addAxiosRetry', axios => {
		addAxiosRetry(axios)
		return axios
	})
}

// Helper method for adding our bespoke retrying logic
export function addAxiosRetry(axios) {
	axiosRetry(axios, { retries: 2, retryCondition })
}

// Retry GQL requests that don't have a mutation
function retryCondition(error) {
	return isNetworkError(error) ||
		isIdempotentRequestError(error) ||
		isGQLQuery(error)
}

// Allow POST requests that look like GQL queries (aka, non-mutations)
function isGQLQuery(error) {

	// Only act on POSTs
	if (error.config.method != 'post') return

	// Test whether the request body is non-empty
	const data = error.config?.data
	if (!data) return

	// ... and contains JSON
	let query
	try { query = JSON.parse(data).query }
	catch (e) { return }

	// Ensure the request is not a mutation and that the error is retryable
	return !query.includes('mutation') && isRetryableError(error)
}
