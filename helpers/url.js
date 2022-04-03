/*
 * Helpers related to URL parsing and creation
 */

// Format a URL for Imgix
export function makeImgixUrl(path, width) {
	if (!path) return
	if (!width) return `${process.env.IMGIX_URL}/${path}`
	return `${process.env.IMGIX_URL}/${path}?w=${width}&\
		fit=max&auto=format&auto=compress`
}

// Format a URL for Contentful
export function makeContentfulImageUrl(
	url, width, { height, format, quality, fit } = {}
) {

	// Require URL and width
	if (!(url && width)) return url

	// Create query params
	const params = { w: width }
	if (height) params.h = height
	if (format) params.fm = format
	if (quality) params.q = quality
	if (format === 'jpg') params.fl = 'progressive'
	if (fit) params.fit = fit

	// Make the URL
	return `${url}?${new URLSearchParams(params)}`;
};
