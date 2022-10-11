/*
 * Configure PWA package
 */
import { isDev } from '../helpers/env'
import defaultsDeep from 'lodash/defaultsDeep'
import { requireOnce } from '@cloak-app/utils'
export default function() {

	// Set default config
	const siteName = this.options.cloak?.boilerplate?.siteName
	defaultsDeep(this.options, { pwa: {
		meta: {

			// Set from options
			name: siteName,
			short_name: siteName,
			ogSiteName: siteName,
			twitterCard: 'summary_large_image',

			// Prevent fallback to package.json values
			theme_color: 'white',
			description: '',
			ogTitle: '',
			ogDescription: '',
			ogImage: '',
			author: '',
		},
		manifest: {

			// Set from options
			name: siteName,
			short_name: siteName,

			// Prevent fallback to package.json values
			description: ''
		}
	}})

	// Add the PWA module
	requireOnce(this, '@nuxtjs/pwa')
}
