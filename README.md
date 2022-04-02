# @cloak-app/boilerplate

Modules that setup standard Cloak conventions.  [View demo](https://cloak-boilerplate.netlify.app/).

```vue
<cloak-boilerplate />
```

## Install

1. Install with `yarn add @cloak-app/boilerplate`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/boilerplate/nuxt']`

### Project Dependencies

- `.max-w*` styles (included in Cloak via `whitespace.styl`)

### Module Options

- `cloak.boilerplate:`
  - `maxWidthClass` - The default max-width class to use for the block.

## Components

### `cloak-boilerplate-block`

Renders a Block to be used within a Tower.

- props:
  - `maxWidthClass` - A `max-w-*` class to apply to the block
