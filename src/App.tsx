import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './Page'
import { category, Item } from './types'

import axios from 'axios'

import { useStateValue, setItems } from './state'
import { API_URL } from './constants'

const App: React.FC = () => {
  const [state, dispatch] = useStateValue()
  console.log(state)

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const { data: jacketListFromApi } = await axios.get<Item[]>(
          `${API_URL}/products/jackets`
        )
        dispatch(setItems(jacketListFromApi, category.Jackets))

        const { data: shirtListFromApi } = await axios.get<Item[]>(
          `${API_URL}/products/shirts`
        )
        dispatch(setItems(shirtListFromApi, category.Jackets))

        const { data: accessoriesListFromApi } = await axios.get<Item[]>(
          `${API_URL}/products/accessories`
        )
        dispatch(setItems(accessoriesListFromApi, category.Jackets))

      } catch (e) {
        console.error(e)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchItemList()
  }, [dispatch])

  return (
    <div>
      <h1>Inventory</h1>
      <Router>
        <button>
          <Link to="/jackets">Jackets</Link>
        </button>
        <button>
          <Link to="/shirts">Shirts</Link>
        </button>
        <button>
          <Link to="/accessories">Accessories</Link>
        </button>

        <Switch>
          <Route path="/jackets" render={() =>
            <Page
              category={category.Jackets}
              items={state.jackets}
            />}
          />
          <Route path="/shirts" render={() =>
            <Page
              category={category.Shirts}
              items={state.shirts}
            />}
          />
          <Route path="/accessories" render={() =>
            <Page
              category={category.Accessories}
              items={state.accessories}
            />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
