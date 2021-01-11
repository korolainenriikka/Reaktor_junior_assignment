import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { QueryClient, QueryClientProvider } from 'react-query'

//react-query:
const queryClient = new QueryClient()
//StateProvider -> <QueryClientProvider client={queryClient}>

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
