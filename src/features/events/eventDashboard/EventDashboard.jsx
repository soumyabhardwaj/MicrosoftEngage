import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import EventList from './EventList'
import { useDispatch, useSelector } from 'react-redux'
import EventListItemPlaceholder from './EventListItemPlaceholder'
import EventFilters from './EventFilters'
import { fetchEvents } from '../eventActions'
import EventsFeed from './EventsFeed'
import { RETAIN_STATE } from '../eventConstants'

const EventDashboard = () => {
    const limit = 2
    const dispatch = useDispatch()
    const { events, moreEvents, filter, startDate, lastVisible, retainState } = useSelector(state => state.event)
    /*getting events from redux store*/
    const { loading } = useSelector(state => state.async)
    const { authenticated } = useSelector(state => state.auth)
    const [loadingInitial, setLoadingInitial] = useState(false)

    useEffect(() => {
        if (retainState) return
        setLoadingInitial(true)
        dispatch(fetchEvents(filter, startDate, limit)).then(() => {
            setLoadingInitial(false)
        })

        return () => {
            dispatch({ type: RETAIN_STATE })
        }
    }, [dispatch, filter, startDate, retainState])

    const handleFetchNextEvents = () => {
        dispatch(fetchEvents(filter, startDate, limit, lastVisible))
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                {loadingInitial && 
                    <Fragment>
                        <EventListItemPlaceholder /> 
                        <EventListItemPlaceholder />
                    </Fragment>
                }
                <EventList events={events}
                 getNextEvents={handleFetchNextEvents} loading={loading} moreEvents={moreEvents} />
            </Grid.Column>
            <Grid.Column width={6}>
                {authenticated &&
                <EventsFeed />
                }
                <EventFilters loading={loading} />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loading} />
            </Grid.Column>
        </Grid>
    )
}

export default EventDashboard
