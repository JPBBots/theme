import { ComponentStyleConfig } from '@chakra-ui/react'

export const ModalStyle: ComponentStyleConfig = {
  parts: [
    'overlay',
    'dialogContainer',
    'dialog',
    'header',
    'closeButton',
    'body',
    'footer',
  ],
  baseStyle: {
    overlay: {},
    dialogContainer: {
      display: 'flex',
      zIndex: '999',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto',
    },
    dialog: {
      borderRadius: 'md',
      bg: '#2D3748',
      color: 'white',
      my: '3.75rem',
      zIndex: '999',
      maxW: '500px',
    },
    header: {
      px: 6,
      py: 4,
      fontSize: '1.125rem',
      fontWeight: 'bold',
    },
    closeButton: {
      position: 'absolute',
      top: 2,
      insetEnd: 3,
    },
    body: {
      px: 6,
      py: 2,
      flex: 1,
    },
    footer: {
      px: 6,
      py: 4,
    },
  },
}
