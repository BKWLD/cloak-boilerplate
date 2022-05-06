/*
 * Config Sentry error logging
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { requireOnce } from '@cloak-app/utils'
export default function() {
	if (!process.env.SENTRY_DSN) return

	// Configure module
	defaultsDeep(this.options, { sentry: {
		config: {
			release: process.env.COMMIT_REF, // From Netlify
			environment: process.env.SENTRY_ENVIRONMENT || process.env.APP_ENV,
			extra: { // Netlify env variables
				url: process.env.URL,
				deploy_url: process.env.DEPLOY_URL
			}
		},
		publishRelease: {
			setCommits: {
				commit: process.env.COMMIT_REF // From Netlify
			}
		},
	}})

	// Only allow exceptions from own URL
	// https://docs.sentry.io/platforms/javascript/guides/vue/configuration/filtering/
	if (!this.options.sentry.config.allowUrls && process.env.URL) {
		this.options.sentry.config.allowUrls = [ process.env.URL ]
	}

	// Boilerplate ignorable urls
	if (!this.options.sentry.config.ignoreUrls) {
		this.options.sentry.config.ignoreUrls = ignoreUrls
	}

	// Boilerplate ignorable errors
	if (!this.options.sentry.config.ignoreErrors) {
		this.options.sentry.config.ignoreErrors = ignoreErrors
	}

	// Register the module
	requireOnce(this, '@nuxtjs/sentry')
}

// Boilerplate ignoreErorrs
// https://gist.github.com/impressiver/5092952
export const ignoreErrors = [
	// Random plugins/extensions
	'top.GLOBALS',
	// See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
	'originalCreateNotification',
	'canvas.contentDocument',
	'MyApp_RemoveAllHighlights',
	'http://tt.epicplay.com',
	'Can\'t find variable: ZiteReader',
	'jigsaw is not defined',
	'ComboSearch is not defined',
	'http://loading.retry.widdit.com/',
	'atomicFindClose',
	// Facebook borked
	'fb_xd_fragment',
	// ISP "optimizing" proxy - `Cache-Control: no-transform` seems to reduce this. (thanks @acdha)
	// See http://stackoverflow.com/questions/4113268/how-to-stop-javascript-injection-from-vodafone-proxy
	'bmi_SafeAddOnload',
	'EBCallBackMessageReceived',
	// See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
	'conduitPage',
	// Generic error code from errors outside the security sandbox
	// You can delete this if using raven.js > 1.0, which ignores these automatically.
	'Script error.'
]

// Boilerplate ignoreUrls
// https://gist.github.com/impressiver/5092952
export const ignoreUrls = [
	// Facebook flakiness
	/graph\.facebook\.com/i,
	// Facebook blocked
	/connect\.facebook\.net\/en_US\/all\.js/i,
	// Woopra flakiness
	/eatdifferent\.com\.woopra-ns\.com/i,
	/static\.woopra\.com\/js\/woopra\.js/i,
	// Chrome extensions
	/extensions\//i,
	/^chrome:\/\//i,
	// Other plugins
	/127\.0\.0\.1:4001\/isrunning/i,  // Cacaoweb
	/webappstoolbarba\.texthelp\.com\//i,
	/metrics\.itunes\.apple\.com\.edgesuite\.net\//i
]
