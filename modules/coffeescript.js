/*
 * Add support for coffeescript
 */
export default function() {
	if (this.nuxt.options.dev) {
		this.requireModule('nuxt-coffeescript-module')
	}
}
