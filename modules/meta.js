/*
 * Configuration related to populating meta tags
 */
export default function() {

	// Add standard meta tags
	this.options.head.meta.push({
		'http-equiv': 'X-UA-Compatible',
		content: 'IE=edge'
	})
	this.options.head.meta.push({
		name: 'msapplication-tap-highlight',
		content: 'no'
	})

	// Set the title using siteName
	const siteName = this.options.cloak?.boilerplate?.siteName
	if (siteName && !this.options.head.titleTemplate) {

		// Set siteName to env so it's accessible in titleTemplate.  It needs to be
		// done both ways for server and client.
		process.env.SITE_NAME = siteName
		this.options.env.SITE_NAME = siteName

		// Make the titleTemplate that appends the siteName
		this.options.head.titleTemplate = (title) => {
			if (title && title != process.env.SITE_NAME) {
				return `${title} | ${process.env.SITE_NAME}`
			} else {
				return process.env.SITE_NAME
			}
		}
	}
}
