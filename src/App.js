import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from 'react';
import Loader from './Components/Loader'
import RandomAppointments from './Components/Random'
import { useDispatch } from 'react-redux';
import { allAppointments } from './Actions/AppointmentActions'

const Home = lazy(() => import('./Components/HomePage'));
const Calender = lazy(() => import('./Components/CalenderView'));
const AllClients = lazy(() => import('./Components/AllClients'));
const AllAssistents = lazy(() => import('./Components/AllAssistents'));
const AllDentists = lazy(() => import('./Components/AllDentists'));

const App = () => {
    const dispatch = useDispatch()
    const allRandomAppointments = RandomAppointments()
    useEffect(() => {
        dispatch(allAppointments(allRandomAppointments))
    }, [])

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/Tandartsen" render={() => <AllDentists />} />
                    <Route exact path="/Assistenten" render={() => <AllAssistents />} />
                    <Route exact path="/Cliënten" render={() => <AllClients />} />
                    <Route exact path="/Calender" render={() => <Calender />} />
                </Switch>
            </Suspense>
        </BrowserRouter >
    );
}

export default App