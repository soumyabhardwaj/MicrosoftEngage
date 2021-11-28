import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink,Link} from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'
import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

const NavBar = ({ setFormOpen }) => {
    const { authenticated } = useSelector(state => state.auth)

    return (
        <>
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={Link} to=""  exact header>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight: 15}} />
                    <a href="https://co-code.netlify.app/#/">Events Scheduler</a>
                    
                </Menu.Item>
                <Menu.Item as={Link} to=""  exact header>
                    <a href="https://co-code.netlify.app/#/">Co-Code</a>
                </Menu.Item>
                <Menu.Item as={NavLink} to="/events" name="Events" />
                <Menu.Item as={NavLink} to="/sandbox" name="Sandbox" />
                {authenticated &&
                <Menu.Item as={NavLink} to="/create">
                    <Button positive inverted content="Create Event" />
                </Menu.Item>
                }
                {authenticated ?  <SignedInMenu /> : <SignedOutMenu />}
            </Container>
        </Menu>
        
     </>
    )
}

export default NavBar