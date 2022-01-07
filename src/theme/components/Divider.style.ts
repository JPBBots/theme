import { ComponentStyleConfig } from '@chakra-ui/react'

export const DividerStyle: ComponentStyleConfig = {
  baseStyle: {
    bg: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'currentColor',
  },
  variants: {
    default: {
      color: 'lighter.5',
    },
  },
  defaultProps: {
    variant: 'default',
  },
}
