/*
 * Add and configure sitemap module
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { isGenerating } from '../helpers/env'
import { requireOnce } from '@cloak-app/utils'
export default function() {
	if (!isGenerating) return
  if (!process.env.URL) return // Sitemap fatally errors if missing

	// Set defaults
	defaultsDeep(this.options, { sitemap: {

		// Get the hostname from Netlify
		hostname: process.env.URL,

	}})

	// Exclude all static routes, assuming everything is driven from
	// generate.routes. Can't use defaultsDeep for this, see
	// https://github.com/BKWLD/cloak-utils/issues/3
	if (!this.options.sitemap.exclude) {
		this.options.sitemap.exclude = ['**']
	}

	// Register the module
	requireOnce(this, '@nuxtjs/sitemap')
}
