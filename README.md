# @cloak-app/boilerplate

Modules that setup standard Cloak conventions.  [View demo](https://cloak-boilerplate.netlify.app/).

## Install

1. Install with `yarn add @cloak-app/boilerplate`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/boilerplate/nuxt']`

### Module Options

- `cloak.boilerplate:`
  - `helpers` - An array of filenames to include from the [helpers](./helpers) directory.  By default, all helpers are included.
  - `modules` - An array of filenames to include from the [modules](./modules) directory.  By default, all modules are included.
  - `polyfills` - Array of [polyfill.io](https://polyfill.io/) keywords.  For example, `["default", "URL", "IntersectionObserver"]`.  If `objectFit` is included, will add the [objectFitPolyfill](https://github.com/constancecchen/object-fit-polyfill) for VueVisual on IE11.
	- `siteName` - The name of the site, used to generate `<title>`, OG, and PWA tags.

## Breaking Changes

### Changes from @bkwld/cloak

- No polyfills are added by default
- Dropping support for Craft SSG generation with payloads
