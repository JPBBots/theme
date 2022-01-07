import theme from '../src/theme/index.ts'
import { CSSReset, ChakraProvider } from '@chakra-ui/react'
import { JPBProvider } from "../src/utils/JPBProvider/JPBProvider";


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withChakra = (Story) =>
  (
    <JPBProvider>
      <Story />
    </JPBProvider>
  )


export const decorators = [
  withChakra
]
