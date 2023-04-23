import { getWithAlpha } from '@/utils/chroma'

// @ts-expect-error global brand support
const globalBrand = global.brand as string

const brand = globalBrand ?? '#ea5454'
const bg = '#161e2e'

export const createColor = (color: string) => {
  return {
    5: getWithAlpha(color, 0.05),
    10: getWithAlpha(color, 0.1),
    20: getWithAlpha(color, 0.2),
    40: getWithAlpha(color, 0.4),
    50: getWithAlpha(color, 0.5),
    60: getWithAlpha(color, 0.6),
    80: getWithAlpha(color, 0.8),
    90: getWithAlpha(color, 0.9),
    100: getWithAlpha(color, 1),
  }
}

export const colors = {
  bg: bg,
  bgo: createColor(bg),
  outline: brand,
  lighter: createColor('#ffffff'),
  darker: createColor('#000000'),
  brand: createColor(brand),
}
