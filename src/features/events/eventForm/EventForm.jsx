/* eslint-disable react/jsx-no-duplicate-props */
/* global google */
import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { Button, Confirm, Header, Segment } from 'semantic-ui-react'
import { clearSelectedEvent, listenToSelectedEvent } from '../eventActions'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MySelectInput from '../../../app/common/form/MySelectInput'
import { categoryData } from '../../../app/api/categoryOptions'
import MyDateInput from '../../../app/common/form/MyDateInput'
import MyPlaceInput from '../../../app/common/form/MyPlaceInput'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import { addEventToFirestore, cancelEventToggle, listenToEventFromFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { toast } from 'react-toastify'

const  EventForm = ({ match, history, location }) => {
    const dispatch = useDispatch()
    const [loadingCancel, setLoadingCancel] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const { selectedEvent } = useSelector(state => state.event) 
    /* selectedEvent is for viewing events' details*/
    const { loading, error } = useSelector(state => state.async)

    useEffect(() => {
        if (location.pathname !== '/create') return
        dispatch(clearSelectedEvent())
    }, [dispatch, location.pathname])

    const initialValues = selectedEvent ?? {  
        /*if selectedEvent not null then we will be updating the values otherwise create event*/
        /* creating a generic so that using this we change all the values */
        title: '',
        category: '',
        description: '',
        city: {address: '', latLng: null},
        venue: {address: '', latLng: null},
        date: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required(),
        city: Yup.object().shape({
            address: Yup.string().required('City is required')
        }),
        venue: Yup.object().shape({
            address: Yup.string().required('Venue is required')
        }),
        date: Yup.string().required()
    })

    const handleCancelToggle = async (event) => { /* this will handle the cancel button */
        setConfirmOpen(false)
        setLoadingCancel(true)
        try {
            await cancelEventToggle(event)
            setLoadingCancel(false)
        } catch (error) {
            setLoadingCancel(true)
            toast.error(error.message)
        }
    }

    useFirestoreDoc({
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToSelectedEvent(event)),
        dependencies: [match.params.id, dispatch],
        shouldExecute: match.params.id !== selectedEvent?.id && location.pathname !== '/create'
    })

    if (loading) return <LoadingComponent content="Loading event" />

    if (error) return <Redirect to="/error" />

    return (
        <Segment clearing>
            
            <Formik enableReinitialize initialValues={initialValues} 
               validationSchema={validationSchema} 
                 onSubmit={async (values, { setSubmitting }) => {
                try {
                    selectedEvent ? await updateEventInFirestore(values) : await addEventToFirestore(values)
                    setSubmitting(false)
                    history.push('/events')
                } catch (error) {
                    toast.error(error.message)
                    setSubmitting(false)
                }
                
            }}>
                {({ isSubmitting, dirty, isValid, values }) => (
                    <Form className="ui form">
                        <Header sub color="teal" content="Event details" />
                        <MyTextInput name="title" placeholder="Event title" />
                        <MySelectInput name="category" placeholder="Category" options={categoryData} />
                        <MyTextArea name="description" placeholder="Description" rows={2} />
                        <Header sub color="teal" content="Event location details" />
                        <MyPlaceInput name="city" placeholder="City" />
                        <MyPlaceInput name="venue" placeholder="Venue" disabled={!values.city.latLng} options={{ location: new google.maps.LatLng(values.city.latLng), radius: 1000, types: ['establishment'] }} />
                        <MyDateInput name="date" placeholder="Event date" timeFormat="HH:mm" showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm a" />

                        {selectedEvent && <Button type="button" floated="left" 
                        content="Submit" loading={loadingCancel} color={selectedEvent.isCancelled ? 'green' : 'red'}
                         content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel event'} 
                         onClick={() => setConfirmOpen(true)} />} 
                        <Button type="submit" floated="right" content="Submit" disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive />
                        <Button type="submit" floated="right" content="Cancel" disabled={isSubmitting} as={Link} to="/events" />
                    </Form>
                )}
            </Formik>
            <Confirm content={selectedEvent?.isCancelled ? 'This will reactivate the event - are you sure?' : 'This will cancel the event - are you sure'} 
                open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={() => handleCancelToggle(selectedEvent)} />
                {/* reopening the event if previously cancelled */}
        </Segment>
    )
}

export default EventForm
