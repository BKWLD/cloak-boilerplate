/*
 * Configuration related to populating meta tags
 */
export default function() {

	// Add standard meta tags
	this.options.head = {
		meta: [
			{
				'http-equiv': 'X-UA-Compatible',
				content: 'IE=edge'
			},
			{
				name: 'msapplication-tap-highlight',
				content: 'no'
			},
			...this.options.head?.meta,
		],
		...this.options.head,
	}
};
