// @flow

import type {LogEntry} from '../log/types'
import type {CommandExpression} from '../commandInput/types'

export type sandboxExpressionPayload = {
  type: string,
  payload: CommandExpression
}

export type sandboxResponsePayload = {
  type: string,
  payload: LogEntry
}
