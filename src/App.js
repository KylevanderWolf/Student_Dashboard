import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from './HomePage'
import FavoritePage from './FavoritePage'

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <HomePage />} />
                <Route path="/FavoritePage" render={() => <FavoritePage />} />
            </Switch>
        </BrowserRouter>
    );
}

export default App