/*
 * Helpers related to the Nuxt build phase
 */

// Are we running in dev move?
export const isDev = process.env.NODE_ENV == 'development'

// Are we doing static generation
export const isGenerating = process.env.npm_lifecycle_event == 'generate'
