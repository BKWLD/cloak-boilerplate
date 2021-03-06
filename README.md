# @cloak-app/boilerplate

Modules that setup standard Cloak conventions.

- [View demo](https://cloak-boilerplate.netlify.app/)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-boilerplate)

## Install

1. Install with `yarn add @cloak-app/boilerplate`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/boilerplate']`

### Module Options

Set these properties within `cloak: { boilerplate: { ... } }` in the nuxt.config.js:

- `helpers` - An array of filenames to *include* from the [helpers](./helpers) directory.  By default, all helpers are included. Filename extensions are optional.
- `excludedHelpers` - An array of filenames to *exclude* from the [helpers](./helpers) directory.  By default, this is empty. Filename extensions are optional.
- `modules` - An array of filenames to *include* from the [modules](./modules) directory.  By default, all modules are included. Filename extensions are optional.
- `excludedModules` - An array of filenames to *exclude* from the [modules](./modules) directory.  By default, this is empty. Filename extensions are optional.
- `polyfills` - Array of [polyfill.io](https://polyfill.io/) keywords.  For example, `["default", "URL", "IntersectionObserver"]`.  If `objectFit` is included, will add the [objectFitPolyfill](https://github.com/constancecchen/object-fit-polyfill) for VueVisual on IE11.
- `siteName` - The name of the site, used to generate `<title>`, OG, and PWA tags.

## Breaking Changes

### Changes from @bkwld/cloak

- No polyfills are added by default
- Dropping support for Craft SSG generation with payloads

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).
