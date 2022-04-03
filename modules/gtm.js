/*
 * Add GTM module
 */
import { isDev } from '../helpers/build'
export default function() {
	if (!process.env.GTM_ID) return

	// Register the module
	this.requireModule('@nuxtjs/gtm')

	// Configure Cloak defaults
	this.options.gtm = {
		id: process.env.GTM_ID,

		// Enable during dev for using GTM preview mode
		enabled: true,

		// This wasn't always the case, but these events appeat to fire after
		// the page title is updated. And, when testing this, I found that the
		// mounted() hook on page components was actually firing too early. In
		// other words, with mounted, I was seeing the previous page's title when
		// looking at GA realtime analytics.
		pageTracking: true,
		pageViewEventName: 'Page View',

		// Show debug events on dev
		debug: isDev,

		// Support overriding from project
		...this.options.gtm
	}
}
