import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { reducer, StateProvider } from './state'
import { QueryClient, QueryClientProvider } from 'react-query'

//react-query:
const queryClient = new QueryClient()
//StateProvider -> <QueryClientProvider client={queryClient}>

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </QueryClientProvider>,
  document.getElementById('root')
)
