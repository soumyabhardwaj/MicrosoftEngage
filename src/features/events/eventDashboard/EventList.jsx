import React, { Fragment } from 'react'
import EventListItem from './EventListItem'
import InfiniteScroll from 'react-infinite-scroller'

const EventList = ({ events, getNextEvents, loading, moreEvents }) => {
    return (
        <Fragment>
            {events.length !== 0 && (
                <InfiniteScroll pageStart={0} loadMore={getNextEvents} hasMore={!loading && moreEvents} initialLoad={false}>
                    {events.map(event => <EventListItem event={event} key={event.id} />)}
                </InfiniteScroll>
            )}
        </Fragment>
    )
}

export default EventList
