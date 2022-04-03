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
}
