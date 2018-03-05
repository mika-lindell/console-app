// @flow

import React, {PureComponent} from 'react'
import {observer} from 'mobx-react'
import PrismCode from 'react-prism'
import LogStore from '../store'
import css from './Log.css'

require('prismjs')

type LogProps = {}
type LogState = {
  availableMemory: number,
  totalMemory: number
}
type ChromeMemoryResult = {
  availableCapacity: number,
  capacity: number
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
@observer
class Log extends PureComponent {
  props: LogProps
  state: LogState = {
    availableMemory: -1,
    totalMemory: -1,
  }

  updateMemory: ChromeMemoryResult => void

  constructor(props) {
    super(props)
    this.updateMemory = this.updateMemory.bind(this)
  }

  componentWillMount() {
    /* eslint-disable */
    /* $FlowIgnore */
    if (chrome) {
      // $FlowIgnore
      chrome.system.memory.getInfo(this.updateMemory)
    }
    /* eslint-enable */
  }

  componentDidUpdate() {
    window.scroll({
      top: document.body.clientHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  updateMemory(result: ChromeMemoryResult) {
    this.setState({
      availableMemory: result.availableCapacity,
      totalMemory: result.capacity,
    })
  }

  // TODO: Move to utils
  // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
  formatBytes(bytes: number, decimals: number = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))}${sizes[
      i
    ]}`
  }

  render() {
    const {availableMemory, totalMemory} = this.state

    const chromeVersion = navigator.appVersion.match(/.*Chrome\/([0-9.]+)/)[1]

    return (
      <ul className={css.entries}>
        <li>
          <h1 className={css.title}>
            **** Chrome {chromeVersion} ****
            <br />
            {this.formatBytes(totalMemory)} ram system{' '}
            {this.formatBytes(availableMemory)} free
            <br />
            Ready.
          </h1>
        </li>
        {LogStore.entries.map((entry, index) => {
          const showType = entry.type || entry.instance
          return (
            <li className={css.entry} key={entry.id}>
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
                              {entry.html}
                            </PrismCode>
                          </span>
                        )}
                        {!entry.html && (
                          <PrismCode className="language-javascript">
                            {entry.text}
                          </PrismCode>
                        )}
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
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

Log.displayName = 'Log'
export default Log
