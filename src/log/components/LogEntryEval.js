// @flow

import React from 'react'
import PrismCode from 'react-prism'
import pretty from 'js-beautify'
import css from './LogEntryEval.css'
import {PRETTY_JS_OPTIONS, PRETTY_HTML_OPTIONS} from '../constants'
import type {LogEntry} from '../types'

require('prismjs')

type LogEntryProps = {
  entry: LogEntry
}

const LogEntryEval = ({entry}: LogEntryProps) => {
  const showType = entry.dataType || entry.instance
  return (
    <li className={css.entry}>
      <div className={css.id}>{entry.id + 1}</div>
      <div className={css.dataWrapper}>
        <div className={css.expression}>
          <PrismCode className="language-javascript">
            {entry.expression}
          </PrismCode>
        </div>
        <div className={css.data}>
          <div className={css.pointer}>=> </div>
          <div className={css.result}>
            {!entry.error && (
              <div className={css.text}>
                {entry.html && (
                  <span className={css.html}>
                    <PrismCode className="language-html">
                      {pretty.html(entry.html, PRETTY_HTML_OPTIONS)}
                    </PrismCode>
                  </span>
                )}
                {!entry.html &&
                entry.text && (
                    <PrismCode className="language-javascript">
                      {pretty.js(entry.text, PRETTY_JS_OPTIONS)}
                    </PrismCode>
                  )}
                {showType && (
                  <span className={css.dataType}>
                    {' '}
                    [
                    <span>
                      {entry.dataType}
                      {entry.instance && ' '}
                    </span>
                    {entry.instance !== 'undefined' && (
                      <span>{entry.instance}</span>
                    )}
                    ]
                  </span>
                )}
              </div>
            )}
            {entry.error && <div className={css.error}>{entry.error}</div>}
          </div>
        </div>
      </div>
    </li>
  )
}

LogEntryEval.displayName = 'LogEntryEval'
export default LogEntryEval
