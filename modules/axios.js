/*
 * Configure axios
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { requireLate } from '@cloak-app/utils'
import { isNetworkError } from 'axios-retry'
export default function() {

	// Set default config
	defaultsDeep(this.options, { axios: {

		// Prevent axios from using localhost:3000 when SSGed
		baseURL: process.env.URL,

		// Don't trigger loader UI
		progress: false,

		// Retry failed network requests up to 3 times
		retry: { retries: 3, retryCondition },
	}})

	// Add the Axios Nuxt module late so it can be used in plugins
	requireLate(this, '@nuxtjs/axios')
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
	let body
	try { body = JSON.parse(data) }
	catch (e) { return }

	// Ensure the request is not a mutation
	return typeof body.query === 'string' && !body.query.includes('mutation')
}

