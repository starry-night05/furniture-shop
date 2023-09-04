import React from 'react'
import Layout from './Layout/Layout'
import { Admin } from './Components/admin/Admin'
import User from './Components/user/User'

const Dashboard = () => {
    return (
        <Layout>
            {/* <Admin></Admin> */}
            <User></User>
        </Layout>
    )
}

export default Dashboard