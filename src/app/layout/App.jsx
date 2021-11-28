import React, { Fragment } from 'react'
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard'
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import { ToastContainer } from 'react-toastify'
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/AccountPage';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage';
import PrivateRoute from './PrivateRoute';

const App = () => {
    const { key } = useLocation()
    const { initialised } = useSelector(state => state.async)

    if (!initialised) return <LoadingComponent content="Loading app..." />

    return (
        <Fragment>
            <ModalManager />
            <ToastContainer position="bottom-right" hideProgressBar />
            <Route path="/" component={HomePage} exact />
            <Route path={'/(.+)'} render={() => (
                /*if we hitting something + arrow then it will take us to the desried route*/
                <Fragment>
                    <NavBar />
                    <Container className="main">
                         {/* added routes so that we can go to the specific functionality */}
                        <Route path="/events" component={EventDashboard} exact />
                        <Route path="/sandbox" component={Sandbox} exact />
                        <Route path="/events/:id" component={EventDetailedPage} />
                        <Route path={['/create', '/manage/:id']} component={EventForm} key={key} />
                        <PrivateRoute path="/account" component={AccountPage} />
                        <PrivateRoute path="/profile/:id" component={ProfilePage} />
                        <Route path="/error" component={ErrorComponent} />
                    </Container>
                </Fragment>
            )} />
        </Fragment>
    );
}

export default App