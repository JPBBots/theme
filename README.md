# Official JPBBots generic theme

View components here: https://theme.jpbbots.org/

# Get Started

### Add JPBBots github to your .npmrc

**.npmrc**
```
@jpbbots:registry=https://npm.pkg.github.com
```

### Install `@jpbbots/theme` and it's peer dependencies

```
npm i @jpbbots/theme @chakra-ui/react @emotion/react @emotion/styled framer-motion react-icons
```

### Add theme provider to react

Add this to your parent block, if you're doing react-dom, do it in the root, if you're using something like next, add it to your `_app.ts`

```tsx
/* */
  return (
    <JPBProvider useCssReset useGlobalStyle>
      <Component />
    </JPBProvider>
  )
/* */
```

# Usage

All imports from `@chakra-ui/react` will be styled accordingly

## Colors

There are 5 main colors; `bg`, `outline`, `lighter`, `darker`, `brand`

lighter, darker and brand all have color alphas so their color selector will look have a number next to them: 5, 10, 20, 40, 50, 60, 80, 90, 100

E.g `darker.20`, `lighter.100`, `brand.5`

*Brand is a Censor Bot color that can be used, but is generally just an accent color`

You can change the brand color by passing a `"#hex"` into `brandColor` of `JPBProvider`

# Examples

