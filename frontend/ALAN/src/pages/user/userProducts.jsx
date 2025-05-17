import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import ProductHeader from '../../components/ProductHeader';

function UserProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products/get-all-products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    var cart = [];

    function addToCart(name) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.qty++;
            console.log("Added another instance of " + name);
        } else {
            cart.push({ name: name, qty: 1 });
            console.log("Item in cart: ", cart);
        }
    };

    return (
        <div>
            <ProductHeader />
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {
                    products.map((product) => (
                        <ProductCard
                            key={product._id}
                            data={product}
                            addToCart={addToCart}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default UserProducts;
