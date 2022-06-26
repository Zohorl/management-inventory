import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import toast from "react-hot-toast";
import './Login.css';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    // Declare state to keep the values of input field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // using react firebase hook
    const [
        signInWithEmailAndPassword,
        signInUser,
        signInLoading,
        signInError,
    ] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, resetEmailSending, resetError] = useSendPasswordResetEmail(auth);

    // using react router dom
    const navigate = useNavigate();
    const location = useLocation();
    const form = location?.state?.form?.pathname || '/';

    // using function to sign up route
    const handleCreateAccount = () => {
        navigate('/signup');
    };

    // using function to sign in with email and password
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    };

    //Using React Built in Hook to Show Custom Error Message for wrong password or invalid email/user
    useEffect(() => {
        if (
            signInError &&
            signInError?.message === 'Firebase:Error(auth/user not found) .'
        ) {
            setError('User does not exist.Please Sign Up.');
            toast.error('User does not exist.Please Sign Up.')
        }
        else if (
            signInError &&
            signInError?.message === 'Firebase:Error(auth/wrong-password) .'
        ) {
            setError('Wrong Password');
            toast.error('Wrong Password')
        }
    }, [signInError]);

    //Using React Built in Hook to Show Custom Error Message and Toast Message for successful login
    useEffect(() => {
        if (signInUser) {
            navigate(form, { replace: true });
            toast.success('Logging Successful');
        }
    }, [signInUser, form, navigate]);

    // Using Function to Reset password if User forgets password
    const handleForgotPassword = async () => {
        await sendPasswordResetEmail(email);
    };

    //Using React Built in Hook to Show Custom Error Message and Toast Message for Reset Password
    useEffect(() => {
        if (resetEmailSending) {
            toast.success('Sending Email Reset')
        }
        if (resetError) {
            setError('Please Enter a Valid Email');
            toast.error('Please Enter a Valid Email');
            return;
        }
    }, [resetEmailSending, resetError]);

    return (
        <div>
            {
                signInLoading ? (<Loading></Loading>) : (
                    <div className='mx-auto mt-5 login-container'>
                        <Form onSubmit={handleLogin} className='form-container'>
                            <h1 className='text-center text-primary '>Sign In</h1>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
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
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>
                            <p className='text-danger'>{error}</p>
                            <p
                                className='text-primary forgot-pass'
                                onClick={handleForgotPassword}
                            >Forgot Password ?</p>

                            <h6>
                                New to ? {' '}
                                <span
                                    onClick={handleCreateAccount}
                                    className="text-primary create-new-account"
                                >Create a New Account</span>
                            </h6>

                            <div className='d-flex justify-content-center mt-3'>
                                <Button className='px-5' variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                        <SocialLogin></SocialLogin>
                    </div>
                )
            }
        </div>
    );
};

export default Login;