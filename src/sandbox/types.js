// @flow
import {ACTIONS} from './constants'

export type sandboxExpression = {
  expression: string
}

export type sandboxResponse = {
  result: ?string,
  type: ?string,
  error: ?string
}

export type sandboxExpressionPayload = {
  type: ACTIONS.evaluateJsSend,
  payload: sandboxExpression
}

export type sandboxResponsePayload = {
  type: ACTIONS.evaluateJsResponse,
  payload: sandboxResponse
}
