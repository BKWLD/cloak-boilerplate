/*
 * Configure axios
 */
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {

	// Add the Axios Nuxt module
	this.requireModule('@nuxtjs/axios')

	// Set default config
	defaultsDeep(this.options, { axios: {

		// Prevent axios from using localhost:3000 when SSGed
		baseURL: process.env.URL,

		// Don't trigger loader UI
		progress: false,

	}})
}
