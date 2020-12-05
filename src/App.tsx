import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import JeansPage from './JeansPage'
import ShirtsPage from './ShirtsPage'
import AccessoriesPage from './AccessoriesPage'

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/jeans" render={() => <JeansPage />} />
          <Route path="/shirts" render={() => <ShirtsPage />} />
          <Route path="/accessories" render={() => <AccessoriesPage />} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
