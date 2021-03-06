/*
 * Add and configure Fontagon
 */
import { join } from 'path'
import kebabCase from 'lodash/kebabCase'
import defaultsDeep from 'lodash/defaultsDeep'
import { requireOnce } from '@cloak-app/utils'
export default function() {

	// Configure to load from project directory
	defaultsDeep(this.options, { iconFont: {

		// Generate from the project's assets/fonts/fontagon folder
		files: [join(this.options.srcDir, 'assets/fonts/fontagon/*.svg')],
		dist: join(this.options.srcDir, 'assets/fonts/fontagon/dist'),
		fontName: 'fontagon',

		// Use Stylus
		style: 'stylus',
		styleTemplate: {
			stylus: join(__dirname, '../templates/fontagon.hbs')
		},

		// Generate CSS class name
		classOptions: { classPrefix: 'icon' },
		rename: (fullpath) => {
			const name = fullpath
				.replace(/^.*[\\\/]/, '') // Get basename
				.replace(/\.svg$/, '') // Remove the ".svg"
			return kebabCase(name)
		},
	}})

	// Don't trigger SSG rebuild if only this dist changes
	this.options.generate.cache.ignore.push('**/fontagon/dist/*')

	// Register the module
	requireOnce(this, 'nuxt-fontagon')
}
