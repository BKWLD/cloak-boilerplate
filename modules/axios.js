/*
 * Configure axios
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { requireLate } from '@cloak-app/utils'
export default function() {

	// Set default config
	defaultsDeep(this.options, { axios: {

		// Prevent axios from using localhost:3000 when SSGed
		baseURL: process.env.URL,

		// Don't trigger loader UI
		progress: false,

	}})

	// Add the Axios Nuxt module late so it can be used in plugins
	requireLate(this, '@nuxtjs/axios')
}
