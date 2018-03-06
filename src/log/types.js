// @flow

export type LogEntry = {
  id: number,
  entryType: string,
  dataType: ?string,
  error: ?string,
  expression: ?string,
  html: ?string,
  instance: ?string,
  text: ?string
}
