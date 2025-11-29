import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Pages/Auth/useRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/forbidden/Forbidden';

const RiderRoute = ({ children }) => {
    const { loading, user } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || !user || roleLoading) {
        return < Loading ></Loading >
    }

    if (role !== 'rider') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default RiderRoute;