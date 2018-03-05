// @flow
// This is the script which will execute in sandbox
// It's embedded as an iframe and will communicate with our app via postMessage

import {pretty} from 'js-object-pretty-print'
import isArrayLikeObject from 'lodash/isArrayLikeObject'
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
// Because some typeof-checks return undefined, though they exist...
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
function getElementAsString(element: ?HTMLElement | ?Document): ?string {
  const isDocument = element instanceof HTMLDocument
  // const isDocumentElement = element instanceof HTMLHtmlElement
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

// TODO: Move to utils
// Parse anything Javascript to string
function getAnythingAsString(result: any): string {
  // If some people writing js libraries could just actually throw an error
  // When you have an error we could use try/catch ...
  if (isArrayLikeObject(result)) {
    return pretty(result)
  }
  return JSON.stringify(result, null, 2)
}

window.addEventListener('message', function(ev: MessageEvent) {
  console.log('Sandbox received an action:', ev.data)
  // $FlowFixMe
  const {type, payload} = ev.data
  let result = undefined
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
      } catch (err) {
        error = err.toString()
      }

      // Send back eval results
      const response = {
        type: ACTIONS.evaluateJsResponse,
        payload: {
          expression: payload.expression,
          text: getAnythingAsString(result),
          html: getElementAsString(result),
          type: getTypeName(result),
          instance: getInstanceName(result),
          error,
        },
      }
      ev.source.postMessage(response, ev.origin)
      console.log('Sandbox sent an action:', response)
      break
    // Handle cases where action is of unknown type
    default:
      const actionErrorMessage = `Sandbox didn't recognize action '${type}':`
      console.error(actionErrorMessage, ':', ev.data)
      // Send error message as response
      const actionErrorResponse = {
        type: ACTIONS.evaluateJsResponse,
        payload: {
          result: String(result),
          type: typeof result,
          error: actionErrorMessage,
        },
      }
      ev.source.postMessage(actionErrorResponse, ev.origin)
  }
})
