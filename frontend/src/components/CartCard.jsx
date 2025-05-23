import React, { useState, useEffect } from 'react';

function CartCard({ data, isSelected, onToggleSelect, deleteItem }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/product/get-all-products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    const product = products.find(p => p._id === data.productId);
    if (!product) return <p>Loading product...</p>;

    return (
        <div className="flex items-center justify-evenly h-40 m-4 p-4 bg-white rounded-[25px]">
            <div className="flex items-center w-1/4 pr-4">
                <input type="checkbox" className="size-5 mr-2" checked={isSelected} onChange={onToggleSelect} />
                <img src={product.productImg} className="h-32 rounded-[10px]" />

                <div className="ml-3">
                    <p className="font-serif text-left"> {product.productName} </p>
                    <p className="font-serif text-left"> {product.productType == 1 ? "crop" : "poultry"} </p>
                    <p className="font-serif text-left"> {product.productDescription} </p>
                </div>
            </div>

            <p className="font-serif w-1/6"> ₱ {product.productPrice} </p>
            <p className="font-serif w-1/6"> {data.orderQty} {data.orderQty == 1 ? "pc" : "pcs"} </p>
            <p className="font-serif text-[#BC6C25] w-1/6"> ₱ {product.productPrice * data.orderQty} </p>

            <button className="w-1/8 h-8 bg-[#BC6C25] text-[#FEFAE0] rounded-[25px]" id="addToCartButton"
                onClick={() => { deleteItem(data._id) }}>
                DELETE
            </button>
        </div>
    )
}

export default CartCard