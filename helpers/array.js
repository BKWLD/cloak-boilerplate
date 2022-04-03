/*
 * Helpers related arrays
 */

// Filter an array to just non-empties
export function nonEmpty(array) {
	return array.filter(val => !!val)
}
