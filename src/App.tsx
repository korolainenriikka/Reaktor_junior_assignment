import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/jeans" render={() => <Page />} />
          <Route path="/shirts" render={() => <Page />} />
          <Route path="/accessories" render={() => <Page />} />
        </Switch>
      </Router>
    </div>
  )
}

const Page: React.FC = () => {
  return (
    <div>
      moi!
    </div>
  )
}

export default App
