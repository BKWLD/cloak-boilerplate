/*
 * Add GTM module
 */
import { isDev } from '../helpers/env'
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {

	// Configure Cloak defaults
	defaultsDeep(this.options, { gtm: {

		// Load id from ENV
		id: process.env.GTM_ID,

		// Enable during dev for using GTM preview mode as long as a GTM_ID was
		// specified. We still want to add the module so that calls to $gtm don't
		// fail locally if you comment out the GTM_ID.
		enabled: !process.env.GTM_ID,

		// This wasn't always the case, but these events appeat to fire after
		// the page title is updated. And, when testing this, I found that the
		// mounted() hook on page components was actually firing too early. In
		// other words, with mounted, I was seeing the previous page's title when
		// looking at GA realtime analytics.
		pageTracking: true,
		pageViewEventName: 'Page View',

		// Show debug events on dev
		debug: isDev,
	}})

	// Register the module
	this.requireModule('@nuxtjs/gtm')
}
