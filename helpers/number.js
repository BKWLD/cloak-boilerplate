/*
 * Helpers related to numbers
 */

// Add two decimal places
export function twoDecimals(val) {
	const locale = navigator?.language || 'en-US'
	return Number(val).toLocaleString(locale, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}
