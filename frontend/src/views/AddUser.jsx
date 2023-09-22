import React, { useEffect } from 'react'
// component
import Layout from './Layout/Layout'
import NewUser from './Components/admin/NewUser'
// component.props
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Profile } from '../features/authSlice'

const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(Profile());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/home");
        }
    }, [isError, navigate]);
    return (
        <Layout>
            {/* admin */}
            <NewUser />
        </Layout>
    )
}

export default AddUser