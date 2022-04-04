/*
 * Configure PWA package
 */
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {

	// Add the PWA module
	this.requireModule('@nuxtjs/pwa')

	// Set default config
	const siteName = this.options.cloak?.boilerplate?.siteName
	defaultsDeep(this.options, { pwa: { manifest: {
		theme_color: 'white',

		// Some defaults
		name: siteName,
		short_name: siteName,
		ogSiteName: siteName,
		twitterCard: 'summary_large_image',

		// Don't autogenerate these, rely on the head config and/or normal meta
		// fields
		description: '',
		ogTitle: '',
		ogDescription: '',
		ogImage: '',
		author: '',
	}}})
}
