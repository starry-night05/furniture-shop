import React, { useEffect } from 'react'
import Layout from './Layout/Layout'
import { Admin } from './Components/admin/Admin'
import User from './Components/user/User'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Profile } from '../features/authSlice'

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state => state.auth));
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(Profile());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);
    return (
        <Layout>
            {user && user.role === "admin" && (
                <Admin></Admin>
            )}
            {user && user.role === "user" && (
                <User></User>
            )}
        </Layout>
    )
}

export default Dashboard