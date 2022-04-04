/*
 * Configure static generation rules
 */
import { isGenerating } from '../helpers/env'
export default function() {

	// Always show output
	this.options.build.quiet = false

	// Exit immediately when a route fails
	this.nuxt.hook('generate:routeFailed', ({ errors }) => {
		errors.forEach(error => console.error(error))
		process.exit(1)
	})

	// Support falling back to a resolvable file on Netlify if a route didn't
	// exist when build was run.  We only want this to run when _not_ using
	// generate so we return true 404s.
	this.options.generate.fallback = isGenerating ? false : '404.html'

	// Restrict the number of simulateneous requests so we don't consume too
	// many server connections.
	this.options.generate.concurrency = 20

	// Don't use Nuxt 2.13 Crawler since we're explicitly creating all the
	// routes we care about and don't want to generate dead links.
	this.options.generate.crawler = false

	// Sub folders, set to false to remove the trailing slashes
	this.options.generate.subFolders = false
}
