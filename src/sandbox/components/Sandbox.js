// @flow

import React from 'react'
import type {Ref} from 'react'

type SandboxType = {
  iframeRef: (Ref<'iframe'>) => void
}

const Sandbox = ({iframeRef}: SandboxType) => (
  <iframe
    ref={iframeRef}
    title="Sandbox"
    src="sandbox.html"
    style={{display: 'none'}}
  />
)

Sandbox.displayName = 'Sandbox'
export default Sandbox
