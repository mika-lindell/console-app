// @flow

export type LogEntry = {
  id: number,
  expression: string,
  result: string,
  type: string,
  instance: string,
  error: ?string
}
