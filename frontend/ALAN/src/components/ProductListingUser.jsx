import React from 'react'
import ProductCard from './ProductCard'
import Header from './Header'

function ProductListingUser({ data }) {
    return (
        <div>
            <Header></Header>
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {
                    data.map((product) => {
                        return <ProductCard
                            key={product._id}
                            data={product}>
                        </ProductCard>
                    })
                }
            </div>
        </div>
    )
}

export default ProductListingUser