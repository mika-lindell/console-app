// @flow

import {ACTIONS} from './constants'

export type CommandLineExpression = {
  expression: string
}

export type LogItem = {
  expression: string,
  result: string,
  type: string,
  error: ?string
}

export type sandboxExpressionPayload = {
  type: ACTIONS.evaluateJsSend,
  payload: CommandLineExpression
}

export type sandboxResponsePayload = {
  type: ACTIONS.evaluateJsResponse,
  payload: LogItem
}
