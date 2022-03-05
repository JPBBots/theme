import theme, { DEFAULT_COLOR_MODE } from '@/theme'
import type { PropsWithChildren } from 'react'
import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManager,
  CSSReset,
  GlobalStyle,
  localStorageManager,
} from '@chakra-ui/react'
import { colors, createColor } from '@/theme/colors'
import { hex } from 'chroma-js'

export interface JPBProviderProps extends PropsWithChildren<unknown> {
  cookies?: string | unknown
  useCssReset?: boolean
  useGlobalStyle?: boolean
  brandColor?: string
}

/** For use in Next.JS in the _document.js file. */
export const NextColorModeScript = () => (
  <ColorModeScript initialColorMode={DEFAULT_COLOR_MODE} />
)

/** For importing the fonts used by our theme in Next.JS. */
export const NextFontHead = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
  </>
)

/** Wrapper to allow usage of the components within this library */
export const JPBProvider = ({
  cookies,
  useCssReset = true,
  useGlobalStyle = true,
  brandColor,
  children,
}: JPBProviderProps) => {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager

  if (brandColor) {
    const brand = hex(brandColor)
    const newColors = { ...colors }

    newColors.brand = createColor(brand)
    newColors.outline = brand.hex()

    theme.colors = newColors
    theme.shadows!.outline = `0 0 0 2px ${newColors.outline}`
  }

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {useCssReset && <CSSReset />}
      {useGlobalStyle && <GlobalStyle />}
      {children}
    </ChakraProvider>
  )
}
