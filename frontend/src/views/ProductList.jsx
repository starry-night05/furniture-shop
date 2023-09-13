import React from 'react'
import Layout from './Layout/Layout'
import ProductsAdmin from './Components/admin/ProductsAdmin'

const ProductList = () => {
    return (
        <Layout>
            {/* admin */}
            <ProductsAdmin />
            {/* user || !login */}
        </Layout>
    )
}

export default ProductList