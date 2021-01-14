import React from 'react'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom"

import Page from './Page'
import { Category } from '../types'

import { useProducts } from '../hooks'

const App: React.FC = () => {
  // per product isloading, + isloadingavailability + isupdating
  const {gloves, facemasks, beanies} = useProducts()

  return (
    <div>
      <h1>Inventory</h1>
      <Router basename={'/'}>
        <button>
          <Link to="/gloves">Gloves</Link>
        </button>
        <button>
          <Link to="/facemasks">Face masks</Link>
        </button>
        <button>
          <Link to="/beanies">Beanies</Link>
        </button>

        <Switch>
          <Route path="/gloves" render={() =>
            <Page
              category={Category.Gloves}
              items={gloves}
            />}
          />
          <Route path="/facemasks" render={() =>
            <Page
              category={Category.Facemasks}
              items={facemasks}
            />}
          />
          <Route path="/beanies" render={() =>
            <Page
              category={Category.Beanies}
              items={beanies}
            />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
