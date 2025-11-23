import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRout = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) { return }
    else {
        return <div>
            {
                !user ?
                    <Navigate state={location.pathname} to="/auth/login"></Navigate>
                    :
                    children
            }
        </div>
    }
};

export default PrivateRout;