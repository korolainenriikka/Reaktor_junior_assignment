import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './Page'
import { category } from './types'

const App: React.FC = () => {
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
          <Route path="/jackets" render={() => <Page category={category.Jackets} />} />
          <Route path="/shirts" render={() => <Page category={category.Shirts} />} />
          <Route path="/accessories" render={() => <Page category={category.Accessories} />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
