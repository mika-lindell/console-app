// @flow

import type {LogEntry} from '../log/types'
import type {CommandExpression} from '../command/types'

export type sandboxExpressionPayload = {
  type: string,
  payload: CommandExpression
}

export type sandboxResponsePayload = {
  type: string,
  payload: LogEntry
}

export type ConsoleEntry = {
  type: string,
  content: any
}

export type consoleResponsePayload = {
  type: string,
  payload: ConsoleEntry
}
