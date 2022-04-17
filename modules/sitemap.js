/*
 * Add and configure sitemap module
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { isGenerating } from '../helpers/env'
import { requireOnce } from '@cloak-app/utils'
export default function() {
	if (!isGenerating) return
  if (!process.env.URL) return // Sitemap fatally errors if missing

	// Configure to load from project directory
	defaultsDeep(this.options, { sitemap: {

		// Get the hostname from Netlify
		hostname: process.env.URL,

		// Exclude all static routes, assuming everything is driven from
		// generate.routes
		exclude: ['**'],

	}})

	// Register the module
	requireOnce(this, '@nuxtjs/sitemap')
}
