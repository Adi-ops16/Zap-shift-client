import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import useRole from '../Pages/Auth/useRole';
import Forbidden from '../Components/forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth()
    const { role, roleLoading } = useRole()
    if (loading || roleLoading) {
        <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;