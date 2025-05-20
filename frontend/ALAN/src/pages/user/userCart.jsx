import { useState, useEffect } from 'react';
import CartHeader from '../../components/CartHeader'
import CartCard from '../../components/CartCard'

function UserCart() {
    const [cartItems, setCartItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/transaction/get-all-transactions-cart')
            .then(res => res.json())
            .then(data => setCartItems(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    // for logging items (checking purposes)
    useEffect(() => {
        console.log("Selected items updated:", selected);
    }, [selected]);

    // for the total number of items in the cart
    useEffect(() => {
        const total = cartItems.reduce((acc, curr) => acc + curr.orderQty, 0);
        setTotalItems(total);
    }, [cartItems]);

    // for the total price of selected items
    useEffect(() => {

    }, [cartItems]);

    // for selecting an item
    function selectItem(productId) {
        setSelected((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter(id => id !== productId)
                : [...prevSelected, productId]
        );
    }

    // for selecting all items
    function selectAllItems(e) {
        const isChecked = e.target.checked;

        if (isChecked) {
            const allProductIds = cartItems.map(p => p._id);
            setSelected(allProductIds);
        } else {
            setSelected([]);
        }
    }

    // for deleting checked transactions from the database.
    async function deleteItem(transactionId) {
        try {
            const response = await fetch('http://localhost:5000/transaction/remove-transaction', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: transactionId })
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                setCartItems(prev => prev.filter(item => item._id !== transactionId));
            } else {
                console.error('Error:', result.error);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

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
                    cartItems.map((product) => (
                        <CartCard
                            key={product._id}
                            data={product}
                            isSelected={selected.includes(product._id)}
                            onToggleSelect={() => selectItem(product._id)}
                            deleteItem={deleteItem}
                        />
                    ))
                }
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />

            <div className="flex items-center justify-between fixed bottom-0 left-0 w-full bg-white text-black shadow-2xl h-30 p-5">
                <div className="flex items-center w-1/4 pr-4">
                    <input type="checkbox" className="size-6 mr-2" onChange={selectAllItems} />
                    <div className="ml-3">
                        <p className="font-serif font-bold text-left"> Select all </p>
                        <p className="font-serif italic text-left"> {totalItems} items </p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <div>
                        <p className="font-serif text-2xl text-right"> Total: ₱ {totalPrice} </p>
                        <p className="font-serif italic text-right"> Cash on Delivery </p>
                    </div>
                    <button className="w-40 h-15 bg-[#BC6C25] text-[#FEFAE0] m-3 rounded-[10px]" id="addToCartButton"> DELETE </button>
                    <button className="w-40 h-15 bg-[#606C38] text-[#FEFAE0] m-3 rounded-[10px]" id="addToCartButton"> CHECK OUT </button>
                </div>
            </div>
        </div>
    )
}

export default UserCart