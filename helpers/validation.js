/*
 * Helpers related to field validation
 */

// Check if field is an email
export function isEmail(val) {
	return /\S+@\S+\.\S+/.test(val)
}
