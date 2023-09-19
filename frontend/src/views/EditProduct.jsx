import React, { useEffect } from 'react'
// component
import Layout from './Layout/Layout'
import UpdateProduct from './Components/admin/UpdateProduct'
// component.props
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Profile } from '../features/authSlice'

const EditProduct = () => {
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
            <UpdateProduct />
        </Layout>
    )
}

export default EditProduct