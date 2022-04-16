/*
 * Plugin template that imports a helper and injects all methods.
 */
import * as helpers from '<%= options.helperFile %>'
export default function(context, inject) {
	for (const [name, helper] of Object.entries(helpers)) {

		// We bind the context to the method so any context method can be invoked
		// using `this`.
		if (typeof helper == 'function') {
			inject(name, helper.bind(context))

		// Some helpers are simple constants
		} else {
			inject(name, helper)
		}

	}
}
