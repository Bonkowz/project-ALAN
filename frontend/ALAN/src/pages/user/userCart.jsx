import { useState, useEffect } from 'react';
import CartHeader from '../../components/CartHeader'
import CartFooter from '../../components/CartFooter';
import CartCard from '../../components/CartCard'

function UserCart() {
    // for demo purposes, i will be using the products currently in the database.
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products/get-all-products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="bg-[#FEFAE0] min-h-screen">
            <CartHeader data="Shopping Cart"></CartHeader>

            <div className="flex items-center justify-evenly h-18 m-4 p-4 bg-white rounded-[25px]">
                <div className="flex items-center w-1/4 pr-4">
                    <input type="checkbox" className="size-5 mr-2" disabled />
                    <p className="font-serif"> Product </p>
                </div>
                <p className="font-serif w-1/6"> Price </p>
                <p className="font-serif w-1/6"> Qty </p>
                <p className="font-serif w-1/6 mr-42"> Total Price </p>
            </div>

            <div>
                {
                    products.map((product) => (
                        <CartCard
                            key={product._id}
                            data={product}
                        />
                    ))
                }
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />

            <CartFooter></CartFooter>
        </div>
    )
}

export default UserCart