import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home'
import State from './components/State'
import UI from './components/UI'

const App = () => {
    return <Router>
        <Switch>
            <Route
                exact
                path="/"
                render={ () => <Home /> }
            />
            <Route
                exact
                path="/state"
                render={ () => <State /> }
            />
            <Route
                exact
                path="/ui"
                render={ () => <UI /> }
            />
            <Route
                path="*"
                render={ () => <Redirect to="/" /> }
            />
        </Switch>
    </Router>
}

export default App