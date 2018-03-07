// @flow
// This is the script which will execute in sandbox
// It's embedded as an iframe and will communicate with our app via postMessage

import {ACTIONS} from './constants'

// TODO: Move to utils
// Just to be on the safe side we don't use conditions to check type
function getTypeName(subject: any): ?string {
  try {
    return typeof subject
  } catch (err) {
    return undefined
  }
}

// TODO: Move to utils
// try ... catch because some typeof-checks return undefined, though they exist...
// typeof document.all === 'undefined' for example
function getInstanceName(subject: any): ?string {
  try {
    return subject.constructor.name
  } catch (err) {
    return undefined
  }
}

// TODO: Move to utils
// Parse HTML Dom object to string
function getElementAsString(element: any): ?string {
  const isDocument = element instanceof Document
  const isAnyElement = element instanceof HTMLElement
  // It's HTML document
  if (isDocument) {
    return `${new XMLSerializer().serializeToString(
      element.doctype
    )}\r\n${element.documentElement.outerHTML}`
  }
  // It's any other HTML element
  if (isAnyElement) {
    return element.outerHTML
  }
  // Not HTML element object
  return undefined
}

// Parse any Javascript collection item to string
function getCollectionItemAsString(
  collection: any,
  key: string | number,
  isArray: boolean = false
) {
  // Print item w/ key/index
  if (isArray) {
    return `${getAnythingAsString(collection[key], false)}`
  }
  // Print item w/o key/index
  return `${key}: ${getAnythingAsString(collection[key], false)}`
}

// TODO: Move to utils
// Parse anything Javascript to string
function getAnythingAsString(something: any, deep: boolean = true): string {
  // Parse objects, arrays and collections
  if (typeof something === 'object' || something instanceof HTMLAllCollection) {
    // When we just want to display the type of the object, not its contents
    if (!deep) {
      return String(something)
    }

    const stringified = []
    const keys = Object.keys(something)
    const isArray = something instanceof Array
    const prefix = isArray ? '[' : '{'
    const suffix = isArray ? ']' : '}'

    for (let key of keys) {
      stringified.push(getCollectionItemAsString(something, key, isArray))
    }
    return `${prefix} ${stringified.join(', ')} ${suffix}`
  }

  // Parse functions
  if (typeof something === 'function') {
    return String(something)
  }

  // Parse strings
  if (typeof something === 'string') {
    return `'${something}'`
  }

  // Parse anything else
  return String(something)
}

// Proxy desired console. -commands
// Applies only to commands executed inside sandbox
// function interceptConsole(method: string) {
//   const original = console[method]
//   console[method] = function() {
//     // Do not notify app about console entry if
//     // first arg equals @ignore
//     if (arguments[0] !== '@ignore') {
//       const response = {
//         type: ACTIONS.consoleResponse,
//         payload: {
//           text: getAnythingAsString(arguments),
//         },
//       }
//       window.parent.postMessage(response, '*')
//     }
//     // Call "real" console. -command
//     original.apply(console, arguments)
//   }
// }

// Uncomment to enable capturing of log events
// interceptConsole('info')
// interceptConsole('log')
// interceptConsole('warn')
// interceptConsole('error')

window.addEventListener('message', function(ev: MessageEvent) {
  console.log('@ignore', 'Sandbox received an action:', ev.data)
  // $FlowFixMe
  const {type, payload} = ev.data
  let result = undefined
  let text = undefined
  let html = undefined
  let error = undefined

  switch (type) {
    case ACTIONS.evaluateJsSend:
      // Declarations not wrapped in scope should be global scope
      const parsedExpression = payload.expression
        ? payload.expression.trim().replace(/^const |let |var /g, '')
        : payload.expression

      try {
        // eslint-disable-next-line no-eval
        result = window.eval(parsedExpression)
        text = getAnythingAsString(result)
        html = getElementAsString(result)
      } catch (err) {
        error = err.toString()
      }

      // Send back eval results
      const response = {
        type: ACTIONS.evaluateJsResponse,
        payload: {
          expression: payload.expression,
          text,
          html,
          dataType: getTypeName(result),
          instance: getInstanceName(result),
          error,
        },
      }
      ev.source.postMessage(response, ev.origin)
      console.log('@ignore', 'Sandbox sent an action:', response)
      break
    // Handle cases where action is of unknown type
    default:
      const actionErrorMessage = `Sandbox didn't recognize action '${type}':`
      console.error('@ignore', actionErrorMessage, ':', ev.data)
      // Send error message as response
      const actionErrorResponse = {
        type: ACTIONS.evaluateJsResponse,
        payload: {
          error: actionErrorMessage,
        },
      }
      ev.source.postMessage(actionErrorResponse, ev.origin)
  }
})
