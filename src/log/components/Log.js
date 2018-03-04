// @flow

import React from 'react'
import {observer} from 'mobx-react'
import LogStore from '../store'
import css from './Log.css'

type LogProps = {
  entries: Array<any>
}

/** TODO
  Make this into stateful component
  and add this to componentDidUpdate:

  window.scroll({
    top: document.body.clientHeight,
    left: 0,
    behavior: 'smooth',
  })

*/
const Log = observer(({entries}: LogProps) => {
  return (
    <ul className={css.entries}>
      <li>
        <h1 className={css.title}>Console</h1>
      </li>
      {LogStore.entries.map((entry, index) => {
        const showType = entry.type || entry.instance
        return (
          <li className={css.entry} key={entry.id}>
            <div className={css.id}>{entry.id + 1}</div>
            <div className={css.dataWrapper}>
              <div className={css.expression}>{entry.expression}</div>
              <div className={css.data}>
                <div className={css.pointer}>=> </div>
                <pre className={css.result}>
                  {!entry.error && (
                    <div className={css.text}>
                      {entry.html && (
                        <code className="language-javascript">
                          {entry.html}
                        </code>
                      )}
                      {!entry.html && <samp>{entry.text}</samp>}
                      {showType && (
                        <span className={css.type}>
                          {' '}
                          [
                          {entry.type !== 'undefined' && (
                            <span>
                              {entry.type}
                              {entry.instance && ' '}
                            </span>
                          )}
                          {entry.instance !== 'undefined' && (
                            <span>{entry.instance}</span>
                          )}
                          ]
                        </span>
                      )}
                    </div>
                  )}
                  {entry.error && (
                    <div className={css.error}>{entry.error}</div>
                  )}
                </pre>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
})

Log.displayName = 'Log'
export default Log
