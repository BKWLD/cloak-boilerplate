/*
 * Add and configure Fontagon
 */
import { join } from 'path'
import kebabCase from 'lodash/kebabCase'
export default function() {

	// Register the module
	this.requireModule('nuxt-fontagon')

	// Configure to load from project directory
	this.options.iconFont = {

		// Generate from the project's assets/fonts/fontagon folder
		files: ['assets/fonts/fontagon/*.svg'],
		dist: 'assets/fonts/fontagon/dist',
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

		// Support overriding from project
		...this.options.iconFont
	}
}
