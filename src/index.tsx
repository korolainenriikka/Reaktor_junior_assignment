import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { reducer, StateProvider } from './state'

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
)
