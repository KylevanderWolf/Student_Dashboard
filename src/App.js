import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import UserProfile from './Components/UserProfile'
import Loader from './Components/Loader'
import { useTheme, StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider as SCThemeProvider } from "styled-components";
const Home = lazy(() => import('./Components/HomePage'));



const App = () => {
    const muiTheme = useTheme();
    return (
        <StylesProvider injectFirst>
            <SCThemeProvider theme={muiTheme}>
                <BrowserRouter >
                    <Suspense fallback={<Loader />}>
                        <Switch >
                            <Route exact path="/" render={() => <Home />} />
                            <Route exact path="/:studentname" render={() => <UserProfile />} />
                        </Switch>
                    </Suspense >
                </BrowserRouter >
            </SCThemeProvider>
        </StylesProvider>

    );
}

export default App