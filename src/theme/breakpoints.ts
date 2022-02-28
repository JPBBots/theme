export const DESKTOP_WIDTH = 1920
export const TABLET_WIDTH = 1353
export const MOBILE_WIDTH = 790

export const breakpoints = {
  mobile: '0px',
  tablet: `${MOBILE_WIDTH}px`,
  desktop: `${TABLET_WIDTH}px`,
} as const
