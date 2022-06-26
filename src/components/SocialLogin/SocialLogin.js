import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import auth from '../../firebase.init';
import './SocialLogin.css';

const SocialLogin = () => {
    // react firebase hook
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    const [authUser] = useAuthState(auth);
    //Using React Router DOM
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    //Using Function to Sign In Using Google
    const handleGoogleSignIn = () => {
        signInWithGoogle();
        navigate(from, { replace: true });
        if (!authUser) {
            toast.success('Successfully Signed In With Google')
        }
    };
    return (
        <div className='social'>
            <div className='d-flex justify-content-center align-items-center my-3 '>
                <div className='line'></div>
                <p className='pb-0 mb-0 mx-3'>OR</p>
                <div className='line'></div>
            </div>

            <div className='social-btn'>
                <div className="social-btn-container">
                    <button
                        onClick={handleGoogleSignIn}
                        className="d-block mx-auto mx-0 google-btn"
                    >
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;