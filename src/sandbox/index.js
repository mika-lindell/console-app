// @flow
import {ACTIONS} from './constants'

window.addEventListener('message', function(ev: MessageEvent) {
  console.log('Sandbox received an action:', ev.data)
  // $FlowFixMe
  const {type, payload} = ev.data
  switch (type) {
    case ACTIONS.evaluateJsSend:
      let result = undefined
      let error = undefined

      try {
        // Declarations not wrapped in scope should be global scope
        const parsedExpression = payload.expression
          .trim()
          .replace(/^const |let |var /g, '')
        // eslint-disable-next-line no-eval
        result = window.eval(parsedExpression)
      } catch (err) {
        error = err.toString()
      }
      // Send the result back
      const response = {
        type: ACTIONS.evaluateJsResponse,
        payload: {
          result: result.toString(),
          type: typeof result,
          error,
        },
      }
      ev.source.postMessage(response, ev.origin)
      console.log('Sandbox sent an action:', response)
      break
    default:
    // TODO add switch default handler and deal with invalid action
  }
})
