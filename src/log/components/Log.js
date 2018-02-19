// @flow

import React from 'react'
import {observer} from 'mobx-react'
import LogStore from '../store'
import css from './Log.css'

type LogProps = {
  entries: Array<any>
}

const Log = observer(({entries}: LogProps) => {
  return (
    <ul className={css.entries}>
      <li>
        <h1 className={css.title}>Console</h1>
      </li>
      {LogStore.entries.map((entry, index) => {
        return (
          <li className={css.entry} key={entry.id}>
            <div className={css.id}>{entry.id + 1}</div>
            <div className={css.data}>
              <div className={css.expression}>{entry.expression}</div>
              {!entry.error && (
                <div className={css.result}>
                  => <span className={css.resultHighlight}>
                    {entry.result}
                  </span>{' '}
                  ({entry.type})
                </div>
              )}
              {entry.error && <div className={css.error}>{entry.error}</div>}
            </div>
          </li>
        )
      })}
    </ul>
  )
})

Log.displayName = 'Log'
export default Log
