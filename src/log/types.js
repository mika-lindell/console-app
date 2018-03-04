// @flow

export type LogEntry = {
  id: number,
  expression: string,
  error: ?string,
  html: ?string,
  instance: ?string,
  text: ?string,
  type: ?string
}
