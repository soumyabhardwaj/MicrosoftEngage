import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Dropdown, Image, Menu } from 'semantic-ui-react'
import { signOutFirebase } from '../../app/firestore/firebaseService'

const SignedInMenu = () => {
    const { currentUserProfile } = useSelector(state => state.profile)
    const history = useHistory()

    const handleSignOut = async () => {
        try {
            history.push('/')
            await signOutFirebase()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <Menu.Item position="right">
            <Image avatar spaced="right" src={currentUserProfile?.photoURL || '/assets/user.png'} />
            <Dropdown pointing="top left" text={currentUserProfile?.displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/create" text="Create event" icon="plus" />
                    <Dropdown.Item as={Link} to={`/profile/${currentUserProfile?.id}`} text="My profile" icon="user" />
                    <Dropdown.Item text="My account" icon="settings" as={Link} to="/account" />
                    <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}

export default SignedInMenu
