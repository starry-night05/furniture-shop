import React from 'react'
import Sidebar from './Sidebar'
const Layout = ({ children }) => {
    return (
        <>
            <div className="main" style={{ minHeight: '100vh' }}>
                <Sidebar />
                <main>
                    {children}
                </main>
            </div>
        </ >
    )
}

export default Layout