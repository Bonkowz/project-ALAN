import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard'
import AdminProductDropDown from '../../components/AdminProductDropDown'
import logoImg from "../../assets/images/logo_placeholder.png";
import cartImg from '../../assets/images/shopping_cart.png'
import menuImg from '../../assets/images/menu.png'

function UserProducts() {
    const [products, setProducts] = useState([]);
    const [sortChoice, setSortChoice] = useState('productName');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchProducts = () => {
        const endpoint = `http://localhost:5000/product/get-all-product-sorted?sortBy=${sortChoice}&order=${sortOrder}`;

        fetch(endpoint)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    };

    useEffect(() => {
        fetchProducts();
    }, [sortChoice, sortOrder]);

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const addTransaction = async (productId) => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0];
        const transactionData = {
            productId: productId,
            orderQty: 1,
            orderStatus: 3,
            email: 'user@example.com',
            dateOrdered: date,
            time: time
        };

        try {
            const response = await fetch('http://localhost:5000/transaction/add-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
            } else {
                console.error('Error:', result.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    function addToCart(productId) {
        addTransaction(productId);
    };

    return (
        <div>
            {/* header */}
            <div className="w-full h-25 bg-[#DDA15E] flex mb-12 justify-between items-center">
                <img src={logoImg} className="mx-5 h-20" />
                <div>
                    <button onClick={() => handleNavigate('/cart')} id="cartButton">
                        <img src={cartImg} className="mx-5 h-10" />
                    </button>

                    <button onClick={() => handleNavigate('/orders')} id="cartButton">
                        <img src={menuImg} className="mx-5 h-10" />
                    </button>
                </div>
            </div>

            {/* dropdown */}
            <div className="flex justify-end mr-3">
                <AdminProductDropDown
                    selected={sortChoice}
                    onSelect={setSortChoice}
                    sortOrder={sortOrder}
                    onToggleOrder={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                />
            </div>

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
