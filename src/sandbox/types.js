// @flow

import type {LogEntry} from '../log/types'
import type {CommandLineExpression} from '../commandLine/types'

export type sandboxExpressionPayload = {
  type: string,
  payload: CommandLineExpression
}

export type sandboxResponsePayload = {
  type: string,
  payload: LogEntry
}
