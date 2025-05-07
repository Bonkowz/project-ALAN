import React from 'react'
import ProductCard from './ProductCard'
import Header from './Header'

function ProductListingUser() {
    return (
        <div>
            <Header></Header>
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </div>
        </div>
    )
}

export default ProductListingUser