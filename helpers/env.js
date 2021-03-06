/*
 * Helpers related to environment detection
 */

// Are we running in dev move?
export const isDev = process.env.NODE_ENV == 'development'

// Are we doing static generation
export const isGenerating = process.env.npm_lifecycle_event == 'generate'

// Is this a deployed, prod site
export const isPublicProd = process.env.APP_ENV?.includes('prod') &&
	!process.env.URL?.includes('netlify')
