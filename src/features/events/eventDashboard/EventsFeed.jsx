import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Feed, Header, Segment } from 'semantic-ui-react'
import { firebaseObjectToArray, getUserFeedRef } from '../../../app/firestore/firebaseService'
import { listenToFeed } from '../../profiles/profileActions'
import EventFeedItem from './EventFeedItem'
import { onValue, off } from '@firebase/database'
const EventsFeed = () => {
    const dispatch = useDispatch()
    const { feed } = useSelector(state => state.profile)

    useEffect(() => {
        getUserFeedRef().on('value', snapshot => {
            if (!snapshot.exists()) return
            
            const feed = firebaseObjectToArray(snapshot.val()).reverse()
            dispatch(listenToFeed(feed))

            return () => {
                getUserFeedRef().off()
            }
        })
    }, [dispatch])

    return (
        <Fragment>
            <Header attached color="teal" icon="newspaper" content="News feed" />
            <Segment attached="bottom">
                <Feed>
                    {feed.map(post => (
                        <EventFeedItem post={post} key={post.id} />
                    ))}
                </Feed>
            </Segment>
        </Fragment>
    )
}

export default EventsFeed
