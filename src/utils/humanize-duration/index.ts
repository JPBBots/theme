// English only version of https://github.com/EvanHahn/HumanizeDuration.js

/** https://raw.githubusercontent.com/EvanHahn/HumanizeDuration.js/main/LICENSE.txt

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org/>
*/

import type { Humanizer, Options } from 'humanize-duration'

function humanizer(passedOptions: Options) {
  var result = function humanizer(ms: any, humanizerOptions: any) {
    var options = assign({}, result, humanizerOptions || {})
    return doHumanization(ms, options)
  }

  return assign(
    result,
    {
      language: 'en',
      spacer: ' ',
      conjunction: '',
      serialComma: true,
      units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
      languages: {},
      round: false,
      unitMeasures: {
        y: 31557600000,
        mo: 2629800000,
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1,
      },
    },
    passedOptions,
  )
}

// The main function is just a wrapper around a default humanizer.
var humanizeDuration = humanizer({})

// Build dictionary from options
function getDictionary(): any {
  return {
    y: function (c: any) {
      return 'year' + (c === 1 ? '' : 's')
    },
    mo: function (c: any) {
      return 'month' + (c === 1 ? '' : 's')
    },
    w: function (c: any) {
      return 'week' + (c === 1 ? '' : 's')
    },
    d: function (c: any) {
      return 'day' + (c === 1 ? '' : 's')
    },
    h: function (c: any) {
      return 'hour' + (c === 1 ? '' : 's')
    },
    m: function (c: any) {
      return 'minute' + (c === 1 ? '' : 's')
    },
    s: function (c: any) {
      return 'second' + (c === 1 ? '' : 's')
    },
    ms: function (c: any) {
      return 'millisecond' + (c === 1 ? '' : 's')
    },
    decimal: '.',
  }
}

// doHumanization does the bulk of the work.
function doHumanization(ms: any, options: any) {
  var i, len, piece

  // Make sure we have a positive number.
  // Has the nice sideffect of turning Number objects into primitives.
  ms = Math.abs(ms)

  var dictionary = getDictionary()
  var pieces = []

  // Start at the top and keep removing units, bit by bit.
  var unitName, unitMS, unitCount
  for (i = 0, len = options.units.length; i < len; i++) {
    unitName = options.units[i]
    unitMS = options.unitMeasures[unitName]

    // What's the number of full units we can fit?
    if (i + 1 === len) {
      if (has(options, 'maxDecimalPoints')) {
        // We need to use this expValue to avoid rounding functionality of toFixed call
        var expValue = Math.pow(10, options.maxDecimalPoints)
        var unitCountFloat = ms / unitMS
        unitCount = parseFloat(
          (Math.floor(expValue * unitCountFloat) / expValue).toFixed(
            options.maxDecimalPoints,
          ),
        )
      } else {
        unitCount = ms / unitMS
      }
    } else {
      unitCount = Math.floor(ms / unitMS)
    }

    // Add the string.
    pieces.push({
      unitCount: unitCount,
      unitName: unitName,
    })

    // Remove what we just figured out.
    ms -= unitCount * unitMS
  }

  var firstOccupiedUnitIndex = 0
  for (i = 0; i < pieces.length; i++) {
    if (pieces[i].unitCount) {
      firstOccupiedUnitIndex = i
      break
    }
  }

  if (options.round) {
    var ratioToLargerUnit, previousPiece
    for (i = pieces.length - 1; i >= 0; i--) {
      piece = pieces[i]
      piece.unitCount = Math.round(piece.unitCount)

      if (i === 0) {
        break
      }

      previousPiece = pieces[i - 1]

      ratioToLargerUnit =
        options.unitMeasures[previousPiece.unitName] /
        options.unitMeasures[piece.unitName]
      if (
        piece.unitCount % ratioToLargerUnit === 0 ||
        (options.largest && options.largest - 1 < i - firstOccupiedUnitIndex)
      ) {
        previousPiece.unitCount += piece.unitCount / ratioToLargerUnit
        piece.unitCount = 0
      }
    }
  }

  var result = []
  for (i = 0, pieces.length; i < len; i++) {
    piece = pieces[i]
    if (piece.unitCount) {
      result.push(render(piece.unitCount, piece.unitName, dictionary, options))
    }

    if (result.length === options.largest) {
      break
    }
  }

  if (result.length) {
    var delimiter
    if (has(options, 'delimiter')) {
      delimiter = options.delimiter
    } else if (has(dictionary, 'delimiter')) {
      delimiter = dictionary.delimiter
    } else {
      delimiter = ', '
    }

    if (!options.conjunction || result.length === 1) {
      return result.join(delimiter)
    } else if (result.length === 2) {
      return result.join(options.conjunction)
    } else if (result.length > 2) {
      return (
        result.slice(0, -1).join(delimiter) +
        (options.serialComma ? ',' : '') +
        options.conjunction +
        result.slice(-1)
      )
    }
  } else {
    return render(
      0,
      options.units[options.units.length - 1],
      dictionary,
      options,
    )
  }
}

function render(count: any, type: any, dictionary: any, options: any) {
  var decimal
  if (has(options, 'decimal')) {
    decimal = options.decimal
  } else if (has(dictionary, 'decimal')) {
    decimal = dictionary.decimal
  } else {
    decimal = '.'
  }

  var countStr
  if (typeof dictionary._formatCount === 'function') {
    countStr = dictionary._formatCount(count, decimal)
  } else {
    countStr = count.toString().replace('.', decimal)
  }

  var dictionaryValue = dictionary[type]
  var word
  if (typeof dictionaryValue === 'function') {
    word = dictionaryValue(count)
  } else {
    word = dictionaryValue
  }

  if (dictionary._numberFirst) {
    return word + options.spacer + countStr
  }
  return countStr + options.spacer + word
}

function assign(destination: any, ..._args: any[]) {
  var source
  for (var i = 1; i < arguments.length; i++) {
    source = arguments[i]
    for (var prop in source) {
      if (has(source, prop)) {
        destination[prop] = source[prop]
      }
    }
  }
  return destination
}

function has(obj: any, key: any) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

humanizeDuration.getSupportedLanguages = function getSupportedLanguages() {
  return []
}

humanizeDuration.humanizer = humanizer

export default humanizeDuration as Humanizer
