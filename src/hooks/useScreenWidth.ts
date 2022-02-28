import { DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH } from '@/theme/breakpoints'
import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [state, setState] = useState({
    width: 'window' in global ? window.innerWidth : 1,
    height: 'window' in global ? window.innerHeight : 1,
  })

  useEffect(() => {
    if ('window' in global) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      handler()

      setTimeout(() => handler(), 2e3)

      window.addEventListener('resize', handler)

      return () => {
        window.removeEventListener('resize', handler)
      }
    } else return () => {}
  }, [])

  return state
}

/**
 * Use dynamic sizes
 */
export const uWS = (windowSizes: {
  [key: number]: string | number | undefined
}) => {
  const { width } = useWindowSize()

  const sizes = Object.keys(windowSizes).sort(
    (a, b) => Number(b) - Number(a),
  ) as unknown as number[]
  const [size, setSize] = useState(windowSizes[sizes.length - 1])

  useEffect(() => {
    setSize(
      windowSizes[
        (sizes.find((x) => width > Number(x) && windowSizes[x]) ??
          windowSizes[sizes.length - 1]) as number
      ],
    )
  }, [width])

  return size
}

/**
 * Width less than
 * @param num Width
 */
export const wLT = (num: number) => {
  const windowDimensions = useWindowSize()
  const [meetsWidth, setMeetsWidth] = useState(false)

  useEffect(() => {
    setMeetsWidth(windowDimensions.width < num)
  }, [windowDimensions.width])

  return meetsWidth
}

/**
 * Width more than
 * @param num Width
 */
export const wMT = (num: number) => {
  const windowDimensions = useWindowSize()
  const [meetsWidth, setMeetsWidth] = useState(false)

  useEffect(() => {
    setMeetsWidth(windowDimensions.width > num)
  }, [windowDimensions.width])

  return meetsWidth
}

/**
 * Device constant (use Device Width)
 */
export const uDW = (sizes: {
  mobile?: number | string
  tablet?: number | string
  desktop?: number | string
}) => {
  return uWS({
    [DESKTOP_WIDTH]: sizes.desktop,
    [TABLET_WIDTH]: sizes.desktop,
    [MOBILE_WIDTH]: sizes.tablet,
    0: sizes.mobile,
  })
}
