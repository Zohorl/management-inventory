import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';


const SignUp = () => {
    //Declaring State to Keep The values of Input Field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [check, setCheck] = useState(false);


    //Using React Firebase Hooks
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
        auth,
        { sendEmailVerification: true }
    );

    const [updateProfile] = useUpdateProfile(auth);

    //Using React Router DOM
    const navigate = useNavigate();

    //Using Function to Redirect Login Route
    const handleToLogin = () => {
        navigate('/login');
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        //Validating Password and Confirm Password
        if (password.length < 8) {
            setError('Password Must be at least 8 characters');
            return;
        }
        if (password !== confirmPassword) {
            setError('Password and Confirm Password do not match');
            return;
        }
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        navigate('/');
    };


    return (
        <div className='container mx-auto my-5 sign-up-container login-box'>
            <Form onSubmit={handleSignUp} className='form-container'>
                <h1 className='text-center text-primary '>Register</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                    />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                    />
                </Form.Group>

                <p className='text-danger'>{error}</p>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        onChange={() => setCheck(!check)}
                        type="checkbox"
                        label="Accept Terms and Conditions" />
                </Form.Group>
                <h6>
                    Already Have an Account?
                    <span
                        onClick={handleToLogin}
                        className="text-primary create-new-account ms-2"
                    >Login</span>
                </h6>

                <div className='d-flex justify-content-center align-items-center'>
                    <Button
                        disabled={check ? false : true}
                        className='px-5'
                        variant="primary"
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </div>
            </Form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default SignUp;