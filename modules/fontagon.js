/*
 * Add and configure Fontagon
 */
import { join } from 'path'
import kebabCase from 'lodash/kebabCase'
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {

	// Configure to load from project directory
	defaultsDeep(this.options, { iconFont: {

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
	}})

	// Register the module
	this.requireModule('nuxt-fontagon')
}
