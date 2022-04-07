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

	// Add the PWA module when not running dev mode. During dev mode, the
	// manifest.json was emitting 404 responses.  These only went away when
	// fully disabling the meta and manifest properites.
	if (!isDev) requireOnce(this, '@nuxtjs/pwa')
}
