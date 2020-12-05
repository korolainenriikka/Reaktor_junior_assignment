import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './Page'

const App: React.FC = () => {
  return (
    <div>
      <h1>Inventory</h1>
      <Router>
        <button>
          <Link to="/jeans">Jackets</Link>
        </button>
        <button>
          <Link to="/shirts">Shirts</Link>
        </button>
        <button>
          <Link to="/accessories">Accessories</Link>
        </button>

        <Switch>
          <Route path="/jeans" render={() => <Page category='jackets' />} />
          <Route path="/shirts" render={() => <Page category='shirts' />} />
          <Route path="/accessories" render={() => <Page category='accessories' />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
