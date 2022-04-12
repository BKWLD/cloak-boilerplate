/*
 * Helpers for page components
 */
import { makeImgixUrl } from './url'

// Make a nuxt-style 404 response
export function notFound() {
	return this.error({
		statusCode: 404,
		message: 'Page not found',
	})
}

// Helper for making meta tags
export function metaTag(key, val, keyAttribute = null) {

	// Make the key attribute
	if (!keyAttribute) {
		keyAttribute = key.match(/^og:/) ? 'property' : 'name';
	}

	// Get image from Craft's array
	if (key === 'og:image' && Array.isArray(val) && val[0]?.path) {
		val = makeImgixUrl(val[0].path, 1200);
	}

	// Strip HTML by default, so WYSIWYG values can be passed in
	// https://stackoverflow.com/a/5002161/59160
	if (val) val = val.replace(/<\/?[^>]+(>|$)/g, '')

	// Return object in vue meta style
	return {
		hid: key,
		[`${keyAttribute}`]: key,
		content: val
	};
};
