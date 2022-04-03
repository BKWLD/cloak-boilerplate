/*
 * Helpers related strings and text
 */

// nl2br function, https://stackoverflow.com/a/784547/59160
export function nl2br(str) {
	return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
}

// Capitalize the first letter of a word
// https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
export function ucFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
