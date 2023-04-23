const RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
const RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/

type RGBA = [number, number, number, number]

const hex2rgb = (hex: any): RGBA => {
  if (hex.match(RE_HEX)) {
    // remove optional leading #
    if (hex.length === 4 || hex.length === 7) {
      hex = hex.substr(1)
    }
    // expand short-notation to full six-digit
    if (hex.length === 3) {
      hex = hex.split('')
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    const u = parseInt(hex, 16)
    const r = u >> 16
    const g = (u >> 8) & 0xff
    const b = u & 0xff
    return [r, g, b, 1]
  }

  // match rgba hex format, eg #FF000077
  if (hex.match(RE_HEXA)) {
    if (hex.length === 5 || hex.length === 9) {
      // remove optional leading #
      hex = hex.substr(1)
    }
    // expand short-notation to full eight-digit
    if (hex.length === 4) {
      hex = hex.split('')
      hex =
        hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
    }
    const u = parseInt(hex, 16)
    const r = (u >> 24) & 0xff
    const g = (u >> 16) & 0xff
    const b = (u >> 8) & 0xff
    const a = Math.round(((u & 0xff) / 0xff) * 100) / 100
    return [r, g, b, a]
  }

  // we used to check for css colors here
  // if _input.css? and rgb = _input.css hex
  //     return rgb

  throw new Error(`unknown hex color: ${hex}`)
}

// ported from jQuery's $.type
const classToType = {}
for (let name of [
  'Boolean',
  'Number',
  'String',
  'Function',
  'Array',
  'Date',
  'RegExp',
  'Undefined',
  'Null',
]) {
  classToType[`[object ${name}]`] = name.toLowerCase()
}
const type: any = function (obj: any) {
  return classToType[Object.prototype.toString.call(obj)] || 'object'
}

const unpack = (args: any, keyOrder: any = null): any => {
  // if called with more than 3 arguments, we return the arguments
  if (args.length >= 3) return Array.prototype.slice.call(args)
  // with less than 3 args we check if first arg is object
  // and use the keyOrder string to extract and sort properties
  if (type(args[0]) == 'object' && keyOrder) {
    return keyOrder
      .split('')
      .filter((k: any) => args[0][k] !== undefined)
      .map((k: any) => args[0][k])
  }
  // otherwise we just return the first argument
  // (which we suppose is an array of args)
  return args[0]
}

const last = (args: any[]) => {
  if (args.length < 2) return null
  const l = args.length - 1
  if (type(args[l]) == 'string') return args[l].toLowerCase()
  return null
}

const { round } = Math

const rgb2hex = (...args: any[]) => {
  let [r, g, b, a] = unpack(args, 'rgba')
  let mode = last(args) || 'auto'
  if (a === undefined) a = 1
  if (mode === 'auto') {
    mode = a < 1 ? 'rgba' : 'rgb'
  }
  r = round(r)
  g = round(g)
  b = round(b)
  const u = (r << 16) | (g << 8) | b
  let str = '000000' + u.toString(16) //#.toUpperCase();
  str = str.substr(str.length - 6)
  let hxa = '0' + round(a * 255).toString(16)
  hxa = hxa.substr(hxa.length - 2)
  switch (mode.toLowerCase()) {
    case 'rgba':
      return `#${str}${hxa}`
    case 'argb':
      return `#${hxa}${str}`
    default:
      return `#${str}`
  }
}

export function changeAlpha(rgb: RGBA, newAlpha: number): RGBA {
  const copy: RGBA = [...rgb]

  copy[3] = newAlpha

  return copy
}

export const getWithAlpha = (hex: string, alpha: number): string => {
  const rgba = hex2rgb(hex)

  return rgb2hex(changeAlpha(rgba, alpha))
}
