// @flow

window.addEventListener('message', function(ev: MessageEvent) {
  // $FlowFixMe
  const {action, expression} = ev.data
  console.log('Sandbox received an action:', ev.data)
  switch (action) {
    case 'evaluateJS':
      let result = undefined
      let error = undefined

      try {
        // Declarations not wrapped in scope should be global scope
        const parsedExpression = expression
          .trim()
          .replace(/^const |let |var /g, '')
        // eslint-disable-next-line no-eval
        result = window.eval(parsedExpression)
      } catch (err) {
        error = err.toString()
      }
      // Send the result back
      ev.source.postMessage(
        {
          action: 'evaluateJS',
          result: result,
          type: typeof result,
          error: error,
        },
        ev.origin
      )
      break
    default:
  }
})
