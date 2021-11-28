import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { closeModal } from '../../app/common/modals/modalReducer'
import { socialLogin } from '../../app/firestore/firebaseService'

const SocialLogin = () => {
    const dispatch = useDispatch()

    const handleSocialLogin = provider => {
        dispatch(closeModal())
        socialLogin(provider)
    }
    return (
        <Fragment>
            <Button icon="facebook" fluid color="facebook" onClick={() => handleSocialLogin('facebook')} style={{ marginBottom: 10 }} content="Login with Facebook" />
            <Button icon="google" fluid color="google plus" onClick={() => handleSocialLogin('google')} content="Login with Google" />
        </Fragment>
    )
}

export default SocialLogin
