import { render } from '@testing-library/react'
import { JPBProvider, NextFontHead, NextColorModeScript } from './JPBProvider'

describe('JPBProvider', () => {
  it('should render', () => {
    render(<JPBProvider />)
  })
})

describe('NextFontHead', () => {
  it('should render', () => {
    render(<NextFontHead />)
  })
})

describe('NextColorModeScript', () => {
  it('should render', () => {
    render(<NextColorModeScript />)
  })
})
