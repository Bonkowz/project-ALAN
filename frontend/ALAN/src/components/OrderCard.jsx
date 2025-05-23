import React, { useState, useEffect } from 'react';

function OrderCard({ data, cancelOrder }) {
    const [products, setProducts] = useState([]);
    var toDisplay;

    useEffect(() => {
        fetch('http://localhost:5000/products/get-all-products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    const product = products.find(p => p._id === data.productId);
    if (!product) return <p>Loading product...</p>;

    switch (data.orderStatus) {
        case 0:
            toDisplay = <>
                <p className="font-serif text-center text-[#BC6C25]"> Pending <br /> Confirmation </p>
                <button className="w-26 h-8 bg-[#BC6C25] text-[#FEFAE0] rounded-[25px]" id="addToCartButton"
                    onClick={() => cancelOrder(data._id)}>
                    CANCEL
                </button>
            </>
            break;
        case 1:
            toDisplay = <>
                <p className="font-serif text-center text-[#606C38]"> Confirmed by <br /> Merchant </p>
            </>
            break;
        case 2:
            toDisplay = <>
                <p className="font-serif text-center text-[#BC6C25]"> Cancelled </p>
            </>
            break; r
    }

    return (
        <div className="flex items-center justify-evenly h-40 m-4 p-4 bg-white rounded-[25px]">
            <div className="flex items-center w-1/6 pr-4">
                <img src={product.productImg} className="h-32 rounded-[10px]" />
                <div className="ml-3">
                    <p className="font-serif text-left"> {product.productName} </p>
                    <p className="font-serif text-left"> {product.productType == 1 ? "crop" : "poultry"} </p>
                    <p className="font-serif text-left"> {product.productDescription} </p>
                </div>
            </div>

            <p className="font-serif w-1/6"> PHP {product.productPrice} </p>
            <p className="font-serif w-1/6"> {data.orderQty} {data.orderQty == 1 ? "pc" : "pcs"} </p>
            <p className="font-serif text-[#BC6C25] w-1/6"> PHP {product.productPrice * data.orderQty} </p>

            <div className="flex flex-col items-center">
                {toDisplay}
            </div>
        </div>
    )
}

export default OrderCard