/*
 * Configure static generation rules
 */
import { isGenerating } from '../helpers/env'
export default function() {

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

	// Immediately exit for route level errors, like Axios errors.  The errors
	// array looks like:
	//	{
	//		type: 'unhandled',
	//		route: '/products/cam-wall-mounting-kit/19731607617609',
	//		error: // An actual exception object
	//	}
	this.nuxt.hook('generate:routeFailed', ({ errors }) => {
		errors.forEach(error => console.error(error))
		process.exit(1)
	})

	// Abort SSG if any of the errors weren't 404s with an "ENOENT" error. The
	// 404 errors don't fire the generate:routeFailed hook for some reason. The
	// errors array contains objects that look like:
	//	{
	//		type: 'handled',
	//		route: '/products/play-time-fabric-sock',
	//		error: {
	//			statusCode: 404,
	//			message: 'Page not found'
	//		}
	//	}
	this.nuxt.hook('generate:done', (generator, errors) => {
		if (errors.filter((error) => {
			return error?.error?.statusCode != 404
		}).length) process.exit(2)
	})

}
