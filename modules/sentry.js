/*
 * Config Sentry error logging
 */
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {
	if (!process.env.SENTRY_DSN) return

	// Register the module
	this.requireModule('@nuxtjs/sentry')

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
}
