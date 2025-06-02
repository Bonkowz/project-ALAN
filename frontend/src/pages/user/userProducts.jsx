import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard'
import AdminProductDropDown from '../../components/AdminProductDropDown'
import logoImg from "../../assets/images/logo_placeholder.png";
import cartImg from '../../assets/images/shopping_cart.png'
import menuImg from '../../assets/images/menu.png'
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function UserProducts() {
    const [products, setProducts] = useState([]);
    const [sortChoice, setSortChoice] = useState('productName');
    const [sortOrder, setSortOrder] = useState('asc');
    const { user } = useContext(UserContext);

    const fetchProducts = () => {
        const endpoint = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/get-all-products-sorted?sortBy=${sortChoice}&order=${sortOrder}`;

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

    const logout = async (event) => {
        console.log("test");
        await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/logout`);
        handleNavigate('/signin');
        window.location.reload();
    }

    const addTransaction = async (productId) => {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0];
        const transactionData = {
            productId: productId,
            orderQty: 1,
            orderStatus: 3,
            email: user.email,
            dateOrdered: date,
            time: time
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/transaction/add-transaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                toast("Added item to cart!");
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
                <div className="flex justify-start items-center">
                    <img src={logoImg} className="mx-5 h-20" />
                    <p className="text-4xl font-serif my-1 text-[#FEFAE0]">| Product Listings </p>
                </div>
                <div className="flex items-center mr-4">
                    <button onClick={() => handleNavigate('/cart')} id="cartButton">
                        <img src={cartImg} className="mx-5 h-10" />
                    </button>

                    <button onClick={() => handleNavigate('/orders')} id="cartButton">
                        <img src={menuImg} className="mx-5 h-10" />
                    </button>

                    <button className="w-20 h-10 bg-[#BC6C25] text-[#FEFAE0] rounded-[25px] m-1" id="cartButton"
                        onClick={() => logout()}> logout
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

            <br />

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
        </div >
    );
}

export default UserProducts;
