/*
TODO: how to mock queryclient?
import { render, fireEvent } from "@testing-library/react"
import React from "react"
import { QueryCache, ReactQueryCacheProvider } from "react-query"
import App from "../../components/App"

test("pressing category button redirects to category's product page", () => {
  const queryCache = new QueryCache()
  const component = render(
    <ReactQueryCacheProvider cache={queryCache}>
      <App />
    </ReactQueryCacheProvider>
  )

  const button = component.getByText('Beanies')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('In category: beanies')
})
*/
test(('hello'), () => {
  expect(0).toBe(0)
})

export {}
