###
Render the boilerplate block from Craft block data
###
export default
	functional: true
	props: block: Object
	render: (create, { props: { block }, data }) ->
		create 'cloak-boilerplate-block', {
			...data
			props: block
		}
