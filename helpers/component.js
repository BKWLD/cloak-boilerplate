/*
 * Helpers related to Vue and component-ness
 */
import Vue from 'vue'

// Mount a component on the body, like a modal, and return the mounted component
// instance. The "component" argument should be a Vue component instance, like
// returned from importing a single file component.
export function mountOnBody(component, options = {}) {
	return new Promise(function(resolve) {
		const mount = function() {

			// Retry if nuxt not ready
			if (!window.$nuxt) return setTimeout(mount, 50)

			// Set default options
			if (!options.parent) options.parent = window.$nuxt.$root

			// Mount the compenent
			const vm = new (Vue.extend(component))(options)
			vm.$mount()
			document.body.appendChild(vm.$el)
			resolve(vm)
		};

		// Try to mount
		mount()
	})
}

// Add mixins at the app level
// https://github.com/nuxt/nuxt.js/issues/1593#issuecomment-384554130
export function extendApp(app, mixin) {
	if (!app.mixins) app.mixins = []
	app.mixins.push(mixin)
}
