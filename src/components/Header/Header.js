import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';


import logo from '../../assets/logo.png';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';

const Header = () => {
    const [user] = useAuthState(auth);

    const navigate = useNavigate();
    let form = navigate?.state?.form?.pathname || '/login';

    const handleSignOut = () => {
        signOut(auth);
        navigate(form);
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to='/services'>Services</Nav.Link>
                        {
                            user &&
                            <Nav.Link as={Link} to='/manage-order'>Manage Order</Nav.Link>
                        }
                        {
                            user ?
                                <button className='btn btn-link text-white text-decoration-none' onClick={handleSignOut}>Sign out</button>
                                :
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;