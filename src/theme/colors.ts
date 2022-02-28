import { hex, Color } from 'chroma-js'

const brand = hex('#ea5454')
const bg = hex('#161e2e')

const createColor = (color: Color) => {
  return {
    5: color.alpha(0.05).hex(),
    10: color.alpha(0.1).hex(),
    20: color.alpha(0.2).hex(),
    40: color.alpha(0.4).hex(),
    50: color.alpha(0.5).hex(),
    60: color.alpha(0.6).hex(),
    80: color.alpha(0.8).hex(),
    90: color.alpha(0.9).hex(),
    100: color.alpha(1).hex(),
  }
}

export const colors = {
  bg: bg.hex(),
  bgo: createColor(bg),
  outline: brand.hex(),
  lighter: createColor(hex('#ffffff')),
  darker: createColor(hex('#000000')),
  brand: createColor(brand),
}
